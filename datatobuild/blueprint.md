blueprint.md (Wersja zaktualizowana pod Ścieżkę B)
Sekcja 1: Brief Biznesowy – Wizja, Cele i Monetyzacja (Dlaczego i Co Osiągniemy) Uzasadnienie: Zmieniono główny "hook" z quizu na autorytatywny content (Raport Ekspercki), co jest zgodne z wnioskami z quizvalidation.md dla klientów HNWI. Zwiększa to postrzegane zaufanie i ekspertyzę.

Wizja: EuroBot Hub to EU-first hub sprzedażowy dla zamożnych klientów B2C (35-65 lat, >100k EUR/rok), agregujący oferty producentów (Neura, Unitree) via afiliacja. Nie konkurujemy – generujemy kwalifikowane leady (email/audyt), budujemy zaufanie (autorytatywne raporty, interaktywne porównania skali) i community (Discord Club). To niskie ryzyko: zero inwentarza, recurring prowizje 10-25%. Cele Szczegółowe:

Biznesowe: Rok 1: 150k EUR revenue (50 leadów/mies. po 3k EUR prowizji średnio); 3 umowy afiliacyjne (walidowane Fazą 0); 500 members Discord (retencja 30%). Krytyczna metryka: Lead-to-Sale % (10% leadów konwertuje na sprzedaż).

Użytkownika: Rozwiązać bóle: "Gdzie kupić bezpiecznego robota, jak chronić dane (GDPR) i kto mi pomoże?" – via edukacja (Raport Ekspercki, blog), personalizacja (Audyt Bezpieczeństwa) i interaktywne wizualizacje (suwak wzrostu vs robot).

Producenta: "Oferujemy pozbawiony ryzyka, zlokalizowany (PL/DE) marketing i edukację przedsprzedażową. Redukujemy Państwa koszt pozyskania klienta (CAC) poprzez dostarczanie wstępnie ogrzanych, zamożnych leadów, zaniepokojonych bezpieczeństwem i gotowych do rozmowy o zakupie." Monetyzacja (Jak Wyciągamy Pieniądze):

Główna: Afiliacja (10-25% od sprzedaży/leads, track via Refersion).

