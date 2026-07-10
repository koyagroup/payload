import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrAbove } from '@/access/editorOrAbove'
import { marketingBlocks } from '@/blocks/marketingBlocks'
import { denyEditorPublishCollection } from '@/hooks/denyEditorPublish'
import { normalizeCollectionPath } from '@/hooks/normalizeCollectionPath'
import { createCollectionRevalidationHooks } from '@/hooks/revalidation/createHooks'
import { pageThemeOverrideField } from '@/fields/themeOverride'
import { seoFieldGroup } from '@/fields/seo'
import { buildPreviewURL } from '@/utilities/preview'
import { isInternalPath, normalizePath } from '@/utilities/paths'

const revalidateHooks = createCollectionRevalidationHooks({
  draftsEnabled: true,
  slug: 'pages',
  getPaths: (doc) => [String(doc.path || '/')],
  getTags: (doc) => ['pages', `page:${String(doc.path || '/')}`],
})

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: editorOrAbove,
    delete: editorOrAbove,
    read: authenticatedOrPublished,
    update: editorOrAbove,
  },
  admin: {
    defaultColumns: ['title', 'path', 'updatedAt', '_status'],
    useAsTitle: 'title',
    preview: (data) =>
      buildPreviewURL({
        path: String(data?.path || '/'),
        resourceType: 'collection',
        resourceSlug: 'pages',
        docId: (data as { id?: number | string })?.id,
        status: (data as { _status?: string })?._status,
      }),
    livePreview: {
      url: ({ data }) =>
        buildPreviewURL({
          path: String(data?.path || '/'),
          resourceType: 'collection',
          resourceSlug: 'pages',
          docId: (data as { id?: number | string })?.id,
          status: (data as { _status?: string })?._status,
        }),
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'path',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description: 'Canonical route consumed by Koya wrapper (must start with /).',
      },
      validate: (value: unknown) => {
        if (typeof value !== 'string') {
          return 'Path is required.'
        }

        const normalized = normalizePath(value)
        if (!isInternalPath(normalized)) {
          return 'Path must be a valid site-relative route starting with /.'
        }

        return true
      },
    },
    seoFieldGroup(),
    pageThemeOverrideField(),
    {
      name: 'sections',
      type: 'blocks',
      required: true,
      blocks: marketingBlocks,
      minRows: 1,
    },
  ],
  hooks: {
    beforeValidate: [normalizeCollectionPath],
    beforeChange: [denyEditorPublishCollection],
    afterChange: [revalidateHooks.afterChange],
    afterDelete: [revalidateHooks.afterDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 100,
  },
}
