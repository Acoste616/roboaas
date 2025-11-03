Zrozumiałem. To kluczowa i strategiczna zmiana. Przebudowanie głównego mechanizmu pozyskiwania leadów z "Quizu" na "Raport Ekspercki / Audyt" jest w pełni zgodne z wnioskami z pliku quizvalidation.md, który celnie analizuje psychologię Twojej grupy docelowej (HNWI).

**STATUS IMPLEMENTACJI (Audyt 2025-11-03): 92% zgodności z tą wizją**
- ✅ Pivot Quiz→Raport: Całkowicie wykonany
- ✅ ReportDownloadForm: Główny CTA na Home
- ✅ AuditRequestForm: Na stronach produktów
- ❌ Krytyczny brak: Plik PDF w /public/pdf/ i załącznik w emailu

Przygotowałem od nowa wszystkie trzy dokumenty (whitepaper.md, blueprint.md, technicdatatobuildasite.md).

Wprowadziłem następujące globalne zmiany:

Usunąłem "Quiz" / "Ocenę Gotowości" jako główny mechanizm.

Zastąpiłem go "Raportem Eksperckim" (np. "Raport Bezpieczeństwa i GDPR 2026") oraz "Spersonalizowanym Audytem Bezpieczeństwa" jako głównymi magnesami (lead magnets).

Zaktualizowałem User Journey, Wireframes, Strukturę API oraz Roadmapę deweloperską, aby odzwierciedlały budowę tego nowego lejka.

Oto gotowe, zaktualizowane pliki. Proszę, podmień je w swoich zasobach.

PLIK 1: whitepaper.md (Wersja zaktualizowana pod Ścieżkę B)
Cel Dokumentu: Niniejsza specyfikacja ma na celu przekazanie Ci (jako developerowi, np. via Qoder.ai) pełnego obrazu wizji EuroBot Hub. To nie jest biznesplan, ale dokładny przewodnik po tym, co chcemy osiągnąć, dlaczego budujemy ten sklep i jak ma działać na co dzień. Skupiam się na celach biznesowych, user journey, wymaganych funkcjach i mechanizmach działania – wszystko w prostym, actionable języku. Użyj tego do generowania kodu: skup się na MVP (5-10 podstron, Next.js + Strapi), z iteracjami. Jeśli coś jest niejasne, generuj kod krok po kroku (np. najpierw komponent pobierania raportu) i testuj. Cel: MVP gotowy w 4 tygodnie, konwertujący 5% wizyt na leady.

1. Wizja i Cele Biznesowe: Dlaczego Budujemy Ten Sklep i Co Chcemy Osiągnąć?

Krótka Wizja: EuroBot Hub to europejski hub afiliacyjny dla robotów humanoidalnych B2C – nie jesteśmy producentem, ale "mostkiem" między zamożnymi klientami (35-65 lat, dochód >100k EUR/rok) a firmami jak Neura Robotics czy Unitree. Sklep agreguje oferty, generuje zaufanie poprzez autorytatywny, edukacyjny content i kwalifikowane leady, a my zarabiamy na prowizjach (10-25% od sprzedaży/leads). To niskie ryzyko (zero inwentarza), skalowalne (afiliacja + community) i na czasie – rynek EU humanoidów rośnie o 44% rocznie.

Główne Cele Biznesowe (Co Osiągniemy po Launchu MVP):

Krótki Termin (Q1 2026): 1k wizyt/mies., 5% konwersja na leady (50 leadów/mies. pozyskanych przez pobranie raportu/audyt), pierwsze 3 umowy afiliacyjne (revenue 10-20k EUR z prowizji). Budujemy bazę 500 users w Discord (community retention >30%).

Średni Termin (Rok 1): 150k EUR revenue. Pozycjonujemy się jako "EU ekspert od bezpieczeństwa i integracji humanoidów" (SEO top 3 dla "robot humanoidalny GDPR Polska").

Długi Termin (Rok 2+): Skalowanie do 1,2 mln EUR. Exit: Akwizycja przez giganta (np. MediaMarkt) po 1 mln EUR ARR.

