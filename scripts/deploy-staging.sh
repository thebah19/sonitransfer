#!/usr/bin/env bash
set -Eeuo pipefail

release_sha="${1:?Release SHA is required}"
deploy_root="$HOME/deployments/sonitransfer"
release_dir="$deploy_root/releases/$release_sha"
backup_dir="$deploy_root/backups/$release_sha"
failed_dir="$deploy_root/failed/$release_sha"
target_dir="/var/www/stagging-soni-transfer-com"
service_name="soni-staging-next.service"

move_project_entries() {
  local source_dir="$1"
  local destination_dir="$2"

  mkdir -p "$destination_dir"
  shopt -s dotglob nullglob
  for entry in "$source_dir"/*; do
    if [[ "$source_dir" == "$target_dir" && "$(basename "$entry")" == ".well-known" ]]; then
      continue
    fi
    mv "$entry" "$destination_dir"/
  done
  shopt -u dotglob nullglob
}

rollback() {
  echo "Deployment failed; restoring the previous release."
  move_project_entries "$target_dir" "$failed_dir"
  move_project_entries "$backup_dir" "$target_dir"
  sudo -n /bin/systemctl restart "$service_name" || true
}

trap rollback ERR

cd "$release_dir"
npm ci
REMITEC_API_BASE_URL=https://app.sonitransfer.com/api npm run build

mkdir -p "$backup_dir"
move_project_entries "$target_dir" "$backup_dir"
move_project_entries "$release_dir" "$target_dir"

sudo -n /bin/systemctl restart "$service_name"

healthy=false
for attempt in {1..20}; do
  if curl --fail --silent --show-error --max-time 10 http://127.0.0.1:3001/en >/dev/null; then
    healthy=true
    break
  fi
  sleep 3
done

if [[ "$healthy" != true ]]; then
  echo "Staging health check failed."
  false
fi

trap - ERR
find "$deploy_root/backups" -mindepth 1 -maxdepth 1 -type d -mtime +14 -exec rm -rf {} + 2>/dev/null || true
find "$deploy_root/failed" -mindepth 1 -maxdepth 1 -type d -mtime +14 -exec rm -rf {} + 2>/dev/null || true

echo "Deployed $release_sha to https://stagging.sonitransfer.com/"
