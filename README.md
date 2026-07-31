# Soni Transfer Website

Production React website for Soni Transfer. The public site uses the approved
Option 2 layout and connects its calculator to the live Remitec quotation API.

## Deployment

1. Install dependencies:

```bash
npm install
```

2. Build the site:

```bash
npm run build
```

3. Start the production server:

```bash
npm run start
```

The production server listens on `PORT` (default `3001`), serves the built SPA,
supports clean legal-page URLs and `/en`, and proxies the calculator through
`/api/remitec/*` to the live Soni Transfer service. It deliberately has no
fallback exchange-rate data, so customers never see a stale quotation presented
as live.

For local development, run `npm run dev`. Development mode includes the three
layout drafts for review; production builds publish Option 2 only.

## Staging deployment

Pushes to `main` are deployed to `https://stagging.sonitransfer.com/` by `.github/workflows/deploy-staging.yml`.

The workflow:

1. Installs dependencies and validates the production build on GitHub Actions.
2. Uploads the source to an isolated release directory on the staging server.
3. Builds the release on the server.
4. Moves the previous release to a rollback directory.
5. Restarts `soni-staging-next.service` and checks `http://127.0.0.1:3001/en`.
6. Restores the previous release if activation or the health check fails.

Required GitHub Actions secrets:

- `STAGING_HOST`
- `STAGING_USER`
- `STAGING_SSH_KEY`
- `STAGING_KNOWN_HOSTS`

The repository variable `STAGING_DEPLOY_ENABLED` must be set to `true`. Keep it set to `false` while server access or service permissions are being changed.

The deployment user requires passwordless permission for this command only:

```text
/bin/systemctl restart soni-staging-next.service
```

Install and validate the tracked least-privilege sudoers policy once on the
staging host:

```bash
sudo install -o root -g root -m 0440 ops/sudoers.d/soni-staging-deploy /etc/sudoers.d/soni-staging-deploy
sudo visudo -cf /etc/sudoers.d/soni-staging-deploy
```

Rollback is automatic when activation fails. A manual rollback can be performed by moving the desired backup from `~/deployments/sonitransfer/backups/` into `/var/www/stagging-soni-transfer-com` and restarting the service.
