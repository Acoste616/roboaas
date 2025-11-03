# 🌱 Product Seeding Instructions

## Przygotowanie

### Krok 1: Uruchom Strapi Backend

```bash
cd strapi-backend
npm run develop
```

Strapi będzie dostępny pod: `http://localhost:1337/admin`

### Krok 2: Utwórz API Token

1. Zaloguj się do panelu administracyjnego Strapi (`http://localhost:1337/admin`)
2. Przejdź do **Settings** → **API Tokens** (w sekcji Global Settings)
3. Kliknij **Create new API Token**
4. Wypełnij formularz:
   - **Name**: `Product Seeder`
   - **Description**: `Token for seeding products via script`
   - **Token duration**: `Unlimited` (lub ustaw długość życia)
   - **Token type**: `Full access` (lub wybierz Custom i daj dostęp do Products)
5. Kliknij **Save**
6. **SKOPIUJ TOKEN** - zobaczysz go tylko raz!

### Krok 3: Utwórz plik .env

W folderze `strapi-backend` utwórz plik `.env`:

```env
# Strapi API Token for seeding
STRAPI_API_TOKEN=your-copied-token-here
STRAPI_URL=http://localhost:1337
```

Zamień `your-copied-token-here` na skopiowany token z kroku 2.

## Uruchomienie Seedera

### Krok 4: Wykonaj Seeding

```bash
cd strapi-backend
node scripts/seed-products.js
```

### Oczekiwany output:

```
🚀 Starting product seeding...

📦 Creating product: neura-4ne1
✓ Created base product (EN) with ID: 1
✓ Created pl localization for neura-4ne1
✓ Created de localization for neura-4ne1
✅ Product neura-4ne1 completed with all localizations

📦 Creating product: unitree-h1
✓ Created base product (EN) with ID: 2
...

🎉 Seeding completed!

📊 Summary:
   - Total products: 5
   - Languages: 3 (EN, PL, DE)
   - Total entries created: 15
```

## Wykorzystane Obrazy

Skrypt wykorzystuje istniejące obrazy z `public/images/`:

### Produkt 1: Neura 4NE-1
- Main: `neura-robot-ironing.webp`
- Gallery: `neura-robot-ironing.webp`, `4202182c2a0ff23c85ccfee3ad7789927605abba-2480x1460.avif`, `pobrane.webp`

### Produkt 2: Unitree H1
- Main: `unitree-h1-humanoid-robot-release.jpg`
- Gallery: `unitree-h1-humanoid-robot-release.jpg`, `Figure-03-2023-04-770x433.webp`, `Figure-03-humanoid-robots-Figure-AI-07.webp`

### Produkt 3: 1X Neo
- Main: `senior-with-robot-stockcake.jpg`
- Gallery: `senior-with-robot-stockcake.jpg`, `NEO-Gamma_Breakfast.webp`, `00HUMANOID-VIDEO-kitchen-video-cover-square640.jpg`

### Produkt 4: EuroBot Guardian Mk II
- Main: `xvjWEJYrNhg2Jvo97muHic.jpg`
- Gallery: `xvjWEJYrNhg2Jvo97muHic.jpg`, `im-53023344.avif`, `f0327448-humanoid-envato-elements-pic-25325.webp`

### Produkt 5: Unitree G2 Pro
- Main: `1657226851920.webp`
- Gallery: `1657226851920.webp`, `00HUMANOID-VIDEO-kitchen-video-cover-square640.jpg`, `NEO-Gamma_Breakfast.webp`

## Weryfikacja

### Sprawdź w Strapi Admin Panel

1. Przejdź do **Content Manager** → **Product**
2. Powinieneś zobaczyć 5 produktów (każdy z 3 lokalizacjami)
3. Kliknij na produkt i sprawdź zakładkę **Internationalization**

### Sprawdź przez API

```bash
# Wszystkie produkty (EN)
curl http://localhost:1337/api/products?locale=en&populate=*

# Wszystkie produkty (PL)
curl http://localhost:1337/api/products?locale=pl&populate=*

# Jeden produkt po slug
curl http://localhost:1337/api/products?filters[slug][$eq]=neura-4ne1-personal-assistant&locale=en&populate=*
```

## Lista Produktów

1. **Neura 4NE-1 Personal Assistant** - €28,500 (niemiecki flagship, GDPR)
2. **Unitree H1 Advanced Mobility** - €18,900 (mobilność, przystępna cena)
3. **1X Neo Caregiver Edition** - €22,400 (opieka nad seniorami)
4. **EuroBot Guardian Mk II Security Edition** - €32,900 (suwerenność danych EU)
5. **Unitree G2 Pro Entry Assistant** - €15,900 (entry-level dla HNWI)

## Troubleshooting

### Błąd: "STRAPI_API_TOKEN not set"
- Sprawdź czy plik `.env` istnieje w `strapi-backend/`
- Upewnij się, że token jest poprawnie wklejony (bez spacji)

### Błąd: "Failed to create product"
- Sprawdź czy Strapi działa (`npm run develop`)
- Upewnij się, że token ma uprawnienia do tworzenia Products
- Sprawdź logi Strapi w konsoli

### Błąd: Connection refused
- Upewnij się, że `STRAPI_URL` w `.env` jest prawidłowy
- Domyślnie: `http://localhost:1337`

## Dodatkowe Obrazy (Opcjonalnie)

Jeśli chcesz użyć lepszych obrazów AI-generowanych:

### Potrzebne obrazy (3 na produkt = 15 total):

**Neura 4NE-1:**
1. Robot w luksusowym skandynawskim salonie
2. Zbliżenie dłoni trzymającej kieliszek wina
3. Tył robota z certyfikatami CE/GDPR

**Unitree H1:**
1. Robot w dynamicznym ruchu w nowoczesnym mieszkaniu
2. Zbliżenie zaawansowanych przegubów nóg
3. Robot przy panelu smart home z gniazdkiem EU

**1X Neo:**
1. Robot pomagający seniorowi w eleganckim domu
2. Zbliżenie delikatnego chwytu przy organizacji leków
3. Robot w kuchni z certyfikatami bezpieczeństwa

**EuroBot Guardian Mk II:**
1. Robot w luksusowym centrum bezpieczeństwa smart home
2. Panel biometryczny z certyfikatami GDPR
3. Robot w domowym biurze z wieloma znaczkami zgodności EU

**Unitree G2 Pro:**
1. Kompaktowy robot w kuchni nowoczesnego mieszkania
2. Przyjazny interfejs kontroli z opcjami językowymi EU
3. Robot przy biurku z certyfikatem GDPR

### Generowanie w Midjourney/DALL-E:

Użyj promptów z komentarzy w `seed-products.js` (sekcja `IMAGE_MAPPING`)
