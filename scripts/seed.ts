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

async function upsertGlobal(payload: any, slug: string, data: Record<string, unknown>) {
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

  await upsertUser(payload, process.env.SEED_ADMIN_EMAIL, process.env.SEED_ADMIN_PASSWORD, 'admin')
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
      'Borderless finance infrastructure. Mobile money in, Bitcoin out — built for how money actually moves.',
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
          label: 'Convert',
          type: 'internal',
          href: '/#convert',
          openInNewTab: false,
        },
      },
      {
        sortOrder: 1,
        isCta: false,
        link: {
          label: 'How it works',
          type: 'internal',
          href: '/#how',
          openInNewTab: false,
        },
      },
      {
        sortOrder: 2,
        isCta: false,
        link: {
          label: 'Stocks',
          type: 'internal',
          href: '/#stocks',
          openInNewTab: false,
        },
      },
      {
        sortOrder: 3,
        isCta: false,
        link: {
          label: 'Card',
          type: 'internal',
          href: '/#card',
          openInNewTab: false,
        },
      },
      {
        sortOrder: 4,
        isCta: false,
        link: {
          label: 'Company',
          type: 'internal',
          href: '/#about',
          openInNewTab: false,
        },
      },
      {
        sortOrder: 5,
        isCta: true,
        link: {
          label: 'Get started',
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
              label: 'The card',
              type: 'internal',
              href: '/#card',
              openInNewTab: false,
            },
          },
          {
            sortOrder: 2,
            link: {
              label: 'Stocks',
              type: 'internal',
              href: '/#stocks',
              openInNewTab: false,
            },
          },
        ],
      },
      {
        title: 'Company',
        sortOrder: 1,
        links: [
          {
            sortOrder: 0,
            link: {
              label: 'About',
              type: 'internal',
              href: '/#about',
              openInNewTab: false,
            },
          },
        ],
      },
      {
        title: 'Legal',
        sortOrder: 2,
        links: [
          {
            sortOrder: 0,
            link: {
              label: 'Terms',
              type: 'internal',
              href: '/legal/terms-of-service',
              openInNewTab: false,
            },
          },
          {
            sortOrder: 1,
            link: {
              label: 'Privacy',
              type: 'internal',
              href: '/legal/privacy-policy',
              openInNewTab: false,
            },
          },
        ],
      },
    ],
    legalText: '© 2026 Koya. All rights reserved.\nNairobi · Built for Africa and beyond',
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
      // step-330 rebrand: landing.html is the design SoT. Six sections, in
      // template order. Old blocks stay registered for rollback but are no
      // longer composed here.
      {
        blockType: 'landingHero',
        heading: 'Buy and sell crypto in Kenya, instantly.',
        subheading:
          'Koya is the simplest way to move between shillings and Bitcoin, USDT and more. Cash in with M-Pesa, Airtel Money or your bank card — and cash out the same way, in seconds.',
        primaryCta: { label: 'Start converting', href: '/convert' },
        secondaryCta: { label: 'See the card', href: '/#card' },
        trustSignals: [
          { label: 'M-Pesa, Airtel & cards' },
          { label: 'Settles in seconds' },
          { label: 'Compliance-screened' },
        ],
        widgetFootnote: 'Guest conversion up to KES 100,000/day. No account required.',
      },
      {
        blockType: 'howItWorks',
        eyebrow: 'How it works',
        heading: 'Buy or sell crypto in three steps.',
        subheading:
          "Whether you're cashing in or cashing out, Koya gives you a live, locked quote and settles in seconds.",
        steps: [
          {
            title: 'Choose buy or sell',
            body: "Pick your asset — Bitcoin, USDT and more — and whether you're buying or selling. Lock a live quote for 15 seconds.",
          },
          {
            title: 'Pay your way',
            body: 'Buying? Pay with M-Pesa, Airtel Money or a bank card. Selling? Send the crypto to Koya from any wallet.',
          },
          {
            title: 'Settle in seconds',
            body: 'Buying? Crypto lands in your wallet. Selling? Cash hits your M-Pesa, Airtel or bank account — instantly.',
          },
        ],
      },
      {
        blockType: 'cards',
        eyebrow: 'The Koya card',
        heading: 'Spend your balance, anywhere Mastercard works.',
        subheading:
          'A matte-black Mastercard tied to your Koya balance. Hold KES, BTC, or stablecoins — spend in any currency, settle instantly.',
        features: [
          {
            title: 'Multi-currency balance',
            description: 'Hold KES, BTC, USDC and USDT in one account.',
          },
          {
            title: 'Spend worldwide',
            description: 'Tap, swipe, or pay online anywhere Mastercard is accepted.',
          },
          {
            title: 'Live rates',
            description: 'Convert at transparent, mid-market rates — refreshed every 15s.',
          },
        ],
      },
      {
        blockType: 'stocksTicker',
        eyebrow: 'Stocks',
        heading: 'Stocks, moving in real time.',
      },
      {
        // stats intentionally omitted: the template's four counters (converted
        // to date, active customers, avg settlement, uptime) are operator-
        // supplied real numbers, added via the admin when available.
        blockType: 'whyKoya',
        eyebrow: 'Why Koya',
        heading: 'Money should move like a message.',
        subheading:
          'For most of Africa, moving value across a border still means queues, paperwork, and days of waiting. Koya rebuilds that rail on open money — mobile money in, Bitcoin out — so value travels at the speed of the internet, settles on-chain, and stays in your custody.',
      },
      {
        blockType: 'waitlistCta',
        eyebrow: 'Coming soon',
        heading: 'Koya is live in Kenya. Your country is next.',
        subheading:
          "Tanzania, Uganda and Nigeria are next on the rail. Join the waitlist and we'll tell you the day Koya goes live near you.",
        emailPlaceholder: 'you@example.com',
        buttonLabel: 'Join waitlist',
        successText: "You're on the list. We'll be in touch.",
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
    body: richTextParagraph(
      'This privacy policy explains how Koya handles and protects your data.',
    ),
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
