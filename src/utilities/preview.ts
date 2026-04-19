import type { PayloadRequest } from 'payload'

type PreviewArgs = {
  path: string
  resourceType: 'collection' | 'global'
  resourceSlug: string
  docId?: string | number | null
  status?: string | null
  req?: PayloadRequest
}

export const buildPreviewURL = ({
  path,
  resourceType,
  resourceSlug,
  docId,
  status,
}: PreviewArgs): string | null => {
  const previewBase = process.env.KOYA_PREVIEW_URL
  const previewSecret = process.env.KOYA_PREVIEW_SECRET

  if (!previewBase || !previewSecret) {
    return null
  }

  const params = new URLSearchParams({
    path,
    resourceType,
    resourceSlug,
    previewSecret,
  })

  if (docId) {
    params.set('docId', String(docId))
  }

  if (status) {
    params.set('status', status)
  }

  return `${previewBase}?${params.toString()}`
}
