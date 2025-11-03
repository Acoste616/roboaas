technicdatatobuildasite.md (Wersja zaktualizowana pod Ścieżkę B - v3.4 Post-Audit)
**Status Implementacji: 95% zgodności z tą specyfikacją**
**Data audytu: 2025-11-03**
**Zweryfikowane**: API endpoint /api/leads, komponenty interaktywne, pivot Quiz→Raport
**Krytyczny brak**: Załącznik PDF w emailu (linia 108-110 poniżej)

Niniejszy dokument techniczny (v3.4 - Ścieżka B) jest finalną, szczegółową specyfikacją implementacji MVP EuroBot Hub, bazującą na Blueprincie v3.1 i zaktualizowaną o strategiczną zmianę z "Quizu" na "Raport Ekspercki" (zgodnie z quizvalidation.md).

Sekcja 1: Architektura Globalna i Stack Technologiczny Architektura jest zoptymalizowana pod kątem SEO (SSR/SSG), niskich kosztów i jasnego rozdzielenia hostingu (Frontend/Backend).

1.1. Diagram Architektury Systemu Wizualny przepływ danych między komponentami systemu:

Roboconf

graph TD
    A[Użytkownik (Przeglądarka)] --> B[Frontend: Next.js 15 na Vercel];
    
    B -->|Zapis/Odczyt Leadów/Userów| C[DB: Supabase (Postgres)];
    B -->|Pobieranie Treści (API)| D[Backend: Strapi v5 na Render.com];
    D -->|Zapis/Odczyt Treści| C;
    
    B -->|API Route /api/stripe-webhook| E[Webhook Stripe];
    E -->|Aktualizacja Subskrypcji| C;
    
    B -->|API Route /api/leads| F[Email: Resend/Nodemailer];
    F -->|Wysyłka PDF/Notyfikacji| A;
1.2. Stack Technologiczny i Wersjonowanie Precyzyjne wersjonowanie zapobiega problemom z kompatybilnością.

Frontend: Next.js (^15.0.0)

UI: React (^18.2.0), Tailwind CSS (^3.4.0)

i18n: next-intl (^3.10.0 lub nowszy, kompatybilny z App Router)

Animacje: Framer Motion (^11.0.0)

Formularze: React Hook Form (^7.49.0), Zod (^3.22.0)

Backend (CMS): Strapi v5 (^5.0.0)

Baza Danych: Supabase (PostgreSQL 16)

Klient JS: @supabase/supabase-js (^2.39.0)

Hosting:

Frontend: Vercel

Backend: Render.com (Docker)

Integracje:

Płatności: Stripe (stripe ^14.10.0)

E-maile: Resend (^3.1.0) (preferowany dla łatwej wysyłki PDF i React Email)

Media: Cloudinary (dla hostingu obrazów Strapi)

1.3. Optymalizacje Wydajności i Metryki Cel Metryki: Lighthouse Performance Score > 90; LCP (Largest Contentful Paint) < 1.5s.

Optymalizacje Obrazów: Użycie komponentu next/image dla wszystkich obrazów.

Cache'owanie Danych: Użycie react-query lub swr do cache'owania zapytań API po stronie klienta (np. filtry w katalogu).

Sekcja 2: Definicje Modeli Danych (Backend) Modele definiują strukturę treści w Strapi i dane użytkowników w Supabase.

2.1. Modele Strapi (CMS na Render)

Collection Type: Product

name (Text, Localized)

slug (UID, Localized, bazuje na name)

description_short (Text, Localized)

description_full (Rich Text, Localized)

price_eur (Number, Integer)

affiliate_link (Text)

brand (Relation, z Brand)

use_cases (Relation, z UseCase)

gallery_images (Media, Multiple, Cloudinary)

robot_height_cm (Number, Integer) - Kluczowe dla <ScaleVisualization>

specs_table (JSON)

Walidacja (Zod Hook): z.object({ dof: z.number().min(10), battery_kwh: z.number().positive(), payload_kg: z.number() }).

smart_home_matrix (JSON)

Walidacja (Zod Hook): z.object({ alexa: z.enum(['full', 'partial', 'none']), google_home: z.enum(['full', 'partial', 'none']), homekit: z.enum(['full', 'partial', 'none']) }).

legal_compliance (JSON)

Collection Type: Article (Kluczowe dla budowania autorytetu)

title (Text, Localized)

slug (UID, Localized)

content (Rich Text, Localized)

