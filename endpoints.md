# EuroBot Hub - API Endpoints & Routes Documentation

## Frontend Routes (Pages)

### Home Page
- **URL Pattern**: `/{locale}`
- **Example**: `/pl`, `/en`, `/de`
- **File**: `app/[locale]/page.tsx`
- **Description**: Main landing page with hero section, report download form, product teasers, and testimonials
- **Features**:
  - Hero section with background image
  - "Jak Działamy" process visualization
  - Trust signals (GDPR, Support, Partners)
  - Report download form (leads to `/api/leads`)
  - 3 featured product cards linking to product detail pages
  - Testimonials section

### Shop Catalog Page
- **URL Pattern**: `/{locale}/sklep`
- **Example**: `/pl/sklep`, `/en/sklep`, `/de/sklep`
- **File**: `app/[locale]/sklep/page.tsx`
- **Type**: Client-side rendered (CSR)
- **Description**: Full product catalog with filtering and sorting
- **Features**:
  - Responsive grid layout (3/2/1 columns)
  - Sidebar with filters:
    - Price range slider (€20,000 - €140,000)
    - Brand checkboxes (Tesla, Neura, Unitree, 1X, Figure AI, SoftBank)
  - Sort options: Name (A-Z), Price (ascending/descending)
  - View mode toggle: Grid/List
  - Product comparison (up to 3 products)
  - Mobile-responsive sidebar with slide-out panel

### Product Detail Page
- **URL Pattern**: `/{locale}/sklep/{slug}`
- **Example**: `/pl/sklep/tesla-optimus-gen-3`, `/pl/sklep/figure-02`
- **File**: `app/[locale]/sklep/[slug]/page.tsx`
- **Type**: Static Site Generation (SSG)
- **Description**: Individual product page with full details and interactive components
- **Features**:
  - Product gallery with thumbnails and fullscreen lightbox
  - Complete product information (name, brand, price, description)
  - Trust badges (CE Mark, GDPR, 2-year warranty)
  - Technical specifications table
  - Rich text description with HTML rendering
  - **Interactive Components**:
    - `ScaleVisualization`: Height comparison slider (140-210cm)
    - `SmartHomeMatrixTable`: Smart home compatibility matrix
    - `LegalComplianceInfo`: EU AI Act status, GDPR, CE certifications
    - `AuditRequestForm`: Lead capture form with React Hook Form + Zod validation
- **Available Product Slugs**:
  - `tesla-optimus-gen-3`
  - `neura-4ne-1`
  - `unitree-h1`
  - `1x-neo`
  - `figure-02`
  - `softbank-pepper`

### Blog Listing Page
- **URL Pattern**: `/{locale}/blog`
- **Example**: `/pl/blog`, `/en/blog`, `/de/blog`
- **File**: `app/[locale]/blog/page.tsx`
- **Type**: Server-side rendering (SSR)
- **Description**: Blog listing page with article cards
- **Features**:
  - 2-column responsive grid layout
  - ArticleCard component with featured images
  - Article categories: Case Studies, ROI Analysis, Use Cases
  - Server-side data fetching from Strapi mock
  - Navigation to individual article pages

### Blog Article Detail Page
- **URL Pattern**: `/{locale}/blog/{slug}`
- **Example**: `/pl/blog/ceo-monachium-robot-gdpr`, `/pl/blog/roi-robot-vs-opiekunka-polska`
- **File**: `app/[locale]/blog/[slug]/page.tsx`
- **Type**: Static Site Generation (SSG)
- **Description**: Individual blog article page with full content
- **Features**:
  - Breadcrumb navigation
  - Enhanced prose styling for rich text content
  - Reading time estimate (5 min)
  - Social share buttons (LinkedIn, Twitter)
  - Related articles section
  - CTA to download report
  - **Available Article Slugs**:
    - `ceo-monachium-robot-gdpr` - Case Study: CEO from Munich
    - `roi-robot-vs-opiekunka-polska` - ROI Analysis: Robot vs Caregiver
    - `top-5-zastosowan-robotow-domowych` - Top 5 Robot Use Cases

