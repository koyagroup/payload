import type { GlobalConfig } from 'payload'

import { authenticatedOrPublishedGlobal } from '@/access/authenticatedOrPublishedGlobal'
import { editorOrAbove } from '@/access/editorOrAbove'
import { denyEditorPublishGlobal } from '@/hooks/denyEditorPublish'
import { createGlobalRevalidationHook } from '@/hooks/revalidation/createHooks'
import {
  BUTTON_VARIANTS,
  COLOR_TOKENS,
  SECTION_TYPES,
  SECTION_VARIANTS,
  THEME_PRESETS,
} from '@/lib/theme'
import { buildPreviewURL } from '@/utilities/preview'

const revalidateThemeSettings = createGlobalRevalidationHook({
  draftsEnabled: true,
  slug: 'theme-settings',
  getPaths: () => ['/'],
  getTags: () => ['theme-settings'],
})

export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  access: {
    read: authenticatedOrPublishedGlobal,
    update: editorOrAbove,
  },
  admin: {
    preview: (data) =>
      buildPreviewURL({
        path: '/',
        resourceType: 'global',
        resourceSlug: 'theme-settings',
        status: (data as { _status?: string })?._status,
      }),
    livePreview: {
      url: ({ data }) =>
        buildPreviewURL({
          path: '/',
          resourceType: 'global',
          resourceSlug: 'theme-settings',
          status: (data as { _status?: string })?._status,
        }),
    },
  },
  fields: [
    {
      name: 'preset',
      type: 'select',
      defaultValue: 'koyaDefault',
      options: THEME_PRESETS.map((preset) => ({
        label: preset,
        value: preset,
      })),
      required: true,
    },
    {
      name: 'primaryToken',
      type: 'select',
      options: COLOR_TOKENS.map((token) => ({
        label: token,
        value: token,
      })),
      required: true,
    },
    {
      name: 'accentToken',
      type: 'select',
      options: COLOR_TOKENS.map((token) => ({
        label: token,
        value: token,
      })),
      required: true,
    },
    {
      name: 'backgroundMode',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
      required: true,
    },
    {
      name: 'buttonVariantDefault',
      type: 'select',
      defaultValue: 'solid',
      options: BUTTON_VARIANTS.map((variant) => ({
        label: variant,
        value: variant,
      })),
      required: true,
    },
    {
      name: 'sectionVariantMap',
      type: 'array',
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          required: true,
          options: SECTION_TYPES.map((sectionType) => ({
            label: sectionType,
            value: sectionType,
          })),
        },
        {
          name: 'variant',
          type: 'select',
          required: true,
          options: SECTION_VARIANTS.map((variant) => ({
            label: variant,
            value: variant,
          })),
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [denyEditorPublishGlobal],
    afterChange: [revalidateThemeSettings],
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
