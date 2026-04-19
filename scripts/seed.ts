import 'dotenv/config'

import { getPayload } from 'payload'

type RichTextDoc = {
  root: {
    children: Array<{
      children: Array<{
        detail: number
        format: number
        mode: 'normal'
        style: string
        text: string
        type: 'text'
        version: number
      }>
      direction: 'ltr'
      format: ''
      indent: number
      textFormat: number
      textStyle: string
      type: 'paragraph'
      version: number
    }>
    direction: 'ltr'
    format: ''
    indent: number
    type: 'root'
    version: number
  }
}

const richTextParagraph = (text: string): RichTextDoc => ({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
})

async function upsertByField(
  payload: any,
  collection: string,
  field: string,
  value: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection: collection as never,
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      [field]: {
        equals: value,
      },
    },
  })

  if (existing.docs.length > 0) {
    return payload.update({
      collection: collection as never,
      id: String(existing.docs[0]?.id),
      data,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection: collection as never,
    data,
    overrideAccess: true,
  })
}

async function upsertGlobal(
  payload: any,
  slug: string,
  data: Record<string, unknown>,
) {
  return payload.updateGlobal({
    slug: slug as never,
    data: {
      ...data,
      _status: 'published',
    },
    overrideAccess: true,
  })
}

async function upsertUser(
  payload: any,
  email: string | undefined,
  password: string | undefined,
  role: 'admin' | 'editor' | 'publisher',
) {
  if (!email || !password) {
    return
  }

  const existing = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'users',
      id: String(existing.docs[0]?.id),
      data: { role },
      overrideAccess: true,
    })
    return
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      role,
    },
    overrideAccess: true,
  })
}

