# Soni Transfer Website

Next.js App Router website for Soni Transfer.

## Deployment

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables on the hosting platform:

```bash
REMITEC_API_BASE_URL=https://app.sonitransfer.com/api
```

3. Build the site:

```bash
npm run build
```

4. Start the production server:

```bash
npm run start
```

The Remitec calculator uses server-side API routes under `/api/remitec/*`, so the deployment server must be able to resolve and reach the Remitec API host.

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

Rollback is automatic when activation fails. A manual rollback can be performed by moving the desired backup from `~/deployments/sonitransfer/backups/` into `/var/www/stagging-soni-transfer-com` and restarting the service.
