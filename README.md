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

2. Set `DATABASE_URL` to your local Postgres instance.
   Example:

```bash
postgresql://postgres:postgres@127.0.0.1:5432/koya_payload
```

   Quick local Postgres with Docker:

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
- `BLOB_READ_WRITE_TOKEN` is optional:
  - when set, `media` uploads use Vercel Blob
  - when unset, uploads use local `/media` storage

## Seed baseline content

```bash
pnpm seed
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
