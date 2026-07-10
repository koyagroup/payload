import type { GlobalConfig } from 'payload'

import { authenticatedOrPublishedGlobal } from '@/access/authenticatedOrPublishedGlobal'
import { editorOrAbove } from '@/access/editorOrAbove'
import { denyEditorPublishGlobal } from '@/hooks/denyEditorPublish'
import { createGlobalRevalidationHook } from '@/hooks/revalidation/createHooks'
import { buildPreviewURL } from '@/utilities/preview'

// step-336: the cookie-consent banner's headline + "how Koya uses cookies" body
// are editable here. The category descriptions and button labels stay fixed in
// code (they are the Cookie.html design SoT); the web falls back to built-in
// defaults if these are empty. Localized for parity with the rest of the site.
const revalidateConsent = createGlobalRevalidationHook({
  draftsEnabled: true,
  slug: 'cookie-consent',
  getPaths: () => ['/'],
  getTags: () => ['cookie-consent'],
})

export const CookieConsent: GlobalConfig = {
  slug: 'cookie-consent',
  access: {
    read: authenticatedOrPublishedGlobal,
    update: editorOrAbove,
  },
  admin: {
    description:
      'Text shown in the cookie-consent banner. Category descriptions and button labels are fixed in code; the web uses built-in defaults if these are empty.',
    preview: (data) =>
      buildPreviewURL({
        path: '/',
        resourceType: 'global',
        resourceSlug: 'cookie-consent',
        status: (data as { _status?: string })?._status,
      }),
    livePreview: {
      url: ({ data }) =>
        buildPreviewURL({
          path: '/',
          resourceType: 'global',
          resourceSlug: 'cookie-consent',
          status: (data as { _status?: string })?._status,
        }),
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: {
        description: 'Banner headline. Default: “We value your privacy”.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'How Koya uses cookies — the banner intro paragraph shown to users.',
      },
    },
  ],
  hooks: {
    beforeChange: [denyEditorPublishGlobal],
    afterChange: [revalidateConsent],
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
