import type { CollectionConfig } from 'payload'

import { editorOrAbove } from '@/access/editorOrAbove'
import { createCollectionRevalidationHooks } from '@/hooks/revalidation/createHooks'
import { isInternalPath, normalizePath } from '@/utilities/paths'

const revalidateHooks = createCollectionRevalidationHooks({
  slug: 'whatsapp-preview-links',
  getPaths: (doc) => [String(doc.path || '')],
  getTags: (doc) => ['whatsapp-preview-links', `whatsapp:${String(doc.key || '')}`],
})

export const WhatsAppPreviewLinks: CollectionConfig = {
  slug: 'whatsapp-preview-links',
  access: {
    create: editorOrAbove,
    delete: editorOrAbove,
    read: () => true,
    update: editorOrAbove,
  },
  admin: {
    defaultColumns: ['key', 'path', 'isActive', 'updatedAt'],
    useAsTitle: 'key',
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'path',
      type: 'text',
      required: true,
      validate: (value: unknown) => {
        if (typeof value !== 'string') {
          return 'Path is required.'
        }

        if (!isInternalPath(normalizePath(value))) {
          return 'Path must be internal and start with /.'
        }

        return true
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value !== 'string') {
              return value
            }

            return normalizePath(value)
          },
        ],
      },
    },
    {
      name: 'ogTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'ogDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  hooks: {
    afterChange: [revalidateHooks.afterChange],
    afterDelete: [revalidateHooks.afterDelete],
  },
}
