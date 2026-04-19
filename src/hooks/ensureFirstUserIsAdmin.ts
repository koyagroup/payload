import type { CollectionBeforeChangeHook } from 'payload'

export const ensureFirstUserIsAdmin: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create') {
    return data
  }

  const count = await req.payload.count({
    collection: 'users',
    overrideAccess: true,
  })

  if (count.totalDocs === 0) {
    return {
      ...data,
      role: 'admin',
    }
  }

  return data
}
