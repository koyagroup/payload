import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Faqs } from '@/collections/Faqs'
import { LegalPages } from '@/collections/LegalPages'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Redirects } from '@/collections/Redirects'
import { Users } from '@/collections/Users'
import { WhatsAppPreviewLinks } from '@/collections/WhatsAppPreviewLinks'
import { Footer } from '@/globals/Footer'
import { Navigation } from '@/globals/Navigation'
import { SeoDefaults } from '@/globals/SeoDefaults'
import { SiteSettings } from '@/globals/SiteSettings'
import { ThemeSettings } from '@/globals/ThemeSettings'
import { getServerSideURL } from '@/utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseURL =
  process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5432/koya_payload'

const payloadSecret = process.env.PAYLOAD_SECRET || 'koya-local-dev-secret'

const serverURL = getServerSideURL()
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

const storagePlugins = blobToken
  ? [
      vercelBlobStorage({
        collections: {
          media: true,
        },
        token: blobToken,
      }),
    ]
  : []

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Pages, Media, Faqs, LegalPages, WhatsAppPreviewLinks, Users, Redirects],
  globals: [SiteSettings, SeoDefaults, ThemeSettings, Navigation, Footer],
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, 'migrations'),
    pool: {
      connectionString: databaseURL,
    },
    push: process.env.PAYLOAD_PUSH_SCHEMA === 'true',
  }),
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: storagePlugins,
  cors: [serverURL],
  csrf: [serverURL],
  sharp,
})
