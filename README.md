# EuroBot Hub - MVP Week 2 Deliverable

## Project Overview
EuroBot Hub is a European B2C affiliate platform for humanoid robots, focusing on trust, GDPR compliance, and expert guidance.

**Strategy: Path B (Report > Quiz)**
- Primary Lead Magnet: Expert Report Download Form
- Secondary Lead Magnet: Audit Request Form (Week 3)

## Week 2 Completion Status ✅

### Stack Technologiczny
- ✅ Next.js 15 (App Router)
- ✅ React 18
- ✅ TypeScript
- ✅ Tailwind CSS 3.4
- ✅ next-intl (i18n dla pl/en/de)
- ✅ Framer Motion (animacje)
- ✅ React Hook Form + Zod (formularze)

### Zaimplementowane Komponenty

#### Core Components
- ✅ `Header.tsx` - Sticky navigation z dark mode, responsive menu
- ✅ `Footer.tsx` - Stopka z transparentnością afiliacyjną, social media
- ✅ `ReportDownloadForm.tsx` - Formularz pobrania raportu (React Hook Form + Zod)
- ✅ `JakDzialamyGrafika.tsx` - 3-krokowa infografika procesu
- ✅ `ScaleVisualization.tsx` - Placeholder porównania rozmiaru robot vs człowiek

#### Strony
- ✅ `app/[locale]/page.tsx` - Strona główna (Hero, Jak Działamy, Lead Magnet, Testimonials)
- ✅ `app/[locale]/sklep/page.tsx` - Placeholder (Week 3)
- ✅ `app/[locale]/blog/page.tsx` - Placeholder (Week 4)
- ✅ `app/[locale]/o-nas/page.tsx` - Placeholder (Week 4)
- ✅ `app/[locale]/kontakt/page.tsx` - Placeholder (Week 4)
- ✅ `app/[locale]/polityka-prywatnosci/page.tsx` - Placeholder (Week 4)
- ✅ `app/[locale]/regulamin/page.tsx` - Placeholder (Week 4)

### i18n Implementation
- ✅ Middleware dla routingu językowego (`/pl`, `/en`, `/de`)
- ✅ Pliki tłumaczeń (`messages/pl.json`, `en.json`, `de.json`)
- ✅ Default locale: Polski (pl)

