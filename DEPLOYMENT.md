# 🌐 Deployment Guide - AI Learn NG LMS

This guide covers multiple deployment options for the AI Learn NG LMS application.

## Pre-Deployment Checklist

- [ ] Update `JWT_SECRET` in environment variables
- [ ] Set appropriate database connection
- [ ] Test all features locally with `npm run dev`
- [ ] Build project successfully with `npm run build`
- [ ] Update metadata in `app/layout.tsx`
- [ ] Configure domain/URL settings
- [ ] Set up SSL/HTTPS certificate
- [ ] Create backups of database

## 1. Vercel Deployment (Recommended for Next.js)

### Benefits
- Zero-config deployment
- Automatic scaling
- Built-in analytics
- Free tier available
- Git integration

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select framework: Next.js (auto-detected)

3. **Configure Environment**
   - In "Environment Variables" section, add:
     - `DATABASE_URL`: Your database connection string
     - `JWT_SECRET`: Your secure secret key

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live!

5. **Custom Domain**
   - In Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration

### Production Database

For production, recommend upgrading from SQLite to PostgreSQL:

1. Create PostgreSQL database on [Vercel Postgres](https://vercel.com/storage/postgres)
2. Update `DATABASE_URL` environment variable
3. Run migrations:
   ```bash
   npm run prisma:migrate
   ```

## 2. Netlify Deployment

### Benefits
- GitHub integration
- Build previews
- Serverless functions support
- Form handling

### Steps

1. **Prepare for Static Export** (optional)
   
   Update `next.config.js`:
   ```js
   const nextConfig = {
     output: 'export', // For static export
     // ... other config
   }
   ```

2. **Connect Netlify**
   - Visit [netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository

3. **Build Configuration**
   - Build command: `npm run build`
   - Publish directory: `.next` or `out`

4. **Environment Variables**
   - Add in Site settings → Build & deploy → Environment
   - `DATABASE_URL`
   - `JWT_SECRET`

5. **Deploy**
   - Netlify will auto-deploy on push to main branch

### API Routes on Netlify
API routes work as serverless functions automatically.

## 3. Docker Deployment

### Create Dockerfile

Create `Dockerfile` in root:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --omit=dev

# Copy code
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
```

### Create .dockerignore

```
node_modules
.next
.git
.env
.env.local
dist
```

### Build and Run Docker Image

```bash
# Build image
docker build -t ai-learn-ng-lms .

# Run container
docker run -p 3000:3000 -e DATABASE_URL="file:/data/dev.db" -e JWT_SECRET="your-secret" ai-learn-ng-lms
```

### Docker Compose (with Database)

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:password@postgres:5432/ailearn
      JWT_SECRET: your-secret-key
    depends_on:
      - postgres
    volumes:
      - ./prisma:/app/prisma

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: ailearn
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up
```

## 4. Railway Deployment

### Steps

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up/login

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect GitHub and select repository

3. **Add Services**
   - Add PostgreSQL database
   - Database automatically connected

4. **Set Environment Variables**
   - Add `JWT_SECRET`
   - `DATABASE_URL` auto-configured

5. **Deploy**
   - Railway auto-deploys on changes
   - View logs in dashboard

## 5. AWS Deployment

### Option A: AWS Amplify

1. Visit [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. New app → Connect repository
3. Configure deployment settings
4. Add environment variables
5. Deploy

### Option B: EC2 Instance

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS recommended
   - t2.micro or larger

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   git clone your-repo-url
   cd ai-learn-ng-lms
   npm install
   ```

4. **Set Environment Variables**
   ```bash
   nano .env.local
   # Add DATABASE_URL and JWT_SECRET
   ```

5. **Build & Run**
   ```bash
   npm run build
   npm start
   ```

6. **Setup PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "ai-learn-ng" -- start
   pm2 startup
   pm2 save
   ```

7. **Configure Nginx (Reverse Proxy)**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

   Restart nginx:
   ```bash
   sudo systemctl restart nginx
   ```

8. **Setup SSL/HTTPS**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## 6. DigitalOcean Deployment

### Using App Platform

1. Visit [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Create App → Connect GitHub repo
3. Configure build/run commands
4. Add environment variables
5. Create database (managed PostgreSQL)
6. Deploy

### Using Droplet

Same as AWS EC2 approach with Nginx and PM2.

## Production Environment Variables

```env
# Required
DATABASE_URL="postgresql://user:password@host:5432/ailearn"
JWT_SECRET="generate-strong-random-key-here"

# Optional
NODE_ENV="production"
```

### Generate Secure JWT Secret

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Database Migrations in Production

After deployment, run migrations:

```bash
npm run prisma:migrate -- --skip-generate
```

Or use Prisma Cloud for automatic migrations.

## Monitoring & Logging

### Vercel
- Dashboard shows live logs
- Analytics built-in
- Error tracking

### Self-hosted
Use services like:
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay
- [Datadog](https://www.datadoghq.com) - Full monitoring

## Performance Optimization

### Image Optimization
Already configured with Next.js Image component.

### Database Indexing
Add to `schema.prisma`:
```prisma
model Course {
  @@index([category])
  @@index([level])
}
```

### Caching
- Enable Redis for session caching
- Configure HTTP caching headers
- Use CDN for static assets

## Backup Strategy

### Database Backups
- Automated daily backups (most platforms)
- Manual backups: `pg_dump` for PostgreSQL
- Store backups in S3 or similar

### Code Backups
- GitHub serves as backup
- Tag releases: `git tag v1.0.0`

## Domain Configuration

1. **Buy Domain**
   - Namecheap, GoDaddy, or similar

2. **DNS Configuration**
   - Point nameservers to your hosting
   - Or use CNAME records for Vercel/Netlify

3. **SSL/HTTPS**
   - Auto-configured on most platforms
   - Use Let's Encrypt for self-hosted

## Troubleshooting Deployment

### Build Fails
```bash
# Check build locally
npm run build

# Check logs on deployment platform
# Clear cache and redeploy
```

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check database credentials
- Ensure database service is running
- Check firewall/security groups

### API Routes Not Working
- Verify routes are in `app/api/` directory
- Check route naming conventions
- Review server logs

### Performance Issues
- Monitor database queries
- Check for N+1 queries
- Enable query caching
- Use CDN for static assets

## Rolling Back Deployment

### Vercel
- Click deployment in dashboard
- Click "Promote" on previous deployment

### Netlify
- Go to Deploys
- Select previous deployed version

### Git
```bash
git revert <commit-hash>
git push
```

---

**For more help, refer to [README.md](./README.md) and [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)**
