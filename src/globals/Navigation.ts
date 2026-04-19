import type { GlobalConfig } from 'payload'

import { authenticatedOrPublishedGlobal } from '@/access/authenticatedOrPublishedGlobal'
import { editorOrAbove } from '@/access/editorOrAbove'
import { linkField } from '@/fields/link'
import { denyEditorPublishGlobal } from '@/hooks/denyEditorPublish'
import { createGlobalRevalidationHook } from '@/hooks/revalidation/createHooks'
import { buildPreviewURL } from '@/utilities/preview'

const revalidateNavigation = createGlobalRevalidationHook({
  draftsEnabled: true,
  slug: 'navigation',
  getPaths: () => ['/'],
  getTags: () => ['navigation'],
})

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: authenticatedOrPublishedGlobal,
    update: editorOrAbove,
  },
  admin: {
    preview: (data) =>
      buildPreviewURL({
        path: '/',
        resourceType: 'global',
        resourceSlug: 'navigation',
        status: (data as { _status?: string })?._status,
      }),
    livePreview: {
      url: ({ data }) =>
        buildPreviewURL({
          path: '/',
          resourceType: 'global',
          resourceSlug: 'navigation',
          status: (data as { _status?: string })?._status,
        }),
    },
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
          required: true,
        },
        {
          name: 'isCta',
          type: 'checkbox',
          defaultValue: false,
        },
        linkField('link'),
      ],
    },
  ],
  hooks: {
    beforeChange: [denyEditorPublishGlobal],
    afterChange: [revalidateNavigation],
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
