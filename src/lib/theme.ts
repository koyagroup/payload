export const SECTION_TYPES = [
  'marketRibbon',
  'hero',
  'guestWidgetEmbed',
  'trustStrip',
  'featureGrid',
  'howItWorks',
  'security',
  'cards',
  'globalFinance',
  'finalCta',
  'convertHero',
  'trustFooterItems',
  'richTextContent',
  'mediaShowcase',
  'cta',
] as const

export const THEME_PRESETS = ['koyaDefault', 'midnight', 'sandstone', 'emerald'] as const

export const COLOR_TOKENS = [
  'gold-500',
  'gold-600',
  'cyan-500',
  'emerald-500',
  'slate-900',
  'slate-950',
  'neutral-100',
  'neutral-900',
] as const

export const SECTION_VARIANTS = ['default', 'elevated', 'subtle', 'inverted'] as const

export const BUTTON_VARIANTS = ['solid', 'outline', 'ghost'] as const

export type SectionType = (typeof SECTION_TYPES)[number]
