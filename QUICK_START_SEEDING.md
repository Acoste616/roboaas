# 🚀 Quick Start: Automated Strapi Seeding (2 Minutes)

## Step 1: Get Strapi API Token (30 seconds)

1. Start Strapi: `cd strapi-backend && npm run develop`
2. Visit: http://localhost:1337/admin
3. Login
4. **Settings → API Tokens → Create**
   - Type: **Full Access** ⚠️
   - Duration: Unlimited
   - Copy token

## Step 2: Configure (30 seconds)

```bash
# Project root
cp .env.example .env.local

# Edit .env.local and add:
STRAPI_API_TOKEN=paste_your_token_here

# Also add to Strapi:
cd strapi-backend
echo "STRAPI_API_TOKEN=your_token" >> .env
```

## Step 3: Seed (30 seconds)

```bash
cd strapi-backend
npm run seed
```

## Step 4: Verify (30 seconds)

- **Strapi Admin**: http://localhost:1337/admin → Content Manager
- **API**: http://localhost:1337/api/products
- **Frontend**: `npm run dev` → http://localhost:3000/pl/sklep

---

## ✅ What You Get

- **6 humanoid robots** (Neura, Unitree, 1X, EuroBot...)
- **3 strategic articles** (Case studies, ROI, Use cases)
- **3 languages** (EN, PL, DE)
- **27 total entries**

---

## 🛠️ Commands

```bash
npm run seed            # Everything
npm run seed:products   # Products only
npm run seed:articles   # Articles only
```

---

## ❌ Common Issues

**"Token not set"** → Check `.env` files have token  
**"403 Forbidden"** → Token needs "Full Access" permission  
**"Connection refused"** → Start Strapi: `npm run develop`

---

**Full docs**: [SEEDING_SYSTEM_README.md](./SEEDING_SYSTEM_README.md)