### About Us Page
- **URL Pattern**: `/{locale}/o-nas`
- **Example**: `/pl/o-nas`
- **File**: `app/[locale]/o-nas/page.tsx`
- **Type**: Client-side rendered (CSR)
- **Description**: Company information and team page
- **Features**:
  - Mission statement section
  - Animated timeline with scroll-triggered effects (react-intersection-observer)
  - Timeline milestones: Q4 2025 → Q3-Q4 2026
  - Team section (Robohub - Technical Lead, Expert Team)
  - Company values (Security, Quality, Education)
  - Trust signals and transparency messaging

### Contact Page
- **URL Pattern**: `/{locale}/kontakt`
- **Example**: `/pl/kontakt`
- **File**: `app/[locale]/kontakt/page.tsx`
- **Type**: Client-side rendered (CSR)
- **Description**: Contact form and company information
- **Features**:
  - Contact information (email, location, hours)
  - Social media links (LinkedIn, Twitter, YouTube)
  - Google Maps embed (Warsaw location)
  - Contact form with React Hook Form + Zod validation
  - Form fields: first_name, email, message
  - Form submission to `/api/leads` endpoint
  - Success/error state handling

### Premium Club Page
- **URL Pattern**: `/{locale}/club`
- **Example**: `/pl/club`, `/en/club`, `/de/club`
- **File**: `app/[locale]/club/page.tsx`
- **Type**: Client-side rendered (CSR)
- **Description**: Premium Club subscription paywall with Stripe integration
- **Features**:
  - Premium Club benefits list (5 key features)
  - Pricing display: 5 EUR/month recurring subscription
  - "Subscribe Now" button with loading state
  - Framer Motion animations for smooth UX
  - Multi-language support (pl/en/de)
  - Mock mode support for development
  - Stripe Checkout integration
  - Success/cancel redirect handling
- **Benefits Listed**:
  - Live Q&A with cybersecurity experts
  - Exclusive reports and market analysis
  - Access to private Discord channels
  - Early access to product reviews
  - Priority community support
- **Flow**:
  1. User clicks "Subscribe Now" button
  2. Frontend calls `/api/create-checkout` with locale
  3. Redirects to Stripe Checkout or mock success page
  4. After payment, redirects to `/{locale}/club?success=true`
  5. Webhook handles subscription activation

---

## API Endpoints

### Lead Capture Endpoint
- **URL**: `/api/leads`
- **Method**: `POST`
- **File**: `app/api/leads/route.ts`
- **Description**: Captures leads from various forms across the site
- **Content-Type**: `application/json`

**Request Body Schema**:
```json
{
  "email": "string (required, email format)",
  "first_name": "string (optional)",
  "country": "string (optional)",
  "use_case": "string (optional)",
  "budget_range": "string (optional)",
  "timeline": "string (optional)",
  "message": "string (optional)",
  "source_form": "enum (required): 'report_download_gdpr' | 'audit_request' | 'contact_form'"
}
```

**Source Form Values**:
- `report_download_gdpr` - From report download form on homepage
- `audit_request` - From audit request form on product detail pages
- `contact_form` - From contact page form

**Response Codes**:
- `201 Created` - Lead successfully captured
- `400 Bad Request` - Invalid data (Zod validation failed)
- `500 Internal Server Error` - Server error

**Success Response**:
```json
{
  "success": true,
  "message": "Lead captured successfully"
}
```

**Error Response**:
```json
{
  "error": "Invalid data",
  "details": [/* Zod validation errors */]
}
```

**Actions Performed**:
1. Validates request data with Zod schema
2. Saves lead to Supabase `leads` table
3. Sends admin notification email with source tracking
4. Sends user confirmation email based on `source_form`:
   - `report_download_gdpr` → Report download email with PDF link
   - `audit_request` → Audit confirmation email with next steps
   - `contact_form` → Contact confirmation email with resources

**Development Mode**:
- Uses mock Supabase client (logs to console)
- Uses mock email service (logs to console)
- All functionality works without external services

### Stripe Checkout Session Creation
- **URL**: `/api/create-checkout`
- **Method**: `POST`
- **File**: `app/api/create-checkout/route.ts`
- **Description**: Creates Stripe Checkout session for Premium Club subscription
- **Content-Type**: `application/json`

**Request Body Schema**:
```json
{
  "locale": "string (required): 'pl' | 'en' | 'de'"
}
```

