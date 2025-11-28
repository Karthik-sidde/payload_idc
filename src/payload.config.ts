// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import { Speakers } from './collections/Speakers'
import { Venues } from './collections/Venues'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- IDC Platform',
      description: 'Indian Data Club Event Management Platform',
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
  collections: [Users, Media, Events, Speakers, Venues],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost/idc',
  }),
  cors: [
    process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000',
    'https://idc-eta.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  csrf: [
    process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000',
    'https://idc-eta.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
