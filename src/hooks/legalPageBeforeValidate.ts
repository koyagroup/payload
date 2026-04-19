import type { CollectionBeforeValidateHook } from 'payload'

export const legalPageBeforeValidate: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) {
    return data
  }

  const nextData = { ...data }

  if (typeof nextData.slug === 'string') {
    nextData.slug = nextData.slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  if (nextData.slug) {
    nextData.path = `/legal/${nextData.slug}`
  }

  nextData.lastUpdated = new Date().toISOString()

  return nextData
}
