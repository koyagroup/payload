# Koya Payload CMS

Standalone Payload CMS service for Koya marketing content.

## What this service owns

- Marketing pages and section layouts
- Sitewide settings (navigation, footer, SEO defaults, theme settings)
- Legal pages, FAQs, WhatsApp preview metadata
- Media assets (Vercel Blob in production, local fallback in development)
- Editorial workflow with drafts, preview, and role-based permissions
- Publish-triggered webhook payloads for Koya revalidation

## Stack

- Next.js + Payload 3
- Postgres (`@payloadcms/db-postgres`)
- Lexical rich text
- Optional Vercel Blob storage (`@payloadcms/storage-vercel-blob`)

## Local setup

1. Copy env file:

```bash
cp .env.example .env
```

2. Set `DATABASE_URL` to your Postgres instance.
   For your remote host:

```bash
postgresql://koya_app:<password>@db.koyabank.com:5432/koya_payload
```

   Optional local Postgres with Docker:

```bash
docker run --name koya-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=koya_payload -p 5432:5432 -d postgres:16
```

3. Install dependencies:

```bash
pnpm install
```

4. Run migrations:

```bash
pnpm migrate
```

5. Start dev server:

```bash
pnpm dev
```

6. Open Payload admin:

`http://localhost:3000/admin`

## Environment behavior

- `DATABASE_URL` and `PAYLOAD_SECRET` are required at startup.
- `PAYLOAD_PUSH_SCHEMA` defaults to `false`. Keep it false when using migrations (recommended).
  Set `PAYLOAD_PUSH_SCHEMA=true` only for local schema iteration.
- `DATABASE_ADMIN_URL` is used for creating additional databases (e.g. seed database).
- `SEED_DATABASE_URL` (optional) is used by `pnpm seed`. If set, seed writes to that database instead of `DATABASE_URL`.
- `BLOB_READ_WRITE_TOKEN` is optional:
  - when set, `media` uploads use Vercel Blob
  - when unset, uploads use local `/media` storage

## Create separate seed database

```bash
pnpm db:create:seed
```

This uses:

- `DATABASE_ADMIN_URL` (or falls back to `DATABASE_URL`)
- `SEED_DATABASE_NAME` (default `koya_payload_seed`)

## Seed baseline content

```bash
pnpm seed
```

To force seeding to a specific database in one-off runs:

```bash
SEED_DATABASE_URL=postgresql://koya_app:<password>@db.koyabank.com:5432/koya_payload_seed pnpm seed
```

The seed is idempotent and creates/updates:

- baseline users (if env credentials are provided)
- required globals
- home and convert pages
- legal pages
- FAQ entries
- WhatsApp preview links
- starter redirect

## Roles

- `admin`: full access including user management
- `publisher`: full marketing content CRUD + publish rights
- `editor`: draft/edit/preview access, no publish rights

## Preview integration

Payload preview URLs are generated with:

- `KOYA_PREVIEW_URL`
- `KOYA_PREVIEW_SECRET`

Preview query params:

- `path`
- `resourceType`
- `resourceSlug`
- `docId`
- `status`
- `previewSecret`

## Publish webhook integration

Configure:

- `KOYA_REVALIDATE_WEBHOOK_URL`
- `KOYA_REVALIDATE_WEBHOOK_SECRET`
- `KOYA_REVALIDATE_TIMEOUT_MS`

Payload sends signed webhook payloads on publish transitions with:

- `eventType`
- `occurredAt`
- `resource`
- `paths`
- `tags`
- `actor`

Headers:

- `x-koya-event`
- `x-koya-timestamp`
- `x-koya-signature`

## Migrations

- Migration directory: `src/migrations`
- Create migration: `pnpm migrate:create`
- Run migration: `pnpm migrate`
- CI flow: `pnpm ci` (migrate then build)
- Production recommendation: run migrations in deploy pipeline before startup, do not run cold-start runtime migrations.
