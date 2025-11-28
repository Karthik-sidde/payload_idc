# Payload CMS - Event Management System

## What Was Created

A fully functional **Payload CMS backend** for event management, ready to connect with your frontend at `https://idc-eta.vercel.app`.

## New Collections Added

### 1. **Events** (`src/collections/Events.ts`)
- Title, slug, description (rich text)
- Start/end dates and times
- Venue & speakers (relationships)
- Capacity & registration tracking
- Featured image
- Status (draft, published, cancelled, completed)
- Tags for categorization

### 2. **Speakers** (`src/collections/Speakers.ts`)
- Name, email, bio (rich text)
- Profile photo
- Role & company
- Social media links (Twitter, LinkedIn, GitHub, Website)

### 3. **Venues** (`src/collections/Venues.ts`)
- Name, full address (city, state, country, ZIP)
- Capacity
- Map link
- Venue photo
- Amenities list

## Configuration Changes

### `payload.config.ts`
✅ Added Events, Speakers, Venues collections  
✅ Configured CORS for `https://idc-eta.vercel.app`  
✅ Added CSRF tokens for security  
✅ MongoDB connection via MongoDB Atlas (already in `.env`)

### `.env` (Already Set)
- `DATABASE_URI` → MongoDB Atlas connection string ✅
- `PAYLOAD_SECRET` → Encryption key ✅

## API Endpoints Available

| Method | Endpoint | Auth Required |
|--------|----------|---------------|
| GET | `/api/events` | No |
| GET | `/api/events/:id` | No |
| POST | `/api/events` | Yes (JWT) |
| PATCH | `/api/events/:id` | Yes |
| DELETE | `/api/events/:id` | Yes |
| GET | `/api/speakers` | No |
| GET | `/api/venues` | No |
| POST | `/api/users/login` | No |
| POST | `/api/users/logout` | Yes |
| GET | `/api/users/me` | Yes |

## How Your Frontend Can Connect

### Option 1: Use the Integration Helper
Copy `FRONTEND_INTEGRATION.js` to your frontend and import the functions:

```javascript
import { getEvents, loginUser, createEvent } from './cms-api';

// Get published events
const events = await getEvents({ status: 'published' });

// Login
const { token } = await loginUser('admin@example.com', 'password');

// Create event (requires token)
const newEvent = await createEvent({
  title: 'My Event',
  startDate: '2025-12-20',
  venue: venueId,
  speakers: [speakerId]
}, token);
```

### Option 2: Direct API Calls
```javascript
// Fetch events
fetch('http://your-cms-url/api/events')
  .then(r => r.json())
  .then(data => console.log(data.docs));

// Create event with auth
fetch('http://your-cms-url/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(eventData)
});
```

## Next Steps

### 1. Start the CMS Server
```bash
cd /Users/karthiksidde/Desktop/Payload-cms/idc
pnpm install
pnpm run dev
```

Server runs on `http://localhost:3000`

### 2. Create Admin User
```bash
pnpm run payload user:create
```

### 3. Access Admin Panel
Visit `http://localhost:3000/admin` and log in

### 4. Add Test Data
- Create a venue
- Create speakers
- Create an event linking to the venue and speakers

### 5. Update Frontend
- Replace API endpoint from `http://localhost:3000` to your deployed CMS URL
- Test API calls to verify connectivity
- Handle JWT tokens for authenticated operations

## CORS Configuration

Frontend `https://idc-eta.vercel.app` is already whitelisted. If you need to add more origins, edit `payload.config.ts`:

```typescript
cors: [
  'https://idc-eta.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  // Add more origins here
],
```

## Database

- **Type**: MongoDB Atlas
- **Connection String**: Already configured in `.env`
- **Database**: `Cluster0`
- **User**: `karthisidde_db_user`

## Files to Reference

- `README_EVENTS_CMS.md` — Full documentation
- `FRONTEND_INTEGRATION.js` — Frontend API helper functions
- `src/payload.config.ts` — CMS configuration
- `src/collections/Events.ts` — Event collection schema
- `src/collections/Speakers.ts` — Speaker collection schema
- `src/collections/Venues.ts` — Venue collection schema

## Ready to Deploy?

When deploying to production:

1. Set environment variables in your hosting platform
2. Update CORS origins to match your production frontend URL
3. Use a strong `PAYLOAD_SECRET` (generate a new random string)
4. Ensure MongoDB Atlas IP whitelist includes your server

---

**Your Event Management CMS is ready! 🚀**
