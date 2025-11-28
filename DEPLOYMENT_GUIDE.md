# Environment Configuration Guide

## Development Environment

### Current Setup (.env)

Your `.env` file is already configured with:

```
DATABASE_URI=mongodb+srv://karthisidde_db_user:LpoLfWwyvtYKJlcz@cluster0.meotnbq.mongodb.net/?appName=Cluster0
PAYLOAD_SECRET=2184963ae1c6f5dff9c3ac29
```

✅ **MongoDB Atlas Connection**: Active and ready  
✅ **Database**: Cluster0 (hosted)  
✅ **PAYLOAD_SECRET**: Set for encryption

### Running Locally

```bash
cd idc
npm install
npm run dev
```

The server will start on:
- 🌐 **Main**: http://localhost:3000
- 🔐 **Admin Panel**: http://localhost:3000/admin
- 📡 **REST API**: http://localhost:3000/api
- 🔗 **GraphQL**: http://localhost:3000/graphql (if enabled)

## Production Deployment

### Option 1: Vercel (Recommended with Next.js)

1. **Push to GitHub**
```bash
git add .
git commit -m "Add Payload CMS event management"
git push origin main
```

2. **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

3. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add environment variables:
     - `DATABASE_URI` = Your MongoDB Atlas URI
     - `PAYLOAD_SECRET` = A new secure random string (generate: `openssl rand -hex 16`)

### Option 2: Self-Hosted (Node.js Server)

**Requirements:**
- Node.js 18.20.2 or higher
- MongoDB Atlas connection or local MongoDB

**Deploy Steps:**

```bash
# 1. Clone/pull your repository
git clone <your-repo>
cd idc

# 2. Install dependencies
npm install

# 3. Set environment variables
export DATABASE_URI="mongodb+srv://..."
export PAYLOAD_SECRET="your-secret-key"
export NODE_ENV="production"

# 4. Build for production
npm run build

# 5. Start server
npm start
```

**Using PM2 (Process Manager):**
```bash
npm install -g pm2

# Create ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'payload-cms',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      DATABASE_URI: 'mongodb+srv://...',
      PAYLOAD_SECRET: 'your-secret-key'
    }
  }]
};
EOF

pm2 start ecosystem.config.js
pm2 save
```

### Option 3: Docker Deployment

**Dockerfile** (already included):

```bash
docker build -t payload-cms .
docker run -p 3000:3000 \
  -e DATABASE_URI="mongodb+srv://..." \
  -e PAYLOAD_SECRET="your-secret-key" \
  payload-cms
```

**Docker Compose** (already included):

```bash
docker-compose up -d
```

## Environment Variables Reference

| Variable | Required | Default | Example |
|----------|----------|---------|---------|
| `DATABASE_URI` | ✅ | None | `mongodb+srv://user:pass@cluster.mongodb.net/db?appName=Cluster0` |
| `PAYLOAD_SECRET` | ✅ | None | `a1b2c3d4e5f6g7h8` (min 16 chars) |
| `NODE_ENV` | ❌ | `development` | `production` |
| `FRONTEND_URL` | ❌ | None | `https://idc-eta.vercel.app` |

## MongoDB Atlas Configuration

### If using MongoDB Atlas (Cloud Database)

1. **Create a MongoDB Atlas Account** (if not done)
   - Visit: https://www.mongodb.com/cloud/atlas
   - Create a free tier cluster

2. **Create Database User**
   - Username: `karthisidde_db_user` ✅ (Already created)
   - Password: `LpoLfWwyvtYKJlcz` ✅ (Already created)

3. **Whitelist IP Addresses**
   - Go to: Security → Network Access
   - Add your server IP: `0.0.0.0/0` (for testing; restrict in production)

4. **Get Connection String**
   - Go to: Databases → Connect → Choose Drivers
   - Copy the URI and add to `.env`

### Connection String Format

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?appName=Cluster0
```

Current connection:
```
mongodb+srv://karthisidde_db_user:LpoLfWwyvtYKJlcz@cluster0.meotnbq.mongodb.net/?appName=Cluster0
```

## Local MongoDB (Alternative)

If you prefer local MongoDB:

1. **Install MongoDB Community Edition**
   - macOS: `brew install mongodb-community`
   - Linux: Follow MongoDB docs
   - Windows: Download from mongodb.com

2. **Start MongoDB Service**
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. **Update .env**
   ```
   DATABASE_URI=mongodb://localhost:27017/payload-cms
   ```

## Generate PAYLOAD_SECRET

For production, generate a secure secret:

```bash
# Option 1: OpenSSL
openssl rand -hex 16

# Option 2: Python
python3 -c "import secrets; print(secrets.token_hex(16))"

# Option 3: Node.js
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

Example output: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

## CORS Configuration for Multiple Frontends

If you have multiple frontend URLs, edit `src/payload.config.ts`:

```typescript
cors: [
  'https://idc-eta.vercel.app',        // Production
  'http://localhost:3000',             // Local dev
  'http://localhost:3001',             // Alternative local
  'https://staging.idc-eta.vercel.app' // Staging
],
csrf: [
  'https://idc-eta.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
],
```

Then regenerate import map:
```bash
npm run generate:importmap
```

## Troubleshooting

### "Cannot connect to database"
- Verify `DATABASE_URI` is correct
- Check MongoDB Atlas IP whitelist
- Ensure MongoDB user credentials are correct

### "PAYLOAD_SECRET is required"
- Generate a secret: `openssl rand -hex 16`
- Add to `.env`: `PAYLOAD_SECRET=your-generated-secret`

### "CORS error from frontend"
- Verify frontend origin is in `cors` array in `payload.config.ts`
- Ensure `credentials: 'include'` is set in frontend fetch requests
- Check browser console for exact error

### Port 3000 Already in Use
```bash
# Find and kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

## Security Best Practices

1. **Secrets**
   - Never commit secrets to Git
   - Use `.env.local` for local overrides
   - Rotate `PAYLOAD_SECRET` regularly

2. **Database**
   - Enable MongoDB Atlas encryption at rest
   - Use strong passwords (min 16 chars)
   - Whitelist only necessary IP addresses

3. **CORS**
   - Only allow trusted origins
   - Use HTTPS in production
   - Set `credentials: 'include'` carefully

4. **API Rate Limiting**
   - Consider adding rate limiting middleware
   - Implement authentication for sensitive endpoints

5. **Admin Access**
   - Use strong admin passwords
   - Enable 2FA if available
   - Regularly review access logs

---

**Ready to go live? 🚀**
