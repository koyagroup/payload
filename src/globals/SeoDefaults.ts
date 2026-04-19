import type { GlobalConfig } from 'payload'

import { authenticatedOrPublishedGlobal } from '@/access/authenticatedOrPublishedGlobal'
import { editorOrAbove } from '@/access/editorOrAbove'
import { denyEditorPublishGlobal } from '@/hooks/denyEditorPublish'
import { createGlobalRevalidationHook } from '@/hooks/revalidation/createHooks'
import { buildPreviewURL } from '@/utilities/preview'

const revalidateSeoDefaults = createGlobalRevalidationHook({
  draftsEnabled: true,
  slug: 'seo-defaults',
  getPaths: () => ['/'],
  getTags: () => ['seo-defaults'],
})

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  access: {
    read: authenticatedOrPublishedGlobal,
    update: editorOrAbove,
  },
  admin: {
    preview: (data) =>
      buildPreviewURL({
        path: '/',
        resourceType: 'global',
        resourceSlug: 'seo-defaults',
        status: (data as { _status?: string })?._status,
      }),
    livePreview: {
      url: ({ data }) =>
        buildPreviewURL({
          path: '/',
          resourceType: 'global',
          resourceSlug: 'seo-defaults',
          status: (data as { _status?: string })?._status,
        }),
    },
  },
  fields: [
    {
      name: 'titleSuffix',
      type: 'text',
    },
    {
      name: 'fallbackTitle',
      type: 'text',
    },
    {
      name: 'fallbackDescription',
      type: 'textarea',
    },
    {
      name: 'fallbackOgImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'robotsTxt',
      type: 'textarea',
    },
  ],
  hooks: {
    beforeChange: [denyEditorPublishGlobal],
    afterChange: [revalidateSeoDefaults],
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
