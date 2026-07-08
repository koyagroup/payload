import type { Access, CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

/**
 * Waitlist signups captured by the marketing site's waitlist CTA.
 *
 * Create is NOT public: the koyabank.com `/api/waitlist` proxy route holds
 * `KOYA_WAITLIST_SECRET` server-side and forwards it via the
 * `x-koya-waitlist-secret` header (environment-driven, mirrors the signed
 * revalidate-webhook pattern). When the env var is unset, create is denied
 * entirely (default-deny). Reads stay admin-only — email is PII.
 */
const secretHeaderCreate: Access = ({ req }) => {
  const secret = process.env.KOYA_WAITLIST_SECRET
  if (!secret) {
    return false
  }

  return req.headers.get('x-koya-waitlist-secret') === secret
}

export const WaitlistSignups: CollectionConfig = {
  slug: 'waitlist-signups',
  access: {
    create: secretHeaderCreate,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['email', 'source', 'createdAt'],
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'source',
      type: 'text',
    },
  ],
  timestamps: true,
}
