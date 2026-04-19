import type { Access } from 'payload'

import { isAdmin } from '@/lib/roles'

export const firstUserOrAdmin: Access = async ({ req }) => {
  if (isAdmin(req.user as never)) {
    return true
  }

  const count = await req.payload.count({
    collection: 'users',
    overrideAccess: true,
  })

  return count.totalDocs === 0
}
