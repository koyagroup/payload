# CLAUDE.md

This repository is a standalone Koya Payload CMS service.

## Project identity

- Purpose: single source of truth for Koya marketing content
- Runtime: Next.js app router + Payload 3
- Database: Postgres (`@payloadcms/db-postgres`)
- Media: local upload in dev, Vercel Blob in production when token is configured
- Deployment target: Vercel

## Source layout

- `src/payload.config.ts`: main Payload config entrypoint
- `src/collections/*`: Koya collections (`pages`, `legal-pages`, `faqs`, `media`, `users`, etc.)
- `src/globals/*`: Koya singleton globals (`site-settings`, `theme-settings`, etc.)
- `src/blocks/*`: typed page section blocks for marketing layouts
- `src/hooks/*`: publish restrictions, path normalization, webhook dispatch
- `src/migrations/*`: Postgres migrations
- `scripts/seed.ts`: idempotent baseline seed data
- `src/app/(payload)/*`: admin and API routes
- `src/app/(frontend)/*`: minimal placeholder landing page for the CMS service

## Required workflows

- Install: `pnpm install`
- Generate admin import map: `pnpm generate:importmap`
- Generate payload types: `pnpm generate:types`
- Run migrations: `pnpm migrate`
- Start dev: `pnpm dev`
- Seed baseline: `pnpm seed`
- CI pipeline command: `pnpm ci` (migrate then build)

## Guardrails

- Do not add Koya frontend rendering logic in this repo.
- Keep schemas wrapper-friendly and avoid raw style/class injection fields.
- Maintain strict role separation (`admin`, `publisher`, `editor`).
- Keep publish webhook payloads signed and environment-driven.
- Prefer typed blocks/enums/validated fields over unbounded JSON.
