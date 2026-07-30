# Soni Transfer V2 Review

Production-built Vite/React review site containing all three approved homepage
concepts.

## Review routes

- `#/1` — Bold blue (default)
- `#/2` — White editorial
- `#/3` — Selected split

The deployed review is available under `/v2/`. The Vite base path must therefore
be set when creating the deployment bundle.

## Local development

```bash
npm ci
npm run dev
```

## Production validation

```bash
npm ci
VITE_BASE_PATH=/v2/ npm run build
npm run test:sites
```

The static Apache deployment uses `dist/client/`. Its configuration is tracked
in `deploy/stagging.sonitransfer.com.conf`.

## Staging deployment

Pushes to `V2` deploy the static build to:

```text
https://stagging.sonitransfer.com/v2/
```

The workflow requires the existing `STAGING_HOST`, `STAGING_USER`,
`STAGING_SSH_KEY`, and `STAGING_KNOWN_HOSTS` secrets. The repository variable
`STAGING_DEPLOY_ENABLED` must be `true`.
