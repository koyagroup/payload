import type { CollectionBeforeChangeHook, GlobalBeforeChangeHook } from 'payload'

const resolveNextStatus = ({
  dataStatus,
  currentStatus,
}: {
  currentStatus?: string | null
  dataStatus?: string | null
}): string | null => {
  if (typeof dataStatus === 'string') {
    return dataStatus
  }

  if (typeof currentStatus === 'string') {
    return currentStatus
  }

  return null
}

export const denyEditorPublishCollection: CollectionBeforeChangeHook = ({ data, originalDoc, req }) => {
  const nextStatus = resolveNextStatus({
    dataStatus: typeof data?._status === 'string' ? data._status : null,
    currentStatus: typeof originalDoc?._status === 'string' ? originalDoc._status : null,
  })

  if (req.user?.role === 'editor' && nextStatus === 'published') {
    throw new Error('Editors can save drafts and preview, but cannot publish content.')
  }

  return data
}

export const denyEditorPublishGlobal: GlobalBeforeChangeHook = ({ data, originalDoc, req }) => {
  const nextStatus = resolveNextStatus({
    dataStatus: typeof data?._status === 'string' ? data._status : null,
    currentStatus: typeof originalDoc?._status === 'string' ? originalDoc._status : null,
  })

  if (req.user?.role === 'editor' && nextStatus === 'published') {
    throw new Error('Editors can save drafts and preview, but cannot publish content.')
  }

  return data
}
