import type { Field } from 'payload'

import { BUTTON_VARIANTS, SECTION_VARIANTS, THEME_PRESETS } from '@/lib/theme'

export const pageThemeOverrideField = (): Field => ({
  name: 'themeOverride',
  type: 'group',
  admin: {
    description:
      'Optional page-level override. Values are constrained to approved design tokens and variants.',
  },
  fields: [
    {
      name: 'preset',
      type: 'select',
      options: THEME_PRESETS.map((preset) => ({
        label: preset,
        value: preset,
      })),
    },
    {
      name: 'sectionVariant',
      type: 'select',
      options: SECTION_VARIANTS.map((variant) => ({
        label: variant,
        value: variant,
      })),
    },
    {
      name: 'buttonVariant',
      type: 'select',
      options: BUTTON_VARIANTS.map((variant) => ({
        label: variant,
        value: variant,
      })),
    },
  ],
})
