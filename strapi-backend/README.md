# EuroBot Hub - Strapi v4 Backend

This is the Strapi v4.26 CMS backend for the EuroBot Hub project.

## ⚠️ CRITICAL FIX - API Structure

**Issue Fixed**: Missing API routes, controllers, and services files caused deployment failures.

**What was wrong**:
- Collection Types (Product, Article) had only `schema.json` files
- Missing `routes/*.js`, `controllers/*.js`, and `services/*.js`
- Plugin i18n failed with: `Cannot read properties of undefined (reading 'routes')`

**What was fixed**:
- Created complete API structure for both Collection Types
- Added default routes, controllers, and services using Strapi factories
- Fixed health check path in render.yaml

## ✅ Current API Structure

```
src/api/
├── article/
│   ├── content-types/article/
│   │   └── schema.json
│   ├── controllers/
│   │   └── article.js ✅
│   ├── routes/
│   │   └── article.js ✅
│   └── services/
│       └── article.js ✅
└── product/
    ├── content-types/product/
    │   └── schema.json
    ├── controllers/
    │   └── product.js ✅
    ├── routes/
    │   └── product.js ✅
    └── services/
        └── product.js ✅
```

## 🚀 Quick Deployment

### Vercel Deployment (NOT Recommended for Strapi)

**⚠️ WARNING**: Vercel is NOT recommended for Strapi because:
- Ephemeral filesystem (uploaded media files are lost)
- No persistent storage for `public/uploads/`
- Use Render.com instead for persistent disk storage

### Render Deployment (RECOMMENDED)

The `render.yaml` file is pre-configured for automatic deployment with persistent disk storage.

## Prerequisites

- Node.js 18.x - 20.x (as specified in package.json engines)
- npm 6.0.0 or higher
- PostgreSQL database (Supabase recommended)
- Render.com account (for deployment with persistent storage)

## Local Development Setup

### 1. Install Dependencies

```bash
cd strapi-backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and set your database connection:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

### 3. Run Development Server

```bash
npm run develop
```

The admin panel will be available at `http://localhost:1337/admin`

### 4. Create First Admin User

On first run, you'll be prompted to create an admin user through the browser.

## Production Deployment on Render.com

### Step 1: Create Supabase Database

1. Go to https://supabase.com and create a new project
2. Wait for database initialization (~2 minutes)
3. Go to **Project Settings** → **Database**
4. Copy the **Connection String** (URI format)
5. Replace `[YOUR-PASSWORD]` with your actual database password

### Step 2: Push to GitHub

1. Create a new repository on GitHub (e.g., `eurobot-strapi-backend`)
2. Push this folder to the repository:

```bash
cd strapi-backend
git init
git add .
git commit -m "Initial Strapi backend"
git remote add origin https://github.com/YOUR-USERNAME/eurobot-strapi-backend.git
git push -u origin main
```

### Step 3: Deploy on Render.com

1. Go to https://render.com and sign in
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Render will detect `render.yaml` automatically
5. Add the environment variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Your Supabase connection string from Step 1
6. Click **Create Web Service**

### Step 4: Wait for Deployment

- First build takes ~5-10 minutes
- Monitor logs in Render dashboard
- Service will be available at `https://eurobot-hub-strapi.onrender.com`

### Step 5: Access Admin Panel

1. Visit `https://your-service-name.onrender.com/admin`
2. Create your first admin user
3. Log in to the admin panel

## Adding Content

### Products

1. Go to **Content Manager** → **Product**
2. Click **Create new entry**
3. Fill in all fields:
   - Name (required)
   - Slug (auto-generated)
   - Description (short and full)
   - Price in EUR (required)
   - Brand (required)
   - Robot Height in cm (required)
   - Image URL
   - Gallery (JSON array of image URLs)
   - Specs Table (JSON object)
   - Smart Home Matrix (JSON object)
   - Legal Compliance (JSON object)
4. Set **Locale** (pl/en/de) for i18n support
5. Click **Publish**

### Articles

1. Go to **Content Manager** → **Article**
2. Click **Create new entry**
3. Fill in fields:
   - Title (required)
   - Slug (auto-generated)
   - Content (rich text)
   - Description Short
   - Featured Image URL
   - Category
   - Published At (date)
   - Is Expert Report (checkbox)
   - Report PDF URL (if applicable)
4. Set **Locale** (pl/en/de)
5. Click **Publish**

## Content Structure Examples

### Product Specs Table (JSON)
```json
{
  "dof": 40,
  "battery_kwh": 2.3,
  "payload_kg": 20,
  "speed_ms": 2.5
}
```

### Smart Home Matrix (JSON)
```json
{
  "alexa": "full",
  "google_home": "full",
  "homekit": "partial"
}
```

### Legal Compliance (JSON)
```json
{
  "ai_act_status": "W trakcie certyfikacji",
  "gdpr_compliant": true,
  "ce_mark": true
}
```

### Gallery (JSON Array)
```json
[
  "/images/product-1.jpg",
  "/images/product-2.jpg",
  "/images/product-3.jpg"
]
```

## API Endpoints

After deployment, your API will be available at:

- Products: `https://your-service.onrender.com/api/products`
- Articles: `https://your-service.onrender.com/api/articles`
- Single Product: `https://your-service.onrender.com/api/products?filters[slug][$eq]=product-slug`
- Single Article: `https://your-service.onrender.com/api/articles?filters[slug][$eq]=article-slug`

## Connecting Frontend

Update your Next.js frontend environment variable:

```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-service-name.onrender.com
```

## Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL is correct
- Ensure Supabase project is active
- Check SSL settings are enabled

### Build Failures

- Check Node.js version (must be 18+)
- Verify all dependencies are listed in package.json
- Review Render logs for specific errors

### API Returns Empty Data

- Ensure content is **Published** (not just Saved as Draft)
- Check public permissions are enabled in bootstrap
- Verify i18n locale matches your content

## Support

For issues, check:
- Strapi v4 Documentation: https://docs-v4.strapi.io/
- Render Documentation: https://docs.render.com/
- Supabase Documentation: https://supabase.com/docs

## Recent Fixes

### 2025-11-03: Fixed Deployment Failure
- **Problem**: `Cannot read properties of undefined (reading 'routes')`
- **Cause**: Missing API routes, controllers, and services files
- **Solution**: Created complete API structure for Product and Article Collection Types
- **Files Added**:
  - `src/api/product/routes/product.js`
  - `src/api/product/controllers/product.js`
  - `src/api/product/services/product.js`
  - `src/api/article/routes/article.js`
  - `src/api/article/controllers/article.js`
  - `src/api/article/services/article.js`
- **Config Update**: Changed health check path in render.yaml from `/` to `/_health`