**Response Codes**:
- `200 OK` - Checkout session created successfully
- `500 Internal Server Error` - Failed to create session

**Success Response**:
```json
{
  "url": "string (Stripe Checkout URL or mock redirect)"
}
```

**Mock Mode Response** (when `STRIPE_SECRET_KEY` not set):
```json
{
  "url": "/{locale}/club?mock=success",
  "message": "MOCK MODE: Stripe not configured. Add STRIPE_SECRET_KEY to .env.local"
}
```

**Production Behavior**:
1. Validates locale from request body
2. Creates Stripe Checkout session with:
   - Product: "EuroBot Hub Premium Club"
   - Price: 5 EUR/month (500 cents)
   - Mode: subscription (recurring)
   - Payment methods: card
3. Sets success URL: `/{locale}/club?success=true`
4. Sets cancel URL: `/{locale}/club?canceled=true`
5. Returns Stripe Checkout URL for redirect

**Environment Variables Required**:
- `STRIPE_SECRET_KEY` - Stripe API secret key

### Stripe Webhook Handler
- **URL**: `/api/stripe-webhook`
- **Method**: `POST`
- **File**: `app/api/stripe-webhook/route.ts`
- **Description**: Handles Stripe webhook events for subscription lifecycle
- **Content-Type**: `application/json`

**Webhook Events Handled**:
- `checkout.session.completed` - Subscription activated
- `customer.subscription.deleted` - Subscription cancelled

**Security**:
- Verifies webhook signature using `STRIPE_WEBHOOK_SECRET`
- Rejects requests with invalid signatures

**Response Codes**:
- `200 OK` - Event processed successfully
- `400 Bad Request` - Missing signature or verification failed
- `500 Internal Server Error` - Processing error

**Actions on `checkout.session.completed`**:
1. Extracts customer data (email, customer_id, subscription_id)
2. Saves subscription to Supabase `club_members` table:
   ```sql
   INSERT INTO club_members (
     email,
     stripe_customer_id,
     stripe_subscription_id,
     status,
     locale,
     subscribed_at
   )
   ```
3. Sends Discord webhook notification with:
   - Customer email
   - Subscription ID
   - Locale
   - Instructions to assign Premium role
4. (TODO) Sends welcome email with Discord invite link

**Actions on `customer.subscription.deleted`**:
1. Updates subscription status in Supabase:
   ```sql
   UPDATE club_members
   SET status = 'cancelled', cancelled_at = NOW()
   WHERE stripe_subscription_id = '{subscription_id}'
   ```

**Environment Variables Required**:
- `STRIPE_SECRET_KEY` - Stripe API secret key
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret
- `DISCORD_WEBHOOK_URL` - Discord webhook for notifications
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

