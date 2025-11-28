# Vercel Environment Variables Configuration

This file documents the required environment variables for deploying to Vercel.

## Required Environment Variables

Add these to your Vercel project settings (Settings > Environment Variables):

### Database
- `DATABASE_URI`: Your MongoDB connection string
  - Example: `mongodb+srv://user:password@cluster.mongodb.net/idc?retryWrites=true&w=majority`

### Security
- `PAYLOAD_SECRET`: A secure random string for payload encryption
  - Generate with: `openssl rand -base64 32`
  - Minimum 32 characters recommended

### Public Variables (visible on client)
- `NEXT_PUBLIC_CMS_URL`: The base URL of your CMS
  - Production: `https://your-domain.vercel.app`
  - Development: `http://localhost:3000`

## Setup Steps

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable above
5. Make sure to select the appropriate environments (Production, Preview, Development)
6. Redeploy the project

## Important Notes

- `DATABASE_URI` and `PAYLOAD_SECRET` should be treated as secrets
- Environment variables are cached in Vercel, so redeploy after changes
- For MongoDB Atlas, ensure your cluster allows connections from Vercel IPs (use `0.0.0.0/0` or Vercel's IP ranges)
- This project uses **npm** as the package manager (not pnpm)
