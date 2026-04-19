import type { CollectionConfig } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrAbove } from '@/access/editorOrAbove'
import { denyEditorPublishCollection } from '@/hooks/denyEditorPublish'
import { legalPageBeforeValidate } from '@/hooks/legalPageBeforeValidate'
import { createCollectionRevalidationHooks } from '@/hooks/revalidation/createHooks'
import { seoFieldGroup } from '@/fields/seo'
import { buildPreviewURL } from '@/utilities/preview'

const revalidateHooks = createCollectionRevalidationHooks({
  draftsEnabled: true,
  slug: 'legal-pages',
  getPaths: (doc) => [String(doc.path || '')],
  getTags: (doc) => ['legal-pages', `legal:${String(doc.slug || '')}`],
})

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  access: {
    create: editorOrAbove,
    delete: editorOrAbove,
    read: authenticatedOrPublished,
    update: editorOrAbove,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'path', 'updatedAt', '_status'],
    useAsTitle: 'title',
    preview: (data) =>
      buildPreviewURL({
        path: String(data?.path || '/'),
        resourceType: 'collection',
        resourceSlug: 'legal-pages',
        docId: (data as { id?: number | string })?.id,
        status: (data as { _status?: string })?._status,
      }),
    livePreview: {
      url: ({ data }) =>
        buildPreviewURL({
          path: String(data?.path || '/'),
          resourceType: 'collection',
          resourceSlug: 'legal-pages',
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
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'path',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
    seoFieldGroup(),
    {
      name: 'lastUpdated',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeValidate: [legalPageBeforeValidate],
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