**Database Schema** (`club_members` table):
```sql
CREATE TABLE club_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'active',
  locale TEXT DEFAULT 'pl',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Static Assets

### Images Directory
- **Path**: `/public/images/`
- **Description**: Product images and background photos
- **Files**:
  - `xvjWEJYrNhg2Jvo97muHic.jpg` - Tesla Optimus Gen 3
  - `f0327448-humanoid-envato-elements-pic-25325.webp` - Neura 4NE-1
  - `4202182c2a0ff23c85ccfee3ad7789927605abba-2480x1460.avif` - Unitree H1
  - `NEO-Gamma_Breakfast.webp` - 1X Neo
  - `Figure-03-humanoid-robots-Figure-AI-07.webp` - Figure 02
  - `senior-with-robot-stockcake.jpg` - SoftBank Pepper
  - Additional gallery images: `pobrane.webp`, `1657226851920.webp`, etc.

### PDF Directory
- **Path**: `/public/pdf/`
- **Description**: Expert reports for download
- **Status**: Empty (PDFs to be added)

---

## Internationalization (i18n)

### Supported Locales
- `pl` - Polish (default)
- `en` - English
- `de` - German

### Locale Parameter
All page routes include `{locale}` parameter that must be one of the supported locales.

**Translation Files**:
- `messages/pl.json`
- `messages/en.json` (if exists)
- `messages/de.json` (if exists)

---

## Reusable Components

### Form Components
- **ReportDownloadForm** (`components/ReportDownloadForm.tsx`)
  - Used on: Homepage
  - Fields: first_name (optional), email
  - Submits to: `/api/leads` with `source_form: 'report_download_gdpr'`

- **AuditRequestForm** (`components/AuditRequestForm.tsx`)
  - Used on: Product detail pages
  - Fields: first_name, email, country, use_case, budget_range, timeline
  - Submits to: `/api/leads` with `source_form: 'audit_request'`

### Display Components
- **ArticleCard** (`components/ArticleCard.tsx`)
  - Used on: Blog listing page
  - Props: title, slug, description_short, featured_image, category, publishedAt, locale
  - Features: Featured image, category badge, read more link

- **ProductCard** (`components/ProductCard.tsx`)
  - Used on: Shop catalog, homepage
  - Props: Product data from Strapi
  - Features: Image, price, specs, view details link

- **ScaleVisualization** (`components/ScaleVisualization.tsx`)
  - Used on: Product detail pages
  - Features: Interactive height comparison slider

- **SmartHomeMatrixTable** (`components/SmartHomeMatrixTable.tsx`)
  - Used on: Product detail pages
  - Features: Smart home compatibility matrix

- **LegalComplianceInfo** (`components/LegalComplianceInfo.tsx`)
  - Used on: Product detail pages
  - Features: EU AI Act, GDPR, CE Mark status

### Layout Components
- **Header** (`components/Header.tsx`)
  - Features: Logo, navigation menu (Home, Shop, Blog, About, Contact, Premium Club)
  - Locale-aware navigation links
  - Mobile responsive with hamburger menu

- **Footer** (`components/Footer.tsx`)
  - Features: Links, social media, affiliate transparency text

- **Sidebar** (`components/Sidebar.tsx`)
  - Used on: Shop catalog
  - Features: Filters, price range, brand selection

- **TimelineItem** (`components/TimelineItem.tsx`)
  - Used on: About Us page
  - Features: Scroll-triggered animation with react-intersection-observer
  - Props: date, title, description, index, isLast

---

## Email Templates

### Email Service
- **File**: `utils/email.ts`
- **Service**: Resend API
- **Functions**:
  - `sendReportEmail(email, firstName)` - Sends expert report PDF
  - `sendAuditConfirmation(email, firstName)` - Sends audit request confirmation
  - `sendContactConfirmation(email, firstName)` - Sends contact form confirmation
  - `sendAdminNotification(leadData)` - Notifies admin of new lead with source info

---

## Development Dependencies

### Key Packages
- `next` v15 - React framework
- `react` v18 - UI library
- `tailwindcss` v3.4 - CSS framework
- `next-intl` v3.24 - Internationalization
- `react-hook-form` v7.54 - Form management
- `zod` v3.24 - Schema validation
- `framer-motion` v11.15 - Animations
- `react-intersection-observer` v10.0 - Scroll-triggered animations
- `@supabase/supabase-js` v2.39 - Database client
- `stripe` v14.10 - Payment processing

---

## Data Sources

### Mock Strapi API
- **File**: `utils/strapi.ts`
- **Functions**:
  - `fetchProducts()` - Returns all 6 products with full data
  - `fetchArticles()` - Returns 3 blog articles with strategic content

**Article Data Structure**:
```typescript
{
  id: number,
  attributes: {
    title: string,
    slug: string,
    description_short: string,
    featured_image: string,
    content: string, // HTML content with case studies
    publishedAt: string, // ISO date
    category: 'Case Studies' | 'ROI Analysis' | 'Use Cases'
  }
}
```

**Product Data Structure**:
```typescript
{
  id: number,
  attributes: {
    name: string,
    slug: string,
    description_short: string,
    description_full: string, // HTML content
    price_eur: number,
    brand: string,
    image: string,
    gallery: string[],
    robot_height_cm: number,
    specs_table: {
      dof: number,
      battery_kwh: number,
      payload_kg: number,
      speed_ms: number
    },
    smart_home_matrix: {
      alexa: 'full' | 'partial' | 'none',
      google_home: 'full' | 'partial' | 'none',
      homekit: 'full' | 'partial' | 'none'
    },
    legal_compliance: {
      ai_act_status: string,
      gdpr_compliant: boolean,
      ce_mark: boolean
    }
  }
}
```

---

## Development Server

- **URL**: `http://localhost:3000`
- **Command**: `npm run dev`
- **Hot Reload**: Enabled
- **Environment**: Development mode with mock services
- **Note**: If port 3000 is occupied, Next.js automatically falls back to 3002, 3003, etc.