Po Co Nam Ten Sklep? (Wartość dla Biznesu i Użytkowników):

Dla Nas (Założyciele): Bootstrapping z <800 EUR – generujemy recurring revenue bez ryzyka. Budujemy markę (autorytatywny content + Discord) do pozyskiwania dotacji (PARP/UE Horizon: 100k EUR).

Dla Użytkowników (Klienci B2C): Rozwiązujemy ból: "Gdzie kupić bezpiecznego robota i kto zadba o moje dane?" – oferujemy Raporty Eksperckie (np. "Robot Security 2026: GDPR Compliance Guide"), porównania i wizualizacje (rozmiar robota vs człowiek). To nie sprzedaż, a edukacja i budowanie zaufania.

Dla Producentów: Jesteśmy ich "hubem sprzedażowym" – generujemy kwalifikowane leady (zamożni EU klienci), bez konkurencji (tylko linki do nich). Oni dają materiały (zdjęcia, linki), my marketing oparty na zaufaniu.

Kluczowe Metryki Sukcesu (Śledź w Google Analytics/Hotjar):

Wizyty: >1k/mies.

Konwersja: 5% wizyt → lead (pobranie raportu / zgłoszenie na audyt).

Bounce Rate: <25%.

Churn Community: <15% w Discord.

2. User Journey: Jak Sklep Ma Działać dla Użytkownika (Krok po Kroku)

Użytkownik to zamożny tech-entuzjasta z PL/DE (mobile/desktop). Journey to funnel: Awareness → Trust → Action (lead/pre-order). Całość w dark mode (default), responsywna (mobile-first), z multilingual (PL/EN/DE via Next-Intl).

Typowy Flow (Od Wejścia do Leada):

Wejście (Home): Użytkownik ląduje via Google Ads/SEO ("robot humanoidalny bezpieczeństwo"). Hero video (demo Neura) + główne CTA: "Pobierz bezpłatny Raport: Roboty w Domu a GDPR 2026". Cel: 10% kliknięć w CTA.

Eksploracja (Katalog/Blog): Przegląda grid produktów (filtry: Cena, Producent). Na karcie: Zdjęcie + wizualizacja porównawcza (obrazek: robot obok sylwetki człowieka). Czyta blog ("Case Study: Jak CEO z Monachium wdrożył robota") z affiliate linkami.

Budowanie Zaufania (Lead Magnet): Użytkownik klika CTA raportu. Otrzymuje modal lub dedykowaną stronę z 3 punktami (czego się dowie) i formularzem (Email, Imię). Po podaniu danych otrzymuje PDF.

Akcja (Kwalifikacja Leada / Community): Po pobraniu raportu, użytkownik otrzymuje ofertę "Spersonalizowanego Audytu Bezpieczeństwa" (lead kwalifikowany) lub zaproszenie do Discord: "Dołącz do Clubu za 5 EUR/mies. – Q&A live z ekspertem cyberbezpieczeństwa".

Retencja: Powrót via newsletter (free) lub Discord (premium: Ekskluzywne porównania, unboxingi, webinary z ekspertami).

Edge Cases:

Mobile: Sticky CTA "Pobierz Raport".

Błąd: Jeśli lead nie konwertuje, retargeting pixel (FB/Google).

Bezpieczeństwo: GDPR consent popup na starcie.

3. Wymagane Komponenty i Funkcje: Co Musi Zawierać Sklep i Jak Działać?

MVP to 8 podstron (jak w blueprint v2.1). Generuj kod modularnie (React komponenty). Backend: Strapi dla produktów/bloga (CRUD API). Frontend: Next.js dla SSR/SEO. Hosting: Vercel (darmowe).

Podstawowe Wymagania Globalne:

