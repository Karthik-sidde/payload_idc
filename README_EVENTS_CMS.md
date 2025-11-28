# Event Management CMS - Payload Backend

A headless CMS for managing events, speakers, and venues built with **Payload CMS 3.65.0**, **Next.js 15**, and **MongoDB**.

## Features

✅ **Event Management** - Create, edit, and publish events  
✅ **Speaker Management** - Manage speaker profiles and social links  
✅ **Venue Management** - Track venues, capacity, and amenities  
✅ **Rich Content Editor** - Lexical-based rich text editor  
✅ **Media Management** - Upload and manage images  
✅ **User Authentication** - Built-in user collection with auth  
✅ **REST API** - Full REST API for frontend consumption  
✅ **GraphQL Support** - Query data via GraphQL  
✅ **CORS Enabled** - Configured for frontend at `https://idc-eta.vercel.app`

## Quick Start

### 1. Install Dependencies
```bash
cd idc
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update with your MongoDB URI:
```bash
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/db?appName=Cluster0
PAYLOAD_SECRET=your-secret-key
```

### 3. Start Development Server
```bash
npm run dev
```

The server will start at `http://localhost:3000`:
- **Admin Panel**: http://localhost:3000/admin
- **REST API**: http://localhost:3000/api
- **GraphQL**: http://localhost:3000/graphql

## Collections

### Events
- Title, description, dates/times
- Venue & speakers relationship
- Capacity tracking
- Status (draft, published, cancelled, completed)
- Tags for categorization

### Speakers
- Name, email, bio
- Profile photo
- Role and company
- Social media links (Twitter, LinkedIn, GitHub, Website)

### Venues
- Name, address, city, state, country, ZIP
- Capacity
- Map link
- Amenities list
- Venue photo

### Users
- Email-based authentication
- Admin user management

### Media
- Image/file uploads
- Referenced by events and venues

## API Usage

### Get All Events
```bash
curl http://localhost:3000/api/events
```

### Get Single Event
```bash
curl http://localhost:3000/api/events/:id
```

### Create Event (Requires Auth)
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Event", "startDate":"2025-12-15"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com", "password":"password123"}'
```

## Frontend Integration

Your frontend at `https://idc-eta.vercel.app` is already CORS-enabled. Make API requests like:

```javascript
// Fetch events
const events = await fetch('http://your-cms-url/api/events').then(r => r.json());

// Login
const { token } = await fetch('http://your-cms-url/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'password' })
}).then(r => r.json());

// Create event (with auth)
const event = await fetch('http://your-cms-url/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ title: 'New Event', startDate: '2025-12-20' })
}).then(r => r.json());
```

## Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm start               # Start production server
npm run generate:types   # Generate TypeScript types from Payload config
npm run generate:importmap
npm run lint             # Run ESLint
npm run test:int         # Integration tests (Vitest)
npm run test:e2e         # E2E tests (Playwright)
```

## Deployment

### To MongoDB Atlas:
1. Set `DATABASE_URI` environment variable with your Atlas connection string
2. Set `PAYLOAD_SECRET` to a secure random string

### To Vercel (with Next.js):
```bash
vercel --prod
```

Ensure environment variables are set in Vercel dashboard.

## Project Structure

```
idc/
├── src/
│   ├── collections/
│   │   ├── Events.ts       # Event collection
│   │   ├── Speakers.ts     # Speaker collection
│   │   ├── Venues.ts       # Venue collection
│   │   ├── Users.ts        # User auth collection
│   │   └── Media.ts        # Media/upload collection
│   ├── app/                # Next.js app directory
│   └── payload.config.ts   # Payload CMS configuration
├── tests/                  # Integration & E2E tests
├── package.json
├── tsconfig.json
└── .env                    # Environment variables
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URI` | MongoDB connection string | ✅ |
| `PAYLOAD_SECRET` | Secret key for encryption | ✅ |
| `FRONTEND_URL` | Frontend origin for CORS | ❌ |
| `SERVER_URL` | Public server URL | ❌ |

## Troubleshooting

**MongoDB Connection Failed**
- Verify `DATABASE_URI` is correct
- Ensure your IP is whitelisted in MongoDB Atlas

**CORS Errors**
- Check that frontend origin is in `payload.config.ts` cors array
- Ensure requests include proper headers

**Admin Login Issues**
- Run `pnpm run payload user:create` to create an admin user

## Support

For Payload CMS docs: https://payloadcms.com/docs  
For Next.js docs: https://nextjs.org/docs