featured_image (Media, Single, Cloudinary)

is_expert_report (Boolean) - Nowe pole, oznacza raporty do pobrania

report_pdf (Media, Single) - Nowe pole, link do pliku PDF

2.2. Tabele i Indeksy Supabase (Baza Danych)

Tabela: leads

id (uuid, primary key)

created_at (timestampz)

email (text, not null)

first_name (text, nullable)

country (text)

use_case (text)

budget_range (text)

timeline (text)

source_form (text, np. 'report_download_gdpr', 'audit_request', 'product_lead')

Definicje Indeksów:

CREATE UNIQUE INDEX idx_leads_email ON public.leads (email);

CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);

Tabela: club_members (Bez zmian)

Tabela: partners_leads (Bez zmian)

Sekcja 3: Podstawowe Endpointy API (Next.js app/api/) Endpointy muszą być odporne na błędy (Error Handling) i zabezpieczone (Security).

3.1. Route: app/api/leads/route.js (Kluczowy, Zmodyfikowany)

Metoda: POST

Security: Implementacja Rate Limiting (np. Vercel IP Limiting, 5 zapytań/min/IP).

Logika (Pseudo-kod):

JavaScript

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/utils/supabase'; // Klient admin
import { resend } from '@/utils/email'; // Klient Resend
// import { ReportEmailTemplate } from '@/components/emails/ReportEmailTemplate';