---

## Environment Variables

### Required for Production
```env
# Stripe Integration
STRIPE_SECRET_KEY=sk_live_... # Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_... # Webhook signing secret

# Discord Integration
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/... # For Premium role notifications

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG... # Anon public key

# Email Service (Resend)
RESEND_API_KEY=re_... # For sending emails
```

### Development Mode
- All services work in mock mode without environment variables
- Mock Supabase logs to console instead of saving to database
- Mock Stripe redirects to `/{locale}/club?mock=success`
- Mock email service logs to console

---

## Implemented Features

### ✅ Completed
- [x] Multi-language support (pl/en/de)
- [x] Report download lead capture
- [x] Audit request lead capture
- [x] Contact form lead capture
- [x] Product catalog with filtering
- [x] Product detail pages with interactive components
- [x] Blog with case studies and ROI analysis
- [x] About Us page with team info
- [x] **Premium Club subscription page**
- [x] **Stripe Checkout integration**
- [x] **Stripe webhook handler**
- [x] **Discord webhook notifications**
- [x] **Supabase club_members table integration**

### 🚧 In Progress / Future
- [ ] Privacy Policy page (`/{locale}/polityka-prywatnosci`)
- [ ] Terms of Service page (`/{locale}/regulamin`)
- [ ] Newsletter subscription endpoint
- [ ] Partner affiliate tracking
- [ ] Welcome email for Premium Club members
- [ ] Discord bot for automatic role assignment
- [ ] Member portal/dashboard for Premium Club
- [ ] Subscription management (cancel/update)
- [ ] Multiple subscription tiers

---

## Testing

### Manual Testing Checklist

#### Premium Club Flow
- [x] Page loads correctly in all locales (pl/en/de)
- [x] All benefits display correctly
- [x] Pricing shows 5 EUR/month
- [x] Subscribe button works
- [x] Mock mode redirects to `/{locale}/club?mock=success`
- [x] Animations work smoothly
- [x] Mobile responsive design
- [x] Navigation includes Premium Club link

#### Stripe Integration (Production)
- [ ] Checkout session creates successfully
- [ ] Redirects to Stripe Checkout page
- [ ] Test payment completes (card: 4242 4242 4242 4242)
- [ ] Webhook receives `checkout.session.completed` event
- [ ] Subscription saved to Supabase
- [ ] Discord notification sent
- [ ] User redirected to success page

#### Webhook Events
- [ ] Signature verification works
- [ ] Subscription data saved correctly
- [ ] Discord webhook fires
- [ ] Cancellation updates database status

### Stripe Test Cards
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184

Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

---

## Documentation Files

- **CLUB_SETUP.md** - Complete setup guide for Premium Club Stripe integration
  - Stripe account setup
  - Webhook configuration
  - Discord integration
  - Database schema
  - Testing instructions
  - Troubleshooting guide

- **endpoints.md** (this file) - API and route documentation

---

## Notes

### Locale Handling
- All frontend routes must include `{locale}` parameter
- Middleware handles locale detection and routing
- Default locale: `pl` (Polish)
- API redirects must preserve locale prefix

### Stripe API Version
- Current version: `2025-10-29.clover`
- Do not use `2024-12-18.acacia` (causes TypeScript errors)

### Database Tables

**leads** table:
- Stores all lead captures (report downloads, audit requests, contact forms)
- Tracks `source_form` for analytics
- Indexed on email and created_at

**club_members** table:
- Stores Premium Club subscriptions
- Links to Stripe customer and subscription IDs
- Tracks status (active/cancelled)
- Stores locale for personalization

### Security Best Practices
- All environment variables in `.env.local` (gitignored)
- Stripe webhook signature verification required
- Database operations use parameterized queries
- HTTPS required in production for Stripe webhooks
- No sensitive data in frontend code

---

*Last Updated: 2025-11-02*
*Version: 1.1 (Premium Club implemented)*