Design: Futurystyczny minimalizm (Tailwind: Dark #0A0F1E, neon-green #00FF88 akcenty). Micro-animacje (Framer Motion: Hover glow). Responsywny (Tailwind breakpoints).

Funkcje Core:

Wielojęzyczność: Next-Intl (switcher w header).

Tracking: Google Analytics (events: 'report_download', 'audit_request', 'lead_submit').

Płatności: Stripe tylko dla Discord sub (5 EUR/mies., recurring).

Integracje: Refersion (afiliacja tracking), Cloudinary (obrazki), Discord OAuth (login do Clubu), Nodemailer (wysyłka leadów), System do wysyłki PDF (np. Resend lub link do zasobu po walidacji formularza).

Dane: Produkty w Strapi: {name, price, affiliateLink, imageUrl, comparisonImage (PNG: robot vs człowiek), specs[]}.

Szczegółowe Podstrony i Funkcje (Generuj w Tej Kolejności):

Home (/): Hero video + główne CTA (np. baner) do pobrania raportu. Sekcje: "Dlaczego Hub?" (3 karty zaufania), teaser katalogu (3 produkty). Formularz pobrania raportu (Lead Magnet Form): React Hook Form (walidacja, POST do /api/leads → email via Nodemailer + PDF delivery).

Katalog (/sklep): Grid produktów (3-col desktop). Filtry (sidebar: Cena slider, dropdown Producent). Karta: Zdjęcie + hover: Overlay z porównaniem (obrazek PNG, CSS scale). Funkcja: Infinite scroll, porównanie modal (tabela 3 produktów).

Produkt Detail (/sklep/[slug]): Gallery (thumbnails) + opis accordion. Wizualizacja: Duży obrazek porównawczy (CSS: Position relative z sylwetką człowieka). Kalkulator: JS slider (rata = price / miesiące). Formularz "Poproś o Audyt / Demo": React Hook Form (walidacja, POST do /api/leads).

Blog (/blog): Lista postów (grid 2-col). Szukarka tagów. W poście: Inline affiliate links. Komentarze: Disqus embed. Treści muszą być autorytatywne (case studies, analizy ROI, raporty o bezpieczeństwie).

O Nas (/o-nas): Timeline (SVG animowane) + zespół (2 karty z bio, podkreślające ekspertyzę w tech/security). CTA form: "Partnerstwo? Wyślij lead".

Kontakt (/kontakt): Form + Google Maps embed (Warszawa). Działanie: Submit → Success modal + email confirm.

Utility (/polityka-prywatnosci): Statyczny Markdown (GDPR sekcje).

Discord Club (/club): Paywall (Stripe checkout) → Redirect do Discord servera. Funkcja: OAuth login, role premium.

Jak Musi Działać (Mechanizmy):

Lead Flow (Raport): Użytkownik wypełnia formularz (Email, Imię) na Home. POST do /api/leads. API zapisuje leada w Supabase (source: 'report_download') i wysyła email do użytkownika z linkiem do PDF (lub załącznikiem).

Lead Flow (Audyt): Użytkownik wypełnia formularz na stronie produktu. POST do /api/leads. API zapisuje leada (source: 'audit_request') i wysyła notyfikację do admina (Nodemailer).

Porównania Wizualne: Upload PNG (robot overlay na człowieka) do Cloudinary. CSS: .comparison { position: relative; } .human { width: 100px; } .robot { position: absolute; top: 20%; left: 50%; transform: scale(0.8); }.

Community: Stripe sub → Discord bot assign role "Premium" (via webhook). Free tier: Public channels; Premium: #exclusive-comps, #expert-webinars.

Wymagania Techniczne dla Qoder.ai (Generuj Krok po Kroku):

Stack: Next.js 15 (pages dir dla prostoty), Tailwind, Strapi v5 (self-host Vercel). DB: Supabase (free).

API Routes: /api/leads (POST: Save lead, send email, trigger PDF delivery).

Testy: Unit (Jest: Logika formularzy), E2E (Cypress: Lead flow pobierania raportu).

Deployment: Vercel connect GitHub – auto-deploy na push.

Następne Kroki dla Ciebie (Developer):

Generuj Home + Komponent Formularza Pobierania Raportu.

Test: Uruchom lokalnie, symuluj pobranie raportu (lead trafia do bazy, email jest wysyłany).

Feedback: Wyślij mi pull request/snippet – iterujemy.