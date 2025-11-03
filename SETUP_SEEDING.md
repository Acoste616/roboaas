# 🌱 AUTOMATED STRAPI SEEDING SYSTEM

Complete guide to automatically populate your Strapi CMS with products and articles using the Admin API.

---

## 📋 Prerequisites

1. **Strapi Backend Running**
   ```bash
   cd strapi-backend
   npm run develop
   ```
   Strapi should be accessible at `http://localhost:1337`

2. **Strapi Admin Account Created**
   - Visit `http://localhost:1337/admin`
   - Create your admin account if first time

---

## 🔑 Step 1: Create Strapi Admin API Token

### Via Strapi Admin UI:

1. Login to Strapi Admin: `http://localhost:1337/admin`
2. Navigate to: **Settings** → **API Tokens** (under Global settings)
3. Click **"Create new API Token"**
4. Configure:
   - **Name**: `Seeding Token` (or any name you prefer)
   - **Token duration**: `Unlimited`
   - **Token type**: `Full access`
5. Click **"Save"**
6. **IMPORTANT**: Copy the token immediately (it won't be shown again)

### Example token format:
```
f9a7c8b5d2e1f4g6h3i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1
```

---

## ⚙️ Step 2: Configure Environment Variables

### A. Copy `.env.example` to `.env.local`:

```bash
# In project root
cp .env.example .env.local
```

### B. Edit `.env.local` and add your token:

```bash
# Strapi CMS Configuration
STRAPI_API_TOKEN=your_actual_token_here_paste_from_step_1
STRAPI_URL=http://localhost:1337
```

### C. Also add token to Strapi backend `.env`:

```bash
cd strapi-backend
# Create .env if it doesn't exist
touch .env

# Add the same token
echo "STRAPI_API_TOKEN=your_actual_token_here" >> .env
```

---

## 🚀 Step 3: Run Seeding Scripts

### Option A: Seed Everything (Recommended)

Seeds both products AND articles in one command:

```bash
cd strapi-backend
npm run seed
```

**What it does:**
- ✅ Seeds 6 humanoid robot products
- ✅ Seeds 3 strategic blog articles
- ✅ Creates all localizations (EN, PL, DE)
- ✅ Total: 27 content entries

### Option B: Seed Individually

**Products only:**
```bash
npm run seed:products
```

**Articles only:**
```bash
npm run seed:articles
```

---

## ✅ Step 4: Verify Seeding Success

### In Strapi Admin UI:

1. **Products:**
   - Navigate to: **Content Manager** → **Product**
   - You should see 6 products:
     - Neura 4NE-1 Personal Assistant
     - Unitree H1 Advanced Mobility
     - 1X Neo Caregiver Edition
     - EuroBot Guardian Mk II Security Edition
     - Unitree G2 Pro Entry Assistant
     - (+ more variations in different locales)

2. **Articles:**
   - Navigate to: **Content Manager** → **Article**
   - You should see 3 articles:
     - How a Munich CEO Secured His Smart Home
     - Robot vs. Caregiver: Real ROI Numbers
     - Top 5 Real-World Robot Use Cases

3. **Check Localizations:**
   - Open any product/article
   - Click locale dropdown (top right)
   - Verify you see: English, Polski, Deutsch

### Via API:

**Test products endpoint:**
```bash
curl http://localhost:1337/api/products
```

**Test articles endpoint:**
```bash
curl http://localhost:1337/api/articles
```

**Expected response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Neura 4NE-1 Personal Assistant",
        "price_eur": 28500,
        ...
      }
    },
    ...
  ],
  "meta": { "pagination": { "total": 6, ... } }
}
```

---

## 🛠️ Troubleshooting

### Error: "STRAPI_API_TOKEN not set"

**Solution:**
```bash
# Verify token is in .env file
cat strapi-backend/.env

# Should show:
# STRAPI_API_TOKEN=f9a7c8b5d2e1...

# If missing, add it:
echo "STRAPI_API_TOKEN=your_token_here" >> strapi-backend/.env
```

### Error: "Failed to create product: 403 Forbidden"

**Solution:** Token doesn't have sufficient permissions

1. Go to Strapi Admin → Settings → API Tokens
2. Edit your token
3. Change **Token type** to **"Full access"**
4. Save and copy new token
5. Update `.env` file with new token

### Error: "Failed to create product: 400 Bad Request"

**Possible causes:**
- Content-Type schema mismatch
- Required fields missing
- Invalid locale format

**Solution:**
1. Check Strapi logs: `npm run develop` (watch terminal output)
2. Verify Content-Type schemas exist:
   - `strapi-backend/src/api/product/content-types/product/schema.json`
   - `strapi-backend/src/api/article/content-types/article/schema.json`
3. Ensure i18n plugin is enabled for both types

### Error: "ECONNREFUSED localhost:1337"

**Solution:** Strapi server not running

```bash
cd strapi-backend
npm run develop