Hybrydowa: Discord Premium Club (5 EUR/mies.: #qna-live z ekspertem cyberbezpieczeństwa, ekskluzywne raporty).

Upsell: Płatne "Audyty Bezpieczeństwa" (Upsell z darmowego raportu). Metryki: Konwersja 5% wizyt → lead (pobranie raportu); Lead-to-Sale % 10%; LTV 5k EUR/klient. Kluczowe Założenia z Researchu (Walidowane): Bariera #1 to Prywatność i Zaufanie (Painpoints.md, quizvalidation.md) – rozwiązanie: Raport Ekspercki "GDPR & Robot Security 2026".

Sekcja 2: Design & UX System – Wygląd, Trendy i User Flow (Jak Ma Wyglądać i Czuć Się) Uzasadnienie: Usunięto "Quiz" z User Flow i Wireframe. Zastąpiono go formularzem pobierania raportu, który jest mniej "zabawowy", a bardziej "transakcyjny" (wymiana e-maila za wysoką wartość), co buduje zaufanie HNWI.

Kolorystyka i Typografia:

Kolory: Primary: #0A0F1E (deep blue dark mode); Akcent: #00FF88 (neon green CTA); Neutral: #F8FAFC (light text); Error: #EF4444. Dark mode default.

Typografia: H1: Inter Bold 3xl (sci-fi bold); Body: Inter Regular 1rem; Linie: 1.5 spacing.

Ikony: Heroicons SVG (animowane hover: scale 1.1). UX Zasady i Flow:

Mobile-First: Breakpoints: sm (640px: stack), md (768px: grid 2-col), lg (1024px: full grid).

Micro-Interactions: Framer Motion – button hover: Glow + scale; Load: Shimmer skeletons.

User Flow Szczegółowy (Zmieniony):

Landing (Home): 10s video → Główne CTA "Pobierz Raport Bezpieczeństwa 2026".

Lead Capture: Klik → Modal/Sekcja z formularzem (Email, Imię) → Submit.

Dostarczenie Wartości: Strona "Dziękujemy" + Email z PDF.

Eksploracja: Przeglądanie katalogu / Bloga (Case Studies).

Decyzja: Strona produktu → CTA "Zamów Spersonalizowany Audyt" (formularz leada).

Retencja: Post-lead email: "Dołącz do Clubu" + Discord invite.

Dostępność: WCAG 2.1 (alt texts, keyboard nav). Trust Signals (Priorytet #1 – Wbudowane w Każdy Element):

Grafika "Jak Działamy" (Na Home): 3-etapowa infografika SVG: 1. "Pobierz Wiedzę" (ikona raportu) – "Zrozum ryzyka GDPR i AI Act". 2. "Porównaj" (skala icon) – "Wizualizuj i analizuj dane". 3. "Połącz" (handshake icon) – "Bezpiecznie z producentem".

Transparentność Afiliacyjna (W Stopce): Tekst: "EuroBot Hub działa jako partner... Możemy otrzymać prowizję...".

Testimonials (Na Home): 2 karty: "Ten raport o GDPR był dokładnie tym, czego potrzebowałem, aby zrozumieć ryzyko." – Dr. M. Kowalski, Inwestor Tech.

Wireframe Przykładowy (Tekstowy dla Home – Zmieniony):

Plaintext

[Header Fixed: Logo (neon green) | Menu (Home/Sklep/Blog/O Nas/Kontakt) | Szukarka Input | Dark Toggle Icon]
[Hero Full-VH: Video BG (loop demo Neura) | Overlay H1 "Roboty w Domu. Zaufanie Przede Wszystkim." | Sub "Pobierz nasz Raport Ekspercki: Bezpieczeństwo i GDPR 2026" | CTA Button Neon Green "Pobierz Raport" (Hover Glow)]
[Sekcja 1 Grid 3-Col: Karta 1 "Dlaczego EU Hub?" (Grafika "Jak Działamy" SVG 3-etapowa) | Karta 2 "Bezpieczeństwo GDPR" | Karta 3 "Porównania Rozmiaru"]
[Sekcja 2 (Lead Magnet): H2 "Zrozum Zanim Kupisz" | Okładka Raportu (mockup) | Formularz (Imię, Email) | Button "Pobierz PDF Teraz"]
[Sekcja 3 Carousel: 3 Produkty Teaser (obraz + Cena + Button "Zobacz")]
[Sekcja 4 Testimonials: 2 Karty (Cytat + Imię + Foto Avatar)]
[Footer Dark: Menu Links | Social Icons | Transparentność Afiliacyjna Tekst]
Metryki UX: Bounce <25%; Time on Page >2 min; Konwersja na pobranie raportu >5%.

Sekcja 3: Struktura Strony – Szczegółowe Podstrony z Funkcjami i Mechanizmami Uzasadnienie: Zmieniono funkcjonalność strony Home, aby skupiała się na pobieraniu raportu. Usunięto quiz. Strona Produktu otrzymuje mocniejsze CTA "Audyt", jako kolejny krok w lejku po raporcie.

Architektura Wielojęzyczności (i18n):

Struktura Folderów: app/[locale]/...

Middleware: middleware.js (wykrywanie języka, redirect).

Pliki Tłumaczeń: messages/pl.json, de.json, en.json. Strategia Treści MVP dla Bloga (Krytyczne dla Zaufania):

Celuj w strachy (z Painpoints.md):

Case Study: "Jak CEO z Monachium używa robota humanoidalnego (i chroni swoje dane)".

Analiza ROI: "Ile kosztuje robot vs pomoc domowa w Niemczech? Realne liczby 2026."

Wyjaśnienie Technologii: "AI Act vs Roboty Domowe: Co musisz wiedzieć przed zakupem." Szczegółowe Podstrony:

Home (/[locale]) – Cel: Zdobycie Leada (Raport).

Wireframe: Jak w Sekcji 2.

Funkcje: Formularz pobrania raportu (Lead Magnet Form). Newsletter (Mailchimp).

Działanie: Submit → Track + email z PDF.

Metryki: 5% konwersji na lead.

Katalog (/[locale]/sklep) – Cel: Eksploracja.

Funkcje: Filtry dynamiczne. Porównanie modal.

Działanie: API filter; Click → Detail.

Produkt Detail (/[locale]/sklep/[slug]) – Cel: Kwalifikacja Leada (Audyt).

Funkcje: Kalkulator rat. Interaktywna Wizualizacja (Suwak Wzrostu). Główne CTA: Formularz "Zamów spersonalizowany audyt bezpieczeństwa".

Wizualizacja (Snippet):

JavaScript

const [height, setHeight] = useState(180);
return (
  <div className="relative">
    <img src="/robot.png" alt="Robot" style={{ height: '200px' }} /> 
    <img src="/human.png" alt="Człowiek" style={{ transform: `scale(${height / 180})`, height: '180px' }} />
    <input type="range" min="150" max="200" value={height} onChange={(e) => setHeight(e.target.value)} />
  </div>
);
Metryki: 10% kliknięć w "Audyt"; >3 min on page.

Blog (/[locale]/blog) – Cel: SEO i Budowanie Autorytetu.

Funkcje: Szukarka. Affiliate inline.

Działanie: Celuj w 3 tematy (strachy, case studies, ROI).

O Nas (/[locale]/o-nas) – Cel: Zaufanie.

Funkcje: Timeline anim. Partner form.

Kontakt (/[locale]/kontakt) – Cel: Leady.

Funkcje: Progressive form.

Polityka (/[locale]/polityka-prywatnosci) – Cel: Compliance.

Club (/[locale]/club) – Cel: Subskrypcje.

Funkcje: Stripe checkout.

Działanie: Pay → Discord webhook role.

Sekcja 4: Techniczne Wymagania – Stack, Kod i Deployment (Jak Zbudować) Uzasadnienie: Usunięto API dla quizu. Uproszczono API /api/leads do obsługi różnych źródeł (raport, audyt, kontakt) za pomocą pola source_form.

Stack Szczegółowy:

Frontend: Next.js 15 (App Router); React 18; Tailwind 3.4; Framer Motion.

Backend: Strapi v5 (hostowane na Render.com).

DB: Supabase (Postgres – unified: Strapi + leads).

Integracje: Refersion; Cloudinary; Stripe; Nodemailer/Resend (dla wysyłki PDF); Next-Intl (i18n); Discord Webhooks.

Tools: Render.com (Strapi host); Vercel (frontend); GitHub (repo); Hotjar. API Endpoints:

GET /api/products?filter=...: Strapi query.

POST /api/leads: Zapisuje leada do Supabase. Oczekuje body: { email, name, ...dane, source_form: 'report_download' | 'audit_request' | 'contact_form' }. Triggeruje wysyłkę e-maila (z PDF jeśli source_form == 'report_download'). Przykładowy Snippet (Interaktywna Wizualizacja Skali – Dla Product Detail):

JavaScript

// components/ScaleVisualization.jsx
import { useState } from 'react';

const ScaleVisualization = ({ robotHeight = 170 }) => {
  const [userHeight, setUserHeight] = useState(180);
  const scale = userHeight / 180; // Base scale

  return (
    <div className="relative w-full h-64 bg-gray-800 rounded-lg p-4">
      <img src="/robot.png" alt="Robot" className="absolute left-0 top-0 h-[170px]" />  {/* Fixed robot */}
      <img src="/human.png" alt="Człowiek" className="absolute left-1/2 top-0" style={{ transform: `scale(${scale})`, height: '180px' }} />  {/* Scaled human */}
      <label className="block mt-2">Twój wzrost: {userHeight} cm</label>
      <input type="range" min="150" max="200" value={userHeight} onChange={(e) => setUserHeight(Number(e.target.value))} className="w-full" />
    </div>
  );
};
export default ScaleVisualization;
Deployment Kroki (Poprawka Hosting):

Supabase: Utwórz projekt, DATABASE_URL do env.

Strapi: Deploy na Render.com (GitHub repo Strapi, connect Supabase DB).

Next.js: Vercel deploy, env vars do Supabase/Stripe/Resend.

Test: Full flow E2E (pobranie raportu).

Testy: Jest (logika formularzy); Cypress (lead flow raportu).

Sekcja 5: Roadmap Iteracyjny – Jak Budujemy i Walidujemy (Krok po Kroku) Uzasadnienie: Zmieniono Tydzień 2 – zamiast Quizu budujemy Formularz Pobierania Raportu. Reszta roadmapy pozostaje stabilna.

Tydz. 1 (Faza 0 - Walidacja Biznesowa – Blocker):

Cel: Outreach do 5 producentów (Neura, Unitree). Przygotuj 1-stronowy PDF oferty.

Metryka: Min. 2 potwierdzenia email (chęć + prowizje 10-25%).

Blocker: Nie przechodzimy do Tydz. 2 bez partnerów.

Tydz. 2 (Setup i Core Dev):

Cel: Po walidacji. Setup Vercel/Render/Supabase. Implementacja i18n. Build Home, Header, Footer. Build <ReportDownloadForm> (formularz pobrania raportu).

Metryka: Strona działa w 3 językach lokalnie. Formularz jest gotowy.

Tydz. 3 (Przepływ Danych i Treści):

Cel: Build Katalog i Product Detail z <ScaleVisualization>. API /api/leads (z logiką wysyłki PDF). Dodaj 3 artykuły bloga (case studies, ROI).

Metryka: Lead flow działa (submit → email z PDF).

Tydz. 4 (Zaufanie i SEO):

Cel: Build Blog, O Nas, Kontakt. Wprowadź trust signals (grafika "Jak Działamy", transparentność, testimonials).

Metryka: 90% gotowości.

Tydz. 5 (Monetyzacja i Testy E2E):

Cel: Build /club ze Stripe. Podpięcie Refersion. Testy Cypress E2E (full flow pobierania raportu).

Metryka: 100% gotowości do soft-launchu.

Tydz. 6 (Soft Launch i Marketing):

Cel: Deployment. Kampania Google Ads (200 EUR). Promocja Discord.

Metryka: Pierwsze 100 wizyt (Hotjar/GA), leady (pobrania raportu).

Ryzyka i Pivots: Niska konwersja raportu – A/B test nagłówków CTA lub zmiana magnesu na "Kalkulator ROI" (z quizvalidation.md).

Struktura Plików i Folderów dla Next.js 15 (App Router) z [locale] i next-intl Uzasadnienie: Usunięto QuizModal.jsx. Dodano ReportDownloadForm.jsx oraz AuditRequestForm.jsx jako kluczowe komponenty lejka.

Plaintext

project-root/
├── app/                             # App Router root
│   ├── [locale]/                    # Dynamic locale (pl, en, de)
│   │   ├── page.jsx                 # Home (/)
│   │   ├── sklep/                   # Katalog (/sklep)
│   │   │   └── page.jsx
│   │   ├── sklep/[slug]/            # Product Detail (/sklep/[slug])
│   │   │   └── page.jsx
│   │   ├── blog/                    # Blog (/blog)
│   │   │   └── page.jsx
│   │   ├── blog/[slug]/             # Single Post (/blog/[slug])
│   │   │   └── page.jsx
│   │   ├── o-nas/                   # O Nas (/o-nas)
│   │   │   └── page.jsx
│   │   ├── kontakt/                 # Kontakt (/kontakt)
│   │   │   └── page.jsx
│   │   ├── polityka-prywatnosci/    # Polityka (/polityka-prywatnosci)
│   │   │   └── page.jsx
│   │   ├── club/                    # Club (/club)
│   │   │   └── page.jsx
│   │   └── layout.jsx               # Layout dla [locale] (Header/Footer)
│   ├── api/                         # API Routes
│   │   ├── leads/                   # POST /api/leads
│   │   │   └── route.js
│   │   └── products/                # GET /api/products (proxy do Strapi)
│   │       └── route.js
│   ├── layout.jsx                   # Global Layout (Root)
│   └── middleware.js                # Middleware dla i18n redirect
├── components/                      # Reusable Komponenty
│   ├── Header.jsx                   # Sticky Header
│   ├── Footer.jsx                   # Footer z transparentnością
│   ├── ReportDownloadForm.jsx       # Formularz pobrania raportu (na Home)
│   ├── AuditRequestForm.jsx         # Formularz audytu (na Stronie Produktu)
│   ├── ScaleVisualization.jsx       # Interaktywna skala (suwak wzrostu)
│   ├── ProductCard.jsx              # Karta produktu
│   ├── Timeline.jsx                 # Timeline SVG na O Nas
│   ├── Testimonials.jsx             # Testimonials karty
│   └── JakDzialamyGrafika.jsx       # 3-etapowa infografika SVG
├── messages/                        # next-intl JSON
│   ├── pl.json
│   ├── en.json
│   └── de.json
├── public/                          # Static Assets
│   ├── images/                      # Obrazki (robot.png, human.png, logos)
│   ├── pdf/                         # Pliki PDF Raportów
│   │   └── Robot_Security_Report_2026_PL.pdf
│   ├── favicon.ico
│   └── manifest.json
├── utils/                           # Helpers
│   ├── supabase.js                  # Client Supabase
│   └── strapi.js                    # Fetch from Strapi API
│   └── email.js                     # Klient Resend/Nodemailer
├── next.config.js                   # Config (images domains, i18n locales: ['pl', 'en', 'de'])
├── tailwind.config.js               # Custom theme (neon green extend)
├── package.json                     # Dependencies: next, react, tailwind, next-intl, framer-motion, stripe, supabase-js, resend
├── .env.local                       # Env vars (SUPABASE_URL, STRIPE_SECRET, RESEND_API_KEY)
└── README.md                        # Instrukcje deploy