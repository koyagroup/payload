import type { GlobalConfig } from 'payload'

import { authenticatedOrPublishedGlobal } from '@/access/authenticatedOrPublishedGlobal'
import { editorOrAbove } from '@/access/editorOrAbove'
import { linkField } from '@/fields/link'
import { denyEditorPublishGlobal } from '@/hooks/denyEditorPublish'
import { createGlobalRevalidationHook } from '@/hooks/revalidation/createHooks'
import { buildPreviewURL } from '@/utilities/preview'

const revalidateFooter = createGlobalRevalidationHook({
  draftsEnabled: true,
  slug: 'footer',
  getPaths: () => ['/'],
  getTags: () => ['footer'],
})

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: authenticatedOrPublishedGlobal,
    update: editorOrAbove,
  },
  admin: {
    preview: (data) =>
      buildPreviewURL({
        path: '/',
        resourceType: 'global',
        resourceSlug: 'footer',
        status: (data as { _status?: string })?._status,
      }),
    livePreview: {
      url: ({ data }) =>
        buildPreviewURL({
          path: '/',
          resourceType: 'global',
          resourceSlug: 'footer',
          status: (data as { _status?: string })?._status,
        }),
    },
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'sortOrder',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
        {
          name: 'links',
          type: 'array',
          minRows: 1,
          maxRows: 12,
          fields: [
            {
              name: 'sortOrder',
              type: 'number',
              required: true,
              defaultValue: 0,
            },
            linkField('link'),
          ],
        },
      ],
    },
    {
      name: 'legalText',
      type: 'textarea',
      localized: true,
    },
  ],
  hooks: {
    beforeChange: [denyEditorPublishGlobal],
    afterChange: [revalidateFooter],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    max: 100,
  },
}