# Wait for: "Server started on http://localhost:1337"
# Then in new terminal:
npm run seed
```

### Seeding hangs/times out

**Solution:**
1. Check Strapi server logs for errors
2. Verify database connection (Strapi uses SQLite by default)
3. Try seeding one product manually:
   ```bash
   cd strapi-backend/scripts
   node -e "require('./seed-products')"
   ```

---

## 🔄 Re-seeding (Clean Start)

If you want to delete all data and re-seed:

### Option A: Via Strapi Admin UI

1. Content Manager → Product → Select All → Delete
2. Content Manager → Article → Select All → Delete
3. Run: `npm run seed`

### Option B: Reset Database (Nuclear Option)

**⚠️ WARNING: Deletes EVERYTHING including admin user**

```bash
cd strapi-backend

# Backup first!
cp .tmp/data.db .tmp/data.db.backup

# Delete database
rm .tmp/data.db

# Restart Strapi (will recreate empty DB)
npm run develop

# Create new admin user via UI
# Create new API token
# Update .env with new token
# Run seeding again
npm run seed
```

---

## 📊 What Gets Seeded

### Products (6 robots, 18 total entries):

| Product ID | Brand | Price (EUR) | Locales |
|------------|-------|-------------|---------|
| neura-4ne1 | Neura Robotics | 28,500 | EN, PL, DE |
| unitree-h1 | Unitree | 18,900 | EN, PL, DE |
| 1x-neo | 1X Technologies | 22,400 | EN, PL, DE |
| eurobot-guardian | EuroBot Security | 32,900 | EN, PL, DE |
| unitree-g2 | Unitree | 15,900 | EN, PL, DE |
| (more) | ... | ... | ... |

### Articles (3 articles, 9 total entries):

| Article ID | Category | Locales |
|------------|----------|---------|
| ceo-monachium-robot-gdpr | Case Studies | EN, PL, DE |
| roi-robot-vs-opiekunka | ROI Analysis | EN, PL, DE |
| top-5-zastosowan | Use Cases | EN, PL, DE |

---

## 🔐 Security Best Practices

### 1. Never Commit Tokens

`.env` and `.env.local` are already in `.gitignore`. Verify:

```bash
git status
# Should NOT show .env files
```

### 2. Use Different Tokens for Dev/Production

**Development (.env.local):**
```bash
STRAPI_API_TOKEN=dev_token_full_access_12345
```

**Production (.env.production):**
```bash
STRAPI_API_TOKEN=prod_token_read_only_67890
```

### 3. Token Rotation

Rotate API tokens every 90 days:
1. Create new token in Strapi Admin
2. Update `.env` file
3. Delete old token

---

## 📦 NPM Scripts Reference

```bash
# Strapi Backend
cd strapi-backend

npm run develop        # Start Strapi in dev mode (with auto-reload)
npm run start          # Start Strapi in production mode
npm run build          # Build Strapi admin panel

# Seeding
npm run seed           # Seed everything (products + articles)
npm run seed:products  # Seed only products
npm run seed:articles  # Seed only articles

# Validation
npm run validate       # Validate API accessibility
```

---

## 🎯 Next Steps After Seeding

1. **Test Frontend Integration:**
   ```bash
   # In project root
   npm run dev
   # Visit: http://localhost:3000/pl/sklep
   ```

2. **Verify Data Display:**
   - Products page should show 6 robots
   - Blog page should show 3 articles
   - Language switcher should work (PL/EN/DE)

3. **Customize Content:**
   - Edit products in Strapi Admin → Content Manager
   - Upload real product images
   - Add more articles as needed

4. **Production Deployment:**
   - Deploy Strapi to Render.com (see `strapi-backend/README.md`)
   - Update `STRAPI_URL` in production `.env`
   - Re-run seeding on production Strapi instance

---

## 📚 Additional Resources

- **Strapi API Tokens Docs**: https://docs.strapi.io/user-docs/settings/API-tokens
- **Strapi Content API**: https://docs.strapi.io/dev-docs/api/content-api
- **i18n Plugin**: https://docs.strapi.io/user-docs/plugins/strapi-plugins#-internationalization-plugin

---

**Last Updated**: 2025-11-03  
**Version**: 1.0  
**Status**: ✅ Production Ready
