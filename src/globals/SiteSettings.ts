import type { GlobalConfig } from 'payload'

import { authenticatedOrPublishedGlobal } from '@/access/authenticatedOrPublishedGlobal'
import { editorOrAbove } from '@/access/editorOrAbove'
import { denyEditorPublishGlobal } from '@/hooks/denyEditorPublish'
import { createGlobalRevalidationHook } from '@/hooks/revalidation/createHooks'
import { isAbsoluteURL } from '@/utilities/paths'
import { buildPreviewURL } from '@/utilities/preview'

const revalidateSiteSettings = createGlobalRevalidationHook({
  draftsEnabled: true,
  slug: 'site-settings',
  getPaths: () => ['/'],
  getTags: () => ['site-settings', 'navigation', 'footer'],
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: authenticatedOrPublishedGlobal,
    update: editorOrAbove,
  },
  admin: {
    preview: (data) =>
      buildPreviewURL({
        path: '/',
        resourceType: 'global',
        resourceSlug: 'site-settings',
        status: (data as { _status?: string })?._status,
      }),
    livePreview: {
      url: ({ data }) =>
        buildPreviewURL({
          path: '/',
          resourceType: 'global',
          resourceSlug: 'site-settings',
          status: (data as { _status?: string })?._status,
        }),
    },
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'siteTagline',
      type: 'text',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
    },
    {
      name: 'defaultMetaTitle',
      type: 'text',
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
    },
    {
      name: 'logoMark',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoIcon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'appleIcon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'X', value: 'x' },
            { label: 'Discord', value: 'discord' },
            { label: 'Github', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          validate: (value: unknown) => {
            if (typeof value !== 'string' || !isAbsoluteURL(value)) {
              return 'Social URL must be a valid http/https URL.'
            }

            return true
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [denyEditorPublishGlobal],
    afterChange: [revalidateSiteSettings],
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