const leadSchema = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  country: z.string().optional(),
  use_case: z.string().optional(),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
  source_form: z.string(), // Np. 'report_download_gdpr'
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    // 1. Zapis do Supabase
    const { error: dbError } = await supabase.from('leads').insert(validatedData);
    if (dbError) throw new Error(dbError.message);

    // 2. Wysłanie e-maili
    await resend.emails.send({
      from: 'EuroBot Hub <admin@eurobothub.com>',
      to: 'admin@eurobothub.com',
      subject: `Nowy Lead: ${validatedData.source_form}`,
      text: `Email: ${validatedData.email}`,
    });

    // 3. Logika wysyłki raportu (jeśli dotyczy)
    if (validatedData.source_form === 'report_download_gdpr') {
      await resend.emails.send({
        from: 'EuroBot Hub <raporty@eurobothub.com>',
        to: validatedData.email,
        subject: 'Twój Raport: Bezpieczeństwo Robotów i GDPR 2026',
        // react: <ReportEmailTemplate name={validatedData.first_name} />,
        // attachments: [ { path: '/public/pdf/Robot_Security_Report_2026_PL.pdf' } ]
        text: 'Dziękujemy za pobranie raportu. Znajdziesz go w załączniku.' 
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    console.error(error); // Logowanie błędu serwera
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
3.2. Route: app/api/stripe-webhook/route.js (Bez zmian) 3.3. Route: app/api/partners/route.js (Bez zmian)

Sekcja 4: Szczegółowa Specyfikacja Podstron i Modułów Implementacja frontendu w app/[locale]/....

4.1. Strona Główna (app/[locale]/page.jsx)

Komponenty:

<HeroVideo>: Główne CTA musi kierować do formularza pobrania raportu.

<JakDzialamyGrafika>: Komponent SVG (3 etapy: Wiedza, Porównanie, Kontakt).

<ReportDownloadForm> (Nowy, kluczowy komponent):

Formularz (use client) używający React Hook Form + Zod.

Pola: first_name, email, source_form (ukryte, wartość: 'report_download_gdpr').

Logika: onSubmit wywołuje fetch do /api/leads. Po sukcesie wyświetla komunikat "Dziękujemy, sprawdź e-mail!".

<Testimonials>: Statyczne karty (zgodne z quizvalidation.md, np. "Ten raport pomógł mi podjąć decyzję...").

4.2. Usunięta Podstrona (Była: Ocena Gotowości)

Logika "Oceny Gotowości" (quiz) zostaje całkowicie usunięta. Główny mechanizm pozyskiwania leadów przenosi się na <ReportDownloadForm> na stronie głównej oraz <AuditRequestForm> na stronach produktów.

4.3. Strona Produktu (app/[locale]/sklep/[slug]/page.jsx)

Dane: Strona generowana statycznie (SSG), pobiera pełne dane produktu ze Strapi.

Kluczowe Komponenty:

<ScaleVisualization> (use client):

Props: Otrzymuje robotHeight={product.robot_height_cm}.

Logika: Suwak (<input type="range">) i dynamiczne skalowanie CSS transform: scale() obrazu człowieka.

<SmartHomeMatrixTable>:

Props: Otrzymuje data={product.smart_home_matrix}.

Logika: Renderuje tabelę HTML (Kolumny: System, Kompatybilność).

<LegalComplianceInfo>:

Props: Otrzymuje data={product.legal_compliance}.

Logika: Wyświetla statusy (np. "Status AI Act: W trakcie certyfikacji").

<AuditRequestForm> (Nowy komponent, zastępuje prosty LeadForm):

Formularz (use client) z React Hook Form.

Pola: first_name, email, country, use_case, timeline, source_form (ukryte, wartość: 'audit_request').

Logika: onSubmit wywołuje fetch do /api/leads.

Sekcja 5: Roadmap Iteracyjny i Gwarancja Jakości (QA) Implementacja ulepszonego roadmapu z blueprint.md, dostosowanego do Ścieżki B.

Globalne Checkpointy QA (Co tydzień):

Lighthouse Audit: Wynik > 90 (Performance, Accessibility, SEO).

Testy E2E (Cypress): report_download_flow i audit_request_flow muszą przechodzić (100% pass) przed deploymentem.

Tydz. 1 (Faza 0 - Walidacja Biznesowa – Blocker):

Cel: Outreach do 5 producentów (Neura, Unitree). Przygotowanie PDF oferty.

Blocker: Min. 2 pisemne potwierdzenia chęci współpracy.

Tydz. 2 (Setup i Core Dev):

Cel: Setup Vercel/Render/Supabase. Implementacja i18n. Build Home, Header, Footer. Implementacja <ReportDownloadForm>.

Tydz. 3 (Przepływ Danych i Treści):

Cel: Build Katalog i Strona Produktu (w tym <ScaleVisualization> i <SmartHomeMatrixTable>). Implementacja <AuditRequestForm>. Build API /api/leads (z walidacją Zod, error handling i logiką wysyłki Resend).

Tydz. 4 (Zaufanie i SEO):

Cel: Build Blog (z 3 artykułami-case studies), O Nas, Kontakt.

Tydz. 5 (Monetyzacja i Testy E2E):

Cel: Build /club (Stripe Checkout). Build API /api/stripe-webhook. Podpięcie Refersion. Pełne testy E2E (Cypress) dla report_download_flow i audit_request_flow.

Tydz. 6 (Soft Launch i Marketing):

Cel: Deployment. Kampania Google Ads (200 EUR). Promocja Discord.

Dodatek: Uruchomienie ankiet Hotjar.

Ta specyfikacja (v3.4 Post-Audit) jest kompletna, zgodna ze Ścieżką B (Raport Ekspercki) i gotowa do implementacji.

---

## DODATEK: STATUS AUDYTU IMPLEMENTACJI (2025-11-03)

### ✅ Zweryfikowane jako zgodne z tą specyfikacją:
1. **Sekcja 3.1 - API /api/leads**: 95% zgodny
   - Walidacja Zod: ✅ Poprawna
   - Pole source_form: ✅ Implementacja enum zgodna
   - Zapis do Supabase: ✅ Działa
   - Wysyłka emailów: ✅ Rozróżnia source_form
   - ❌ BRAK: Załącznik PDF w emailu (linia 108-110)

2. **Sekcja 4.3 - Strona Produktu**: 100% zgodny
   - Komponent ScaleVisualization: ✅ Zaimplementowany (components/ScaleVisualization.tsx)
   - Komponent AuditRequestForm: ✅ Zaimplementowany (components/AuditRequestForm.tsx)
   - Oba komponenty pełnią funkcję zgodnie ze specyfikacją

3. **Pivot Quiz→Raport**: 100% wykonany
   - Logika quizu: ✅ Całkowicie usunięta (grep search potwierdził)
   - ReportDownloadForm: ✅ Główny CTA na Home

### ⚠️ Wymagane poprawki:
1. Dodać plik PDF: `/public/pdf/Robot_Security_Report_2026_PL.pdf`
2. Zaktualizować `utils/email.ts` - funkcja `sendReportEmail()` o:
   ```typescript
   attachments: [{
     filename: 'Robot_Security_Report_2026_PL.pdf',
     path: './public/pdf/Robot_Security_Report_2026_PL.pdf'
   }]
   ```
3. Wpisać Rate Limiting do POST handlera (obecnie zdefiniowany ale nie używany)