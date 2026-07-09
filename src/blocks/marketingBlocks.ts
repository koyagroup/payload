import type { Block, Field } from 'payload'

import { SECTION_VARIANTS } from '@/lib/theme'
import { isAbsoluteURL, isInternalPath, normalizePath } from '@/utilities/paths'

const ctaHrefValidator = (value: unknown): true | string => {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value !== 'string') {
    return 'CTA destination must be a string value.'
  }

  if (value.trim().length === 0) {
    return true
  }

  const trimmed = value.trim()
  if (isAbsoluteURL(trimmed)) {
    return true
  }

  if (!isInternalPath(normalizePath(trimmed))) {
    return 'CTA destination must be an internal path starting with / or a valid http/https URL.'
  }

  return true
}

const ctaFields = (prefix = 'primaryCta'): Field => ({
  name: prefix,
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'href',
      type: 'text',
      validate: ctaHrefValidator,
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value !== 'string') {
              return value
            }

            const trimmed = value.trim()
            if (!trimmed) {
              return ''
            }

            if (isAbsoluteURL(trimmed)) {
              return trimmed
            }

            return normalizePath(trimmed)
          },
        ],
      },
    },
  ],
})

const variantField: Field = {
  name: 'variant',
  type: 'select',
  defaultValue: 'default',
  options: SECTION_VARIANTS.map((variant) => ({
    label: variant,
    value: variant,
  })),
}

const sectionHeadingFields: Field[] = [
  {
    name: 'eyebrow',
    type: 'text',
  },
  {
    name: 'heading',
    type: 'text',
  },
  {
    name: 'subheading',
    type: 'textarea',
  },
  variantField,
]

const marketRibbon: Block = {
  slug: 'marketRibbon',
  labels: {
    singular: 'Market Ribbon',
    plural: 'Market Ribbons',
  },
  fields: [
    {
      name: 'showLiveRates',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'tickerMode',
      type: 'select',
      defaultValue: 'scroll',
      options: [
        { label: 'Scroll', value: 'scroll' },
        { label: 'Static', value: 'static' },
      ],
    },
    variantField,
  ],
}

const hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    ctaFields('primaryCta'),
    ctaFields('secondaryCta'),
  ],
}

const guestWidgetEmbed: Block = {
  slug: 'guestWidgetEmbed',
  labels: {
    singular: 'Guest Widget Embed',
    plural: 'Guest Widget Embeds',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'badgeText',
      type: 'text',
    },
  ],
}

const trustStrip: Block = {
  slug: 'trustStrip',
  labels: {
    singular: 'Trust Strip',
    plural: 'Trust Strips',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'signals',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
  ],
}

const featureGrid: Block = {
  slug: 'featureGrid',
  labels: {
    singular: 'Feature Grid',
    plural: 'Feature Grids',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Shield', value: 'shield' },
            { label: 'Wallet', value: 'wallet' },
            { label: 'Globe', value: 'globe' },
            { label: 'Card', value: 'card' },
            { label: 'Chart', value: 'chart' },
          ],
        },
      ],
    },
  ],
}

const howItWorks: Block = {
  slug: 'howItWorks',
  labels: {
    singular: 'How It Works',
    plural: 'How It Works',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'text',
          admin: {
            description:
              'Step screenshot URL (e.g. the marketing CDN). The web falls back to a built-in default if empty.',
          },
        },
      ],
    },
  ],
}

const security: Block = {
  slug: 'security',
  labels: {
    singular: 'Security Section',
    plural: 'Security Sections',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'controls',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}

const cards: Block = {
  slug: 'cards',
  labels: {
    singular: 'Cards Section',
    plural: 'Cards Sections',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}

const globalFinance: Block = {
  slug: 'globalFinance',
  labels: {
    singular: 'Global Finance Section',
    plural: 'Global Finance Sections',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'highlights',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}

const finalCta: Block = {
  slug: 'finalCta',
  labels: {
    singular: 'Final CTA',
    plural: 'Final CTAs',
  },
  fields: [...sectionHeadingFields, ctaFields('primaryCta'), ctaFields('secondaryCta')],
}

const convertHero: Block = {
  slug: 'convertHero',
  labels: {
    singular: 'Convert Hero',
    plural: 'Convert Heroes',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'badgeText',
      type: 'text',
    },
  ],
}

const trustFooterItems: Block = {
  slug: 'trustFooterItems',
  labels: {
    singular: 'Trust Footer Items',
    plural: 'Trust Footer Items',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

const richTextContent: Block = {
  slug: 'richTextContent',
  labels: {
    singular: 'Rich Text Content',
    plural: 'Rich Text Content',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
  ],
}

const mediaShowcase: Block = {
  slug: 'mediaShowcase',
  labels: {
    singular: 'Media Showcase',
    plural: 'Media Showcases',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      minRows: 1,
      maxRows: 12,
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
  ],
}

const cta: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
  fields: [...sectionHeadingFields, ctaFields('primaryCta'), ctaFields('secondaryCta')],
}

// step-330 landing rebrand blocks. These supersede hero/trustStrip/globalFinance/
// finalCta on the landing page; the old blocks stay registered so previously
// published compositions keep rendering (atomic content cutover + rollback).
const landingHero: Block = {
  slug: 'landingHero',
  labels: {
    singular: 'Landing Hero',
    plural: 'Landing Heroes',
  },
  fields: [
    ...sectionHeadingFields,
    ctaFields('primaryCta'),
    ctaFields('secondaryCta'),
    {
      name: 'trustSignals',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'widgetFootnote',
      type: 'text',
    },
  ],
}

const whyKoya: Block = {
  slug: 'whyKoya',
  labels: {
    singular: 'Why Koya',
    plural: 'Why Koya Sections',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

const stocksTicker: Block = {
  slug: 'stocksTicker',
  labels: {
    singular: 'Stocks Ticker',
    plural: 'Stocks Tickers',
  },
  fields: [...sectionHeadingFields],
}

const waitlistCta: Block = {
  slug: 'waitlistCta',
  labels: {
    singular: 'Waitlist CTA',
    plural: 'Waitlist CTAs',
  },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'emailPlaceholder',
      type: 'text',
    },
    {
      name: 'buttonLabel',
      type: 'text',
    },
    {
      name: 'successText',
      type: 'text',
    },
  ],
}

export const marketingBlocks: Block[] = [
  marketRibbon,
  hero,
  guestWidgetEmbed,
  trustStrip,
  featureGrid,
  howItWorks,
  security,
  cards,
  globalFinance,
  finalCta,
  convertHero,
  trustFooterItems,
  richTextContent,
  mediaShowcase,
  cta,
  landingHero,
  whyKoya,
  stocksTicker,
  waitlistCta,
]
