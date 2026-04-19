import type { Field } from 'payload'

import { isAbsoluteURL, isInternalPath, normalizePath } from '@/utilities/paths'

export const linkField = (name = 'link'): Field => ({
  name,
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'internal',
      options: [
        {
          label: 'Internal',
          value: 'internal',
        },
        {
          label: 'External',
          value: 'external',
        },
      ],
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
      validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        if (typeof value !== 'string' || value.trim().length === 0) {
          return 'A link destination is required.'
        }

        if (siblingData?.type === 'external' && !isAbsoluteURL(value)) {
          return 'External links must be valid http/https URLs.'
        }

        if (siblingData?.type !== 'external' && !isInternalPath(normalizePath(value))) {
          return 'Internal links must be site-relative paths starting with /.'
        }

        return true
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (typeof value !== 'string') {
              return value
            }

            if (siblingData?.type === 'external') {
              return value.trim()
            }

            return normalizePath(value)
          },
        ],
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
})