async function run() {
  const seedDatabaseURL = process.env.SEED_DATABASE_URL?.trim()

  if (seedDatabaseURL) {
    process.env.DATABASE_URL = seedDatabaseURL
  }

  const { default: configPromise } = await import('../src/payload.config')
  const payload = (await getPayload({ config: configPromise })) as any

  await upsertUser(
    payload,
    process.env.SEED_ADMIN_EMAIL,
    process.env.SEED_ADMIN_PASSWORD,
    'admin',
  )
  await upsertUser(
    payload,
    process.env.SEED_EDITOR_EMAIL,
    process.env.SEED_EDITOR_PASSWORD,
    'editor',
  )
  await upsertUser(
    payload,
    process.env.SEED_PUBLISHER_EMAIL,
    process.env.SEED_PUBLISHER_PASSWORD,
    'publisher',
  )

  await upsertGlobal(payload, 'site-settings', {
    siteName: 'Koya',
    siteTagline: 'Borderless Finance',
    siteDescription:
      'Koya is a borderless finance platform for convert, hold, and cross-border money movement.',
    defaultMetaTitle: 'Koya - Borderless Finance',
    defaultMetaDescription:
      'Convert KES to BTC instantly with Koya. Secure, fast, and transparent borderless finance.',
    companyName: 'Koya',
    contactEmail: 'hello@koyabank.com',
    socialLinks: [
      { platform: 'x', url: 'https://x.com/koyabank' },
      { platform: 'github', url: 'https://github.com/koyabank' },
    ],
  })

  await upsertGlobal(payload, 'seo-defaults', {
    titleSuffix: ' | Koya',
    fallbackTitle: 'Koya - Borderless Finance',
    fallbackDescription:
      'Convert KES to BTC instantly with Koya. Secure, fast, and transparent borderless finance.',
    robotsTxt: 'User-agent: *\nAllow: /',
  })

  await upsertGlobal(payload, 'theme-settings', {
    preset: 'koyaDefault',
    primaryToken: 'gold-500',
    accentToken: 'cyan-500',
    backgroundMode: 'dark',
    buttonVariantDefault: 'solid',
    sectionVariantMap: [
      { sectionType: 'hero', variant: 'default' },
      { sectionType: 'cards', variant: 'elevated' },
      { sectionType: 'globalFinance', variant: 'subtle' },
      { sectionType: 'finalCta', variant: 'inverted' },
    ],
  })

  await upsertGlobal(payload, 'navigation', {
    items: [
      {
        sortOrder: 0,
        isCta: false,
        link: {
          label: 'Home',
          type: 'internal',
          href: '/',
          openInNewTab: false,
        },
      },
      {
        sortOrder: 1,
        isCta: true,
        link: {
          label: 'Convert',
          type: 'internal',
          href: '/convert',
          openInNewTab: false,
        },
      },
    ],
  })

  await upsertGlobal(payload, 'footer', {
    columns: [
      {
        title: 'Product',
        sortOrder: 0,
        links: [
          {
            sortOrder: 0,
            link: {
              label: 'Convert',
              type: 'internal',
              href: '/convert',
              openInNewTab: false,
            },
          },
          {
            sortOrder: 1,
            link: {
              label: 'How It Works',
              type: 'internal',
              href: '/#how-it-works',
              openInNewTab: false,
            },
          },
        ],
      },
      {
        title: 'Legal',
        sortOrder: 1,
        links: [
          {
            sortOrder: 0,
            link: {
              label: 'Privacy Policy',
              type: 'internal',
              href: '/legal/privacy-policy',
              openInNewTab: false,
            },
          },
          {
            sortOrder: 1,
            link: {
              label: 'Terms of Service',
              type: 'internal',
              href: '/legal/terms-of-service',
              openInNewTab: false,
            },
          },
        ],
      },
    ],
    legalText: 'Koya. All rights reserved.',
  })

  await upsertByField(payload, 'pages', 'path', '/', {
    title: 'Home',
    path: '/',
    seo: {
      metaTitle: 'Koya - Borderless Finance',
      metaDescription: 'Convert KES to BTC instantly with Koya.',
      robots: 'index,follow',
    },
    sections: [
      { blockType: 'marketRibbon', showLiveRates: true, tickerMode: 'scroll' },
      {
        blockType: 'hero',
        eyebrow: 'Borderless Finance',
        heading: 'Fund via M-Pesa. Convert, hold, and spend globally.',
        subheading: 'One account for KES, USD, BTC, USDC, and USDT.',
        primaryCta: { label: 'Start a conversion', href: '/convert' },
        secondaryCta: { label: 'See how it works', href: '/#how-it-works' },
      },
      {
        blockType: 'guestWidgetEmbed',
        heading: 'Preview your conversion',
        subheading: 'See indicative rates before you commit.',
        badgeText: 'Try It',
      },
      {
        blockType: 'trustStrip',
        heading: 'Built for trust',
        signals: [
          { label: '24/7 monitoring' },
          { label: 'KYC compliant' },
          { label: 'Encrypted' },
        ],
      },
      {
        blockType: 'featureGrid',
        heading: 'Platform pillars',
        columns: '3',
        items: [
          { title: 'Convert instantly', description: 'KES to BTC at live rates', icon: 'wallet' },
          {
            title: 'Hold multiple currencies',
            description: 'One account, multiple wallets',
            icon: 'globe',
          },
          { title: 'Spend globally', description: 'Premium cards from wallet balances', icon: 'card' },
        ],
      },
      {
        blockType: 'howItWorks',
        heading: 'How it works',
        steps: [
          { title: 'Fund', body: 'Deposit through M-Pesa or supported rails.' },
          { title: 'Convert', body: 'Move between supported assets with transparent pricing.' },
          { title: 'Deploy', body: 'Spend, transfer, or invest from the same account.' },
        ],
      },
      { blockType: 'security', heading: 'Security first', controls: [{ title: 'Institutional controls' }] },
      { blockType: 'cards', heading: 'Koya cards', features: [{ title: 'Global acceptance' }] },
      {
        blockType: 'globalFinance',
        heading: 'Global finance access',
        highlights: [{ title: 'Fractional U.S. equities' }],
      },
      {
        blockType: 'finalCta',
        heading: 'Ready to take control of your money?',
        primaryCta: { label: 'Join waitlist', href: '/convert' },
      },
    ],
    _status: 'published',
  })

  await upsertByField(payload, 'pages', 'path', '/convert', {
    title: 'Convert',
    path: '/convert',
    seo: {
      metaTitle: 'Convert KES to BTC - Koya',
      metaDescription: 'Convert Kenyan Shillings to Bitcoin instantly via M-Pesa.',
      robots: 'index,follow',
    },
    sections: [
      {
        blockType: 'convertHero',
        heading: 'Send KES, receive BTC',
        subheading: 'No account required for guest conversion.',
        badgeText: 'Guest Conversion',
      },
      {
        blockType: 'guestWidgetEmbed',
        heading: 'Preview your conversion',
        subheading: 'See rates and complete your conversion flow.',
      },
      {
        blockType: 'trustFooterItems',
        items: [
          { label: '256-bit encryption' },
          { label: 'KYC verified' },
          { label: 'Guest limit: KES 100K/day' },
        ],
      },
    ],
    _status: 'published',
  })

  await upsertByField(payload, 'legal-pages', 'slug', 'privacy-policy', {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    body: richTextParagraph('This privacy policy explains how Koya handles and protects your data.'),
    seo: {
      metaTitle: 'Privacy Policy',
      metaDescription: 'How Koya collects, uses, and protects personal data.',
      robots: 'index,follow',
    },
    _status: 'published',
  })

  await upsertByField(payload, 'legal-pages', 'slug', 'terms-of-service', {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    body: richTextParagraph('These terms govern the use of Koya conversion and wallet services.'),
    seo: {
      metaTitle: 'Terms of Service',
      metaDescription: 'Terms that govern your use of Koya services.',
      robots: 'index,follow',
    },
    _status: 'published',
  })

  await upsertByField(payload, 'faqs', 'question', 'What is Koya?', {
    question: 'What is Koya?',
    answer: 'Koya is a borderless finance platform to convert, hold, and move value globally.',
    category: 'general',
    sortOrder: 0,
    isActive: true,
    _status: 'published',
  })

  await upsertByField(payload, 'faqs', 'question', 'How do I convert KES to BTC?', {
    question: 'How do I convert KES to BTC?',
    answer: 'Enter amount, provide wallet details, and complete payment via M-Pesa.',
    category: 'payments',
    sortOrder: 1,
    isActive: true,
    _status: 'published',
  })

  await upsertByField(payload, 'whatsapp-preview-links', 'key', 'convert', {
    key: 'convert',
    path: '/convert',
    ogTitle: 'Convert KES to BTC - Koya',
    ogDescription: 'Convert Kenyan Shillings to Bitcoin instantly with Koya.',
    isActive: true,
  })

  await upsertByField(payload, 'whatsapp-preview-links', 'key', 'convert_tracking', {
    key: 'convert_tracking',
    path: '/convert',
    ogTitle: 'Track Your Koya Conversion',
    ogDescription: 'View your conversion status in real time on Koya.',
    isActive: true,
  })

  await upsertByField(payload, 'redirects', 'fromPath', '/home', {
    fromPath: '/home',
    targetType: 'internal',
    to: '/',
    statusCode: '302',
    isActive: true,
  })

  payload.logger.info('Koya seed completed successfully.')
}

run()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
