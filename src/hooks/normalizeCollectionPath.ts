import type { CollectionBeforeValidateHook } from 'payload'

import { normalizePath } from '@/utilities/paths'

export const normalizeCollectionPath: CollectionBeforeValidateHook = ({ data }) => {
  if (typeof data?.path === 'string') {
    return {
      ...data,
      path: normalizePath(data.path),
    }
  }

  return data
}