### Design System
- ✅ Dark mode default (#0A0F1E primary, #00FF88 accent)
- ✅ Futurystyczny minimalizm
- ✅ Komponenty utility: `.btn-primary`, `.btn-secondary`, `.card`, `.glow-text`, `.glow-box`
- ✅ Responsywny design (mobile-first)

### Utilities (Prepared for Week 3)
- ✅ `utils/supabase.ts` - Mock client (do implementacji z credentials)
- ✅ `utils/strapi.ts` - Mock API client (do podpięcia Strapi)
- ✅ `utils/email.ts` - Mock email sender (do implementacji Resend)

## Uruchomienie Projektu

### Instalacja
```bash
cd c:\Users\barto\OneDrive\Pulpit\robohub
npm install
```

### Development Server
```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

### Build Production
```bash
npm run build
npm start
```

## Struktura Projektu

```
robohub/
├── app/
│   ├── [locale]/           # Routing z i18n
│   │   ├── layout.tsx      # Layout z Header/Footer
│   │   ├── page.tsx        # Strona główna
│   │   ├── sklep/          # Placeholder
│   │   ├── blog/           # Placeholder
│   │   ├── o-nas/          # Placeholder
│   │   ├── kontakt/        # Placeholder
│   │   └── polityka-prywatnosci/ # Placeholder
│   ├── globals.css         # Global styles (dark mode)
│   └── layout.tsx          # Root layout
├── components/
│   ├── Header.tsx          # Navigation
│   ├── Footer.tsx          # Footer z transparentnością
│   ├── ReportDownloadForm.tsx  # Główny lead magnet
│   ├── JakDzialamyGrafika.tsx  # Infografika procesu
│   └── ScaleVisualization.tsx  # Porównanie rozmiaru
├── messages/               # i18n translations
│   ├── pl.json
│   ├── en.json
│   └── de.json
├── utils/
│   ├── supabase.ts        # DB client (mock)
│   ├── strapi.ts          # CMS client (mock)
│   └── email.ts           # Email client (mock)
├── i18n.ts                # i18n config
├── middleware.ts          # Routing middleware
└── datatobuild/           # Dokumentacja projektu
```

## Kluczowe Features Strony Głównej

### Hero Section
- Full-screen hero z gradient overlay
- H1: "Roboty w Domu. Zaufanie Przede Wszystkim."
- CTA: "Pobierz Raport" (scroll do formularza)

### Jak Działamy Section
- 3 kroki: Pobierz Wiedzę → Porównaj → Połącz
- Ikony SVG z animacją hover

### Trust Signals
- 100% Zgodność z GDPR
- 24/7 Wsparcie Eksperckie
- 3+ Partnerów Producentów

### Report Download Form
- Pola: Imię (opcjonalne), Email (wymagane), source_form (ukryte)
- Walidacja: React Hook Form + Zod
- Submit handler: `console.log` (API w Week 3)
- Success message po wysłaniu

### Product Teaser
- 3 karty produktów (Tesla Optimus, Neura 4NE-1, Unitree H1)
- Placeholdery graficzne
- CTA "Zobacz Więcej"

### Testimonials
- 2 opinie klientów z avatarami
- Dr. M. Kowalski (Warszawa)
- Anna Schmidt (Berlin)

## Week 3 Tasks (Following Roadmap)

1. **API Implementation**
   - `/api/leads` endpoint (POST)
   - Supabase integration (zapisywanie leadów)
   - Resend integration (wysyłka PDF)

2. **Strona Katalog**
   - Grid produktów
   - Filtry (Cena, Producent)
   - Porównanie modal

3. **Strona Produktu**
   - Gallery images
   - `<ScaleVisualization>` (działający suwak)
   - `<SmartHomeMatrixTable>`
   - `<AuditRequestForm>`

4. **Blog Setup**
   - Integracja ze Strapi
   - Pierwszych 3 artykuły (case studies)

## Design Guidelines

### Colors
- Primary: `#0A0F1E` (deep blue dark)
- Accent: `#00FF88` (neon green)
- Neutral Light: `#F8FAFC`
- Neutral Gray: `#94A3B8`

### Typography
- Font: Inter (Google Fonts)
- H1: 4xl-7xl, bold
- Body: 1rem, regular

### Interactions
- Button hover: scale(1.05) + glow
- Card hover: border accent + glow-box
- Smooth transitions: 200ms

## Testing Checklist

- ✅ Strona ładuje się w 3 językach (pl/en/de)
- ✅ Responsywny design (mobile/tablet/desktop)
- ✅ Dark mode domyślnie włączony
- ✅ Menu mobilne rozwija się poprawnie
- ✅ Formularz waliduje poprawnie email
- ✅ Formularz wyświetla success message po submit
- ✅ Wszystkie linki w Footer działają
- ✅ Placeholder strony są dostępne

## Known Issues / TODO

- [ ] Brak rzeczywistego API endpoint dla formularza (Week 3)
- [ ] Placeholdery obrazów zamiast rzeczywistych zdjęć robotów
- [ ] Brak integracji z Supabase (Week 3)
- [ ] Brak integracji z Resend (Week 3)
- [ ] `ScaleVisualization` wymaga prawdziwych obrazów robot.png i human.png
- [ ] Strony Blog, Sklep, O Nas, Kontakt to placeholdery (Week 3-4)

## Contact & Support

**Project Manager:** Robohub (kierownik techniczny)  
**Developer:** Qoder.ai  
**Deadline Week 3:** Zbudować API i Strony Produktu

---

**Status:** ✅ Week 2 Complete - Ready for Code Review
