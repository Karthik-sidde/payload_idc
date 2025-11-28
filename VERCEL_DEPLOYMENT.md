# Vercel Deployment Guide

This guide will help you deploy the IDC (Indian Data Club) Event Management Platform to Vercel.

## Prerequisites

- A Vercel account (https://vercel.com)
- Your GitHub repository connected to Vercel
- MongoDB Atlas cluster (or other MongoDB provider)
- Environment variables ready

## Deployment Steps

### 1. Connect Repository
1. Go to https://vercel.com/new
2. Select "Continue with GitHub"
3. Select the `payload_idc` repository
4. Click "Import"

### 2. Configure Environment Variables
Before deploying, add the required environment variables:

1. In the "Environment Variables" section, add:
   - `DATABASE_URI`: Your MongoDB connection string
   - `PAYLOAD_SECRET`: A secure random string (generate: `openssl rand -base64 32`)
   - `NEXT_PUBLIC_CMS_URL`: Your production domain (e.g., `https://your-domain.vercel.app`)

2. Make sure to select the appropriate environments:
   - Production
   - Preview
   - Development

### 3. Deploy
1. Click "Deploy"
2. Wait for the build to complete (usually 3-5 minutes)
3. Your site will be live at `https://[your-project].vercel.app`

## Post-Deployment Configuration

### 4. Update CORS/CSRF in Payload Config
After deployment, you may need to update `src/payload.config.ts` with your production URL if it differs from the default `idc-eta.vercel.app`.

### 5. Database Setup (First Time Only)
1. Create an admin user by visiting `/admin`
2. Set up your collections (Events, Speakers, Venues, Media, Users)
3. Configure your CMS content

### 6. Configure MongoDB Atlas (if using)
Ensure your MongoDB Atlas cluster:
- Has network access from Vercel (allow all IPs: `0.0.0.0/0`)
- Has a database user with appropriate permissions
- Uses the correct connection string format

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly
- Ensure `DATABASE_URI` is a valid MongoDB connection string
- Check build logs in Vercel dashboard for specific errors

### CSS/Styles Not Loading
- The frontend styles are imported in `src/app/(frontend)/layout.tsx`
- Ensure the CSS file at `src/app/(frontend)/styles.css` exists
- Clear browser cache (Cmd+Shift+Delete or Ctrl+Shift+Delete)

### Database Connection Issues
- Verify `DATABASE_URI` environment variable
- Check MongoDB Atlas network access settings
- Ensure database user has read/write permissions

### CORS Errors
- Update the CORS array in `src/payload.config.ts` with your Vercel URL
- Redeploy after making changes

## Performance Optimization

The following optimizations are already configured:

- **SWC Minification**: Faster builds with SWC compiler
- **Image Optimization**: Configured for GitHub CDN and localhost
- **Source Maps Disabled**: Smaller production bundles
- **Compression Enabled**: Reduces transfer size

## Monitoring and Logs

1. Go to your Vercel project dashboard
2. Click on "Deployments"
3. Click on a deployment to see build logs
4. Use "Logs" section to view runtime logs

## Rollback

If deployment issues occur:
1. Go to "Deployments" tab
2. Click on a previous successful deployment
3. Click "Promote to Production"

## Custom Domain

To add a custom domain:
1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records according to Vercel's instructions
4. Update `NEXT_PUBLIC_CMS_URL` environment variable

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Payload CMS Deployment](https://payloadcms.com/docs/production/deployment)
