import type { CollectionConfig } from 'payload'

import { editorOrAbove } from '@/access/editorOrAbove'
import { createCollectionRevalidationHooks } from '@/hooks/revalidation/createHooks'
import { isAbsoluteURL, isInternalPath, normalizePath } from '@/utilities/paths'

const revalidateHooks = createCollectionRevalidationHooks({
  slug: 'redirects',
  getPaths: (doc) => [String(doc.fromPath || '/')],
  getTags: () => ['redirects'],
})

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  access: {
    create: editorOrAbove,
    delete: editorOrAbove,
    read: () => true,
    update: editorOrAbove,
  },
  admin: {
    defaultColumns: ['fromPath', 'targetType', 'to', 'statusCode', 'isActive'],
    useAsTitle: 'fromPath',
  },
  fields: [
    {
      name: 'fromPath',
      type: 'text',
      unique: true,
      required: true,
      validate: (value: unknown) => {
        if (typeof value !== 'string') {
          return 'Source path is required.'
        }

        if (!isInternalPath(normalizePath(value))) {
          return 'Source path must be internal and start with /.'
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
      name: 'targetType',
      type: 'select',
      defaultValue: 'internal',
      options: [
        { label: 'Internal Path', value: 'internal' },
        { label: 'External URL', value: 'external' },
      ],
      required: true,
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        if (typeof value !== 'string') {
          return 'Destination is required.'
        }

        if (siblingData?.targetType === 'external') {
          if (!isAbsoluteURL(value)) {
            return 'External destination must be a valid URL.'
          }

          return true
        }

        if (!isInternalPath(normalizePath(value))) {
          return 'Internal destination must start with /.'
        }

        return true
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (typeof value !== 'string') {
              return value
            }

            if (siblingData?.targetType === 'external') {
              return value.trim()
            }

            return normalizePath(value)
          },
        ],
      },
    },
    {
      name: 'statusCode',
      type: 'select',
      defaultValue: '302',
      options: [
        { label: '301', value: '301' },
        { label: '302', value: '302' },
        { label: '307', value: '307' },
        { label: '308', value: '308' },
      ],
      required: true,
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
