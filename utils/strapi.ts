// Strapi API client
// To be implemented in Week 3 with actual Strapi instance

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchFromStrapi(endpoint: string) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    if (!response.ok) throw new Error('Strapi fetch failed');
    return await response.json();
  } catch (error) {
    console.error('[Strapi] Error:', error);
    return null;
  }
}

export async function fetchProducts() {
  console.log('[MOCK] Fetching products from Strapi');
  return {
    data: [
      {
        id: 1,
        attributes: {
          name: 'Tesla Optimus Gen 3',
          price_eur: 20000,
          slug: 'tesla-optimus-gen-3',
          brand: 'Tesla',
          description_short: 'Przełomowy robot humanoidalny od Tesla z 40+ stopniami swobody',
          description_full: '<h2>Przełomowa Technologia Tesla</h2><p>Tesla Optimus Gen 3 to najbardziej zaawansowany robot humanoidalny na rynku, zaprojektowany do pracy w magazynach i fabrykach. Wyposażony w 40+ elektromechanicznych stawów, oferuje niezrównaną precyzję i elastyczność ruchów.</p><h3>Kluczowe Cechy:</h3><ul><li>Zaawansowane widzenie komputerowe 360°</li><li>Integracja z Tesla FSD AI</li><li>Automatyczna nawigacja i unikanie przeszkód</li><li>Bateria litowo-jonowa 8h pracy</li></ul>',
          image: '/images/xvjWEJYrNhg2Jvo97muHic.jpg',
          gallery: ['/images/xvjWEJYrNhg2Jvo97muHic.jpg', '/images/pobrane.webp'],
          robot_height_cm: 173,
          specs_table: { dof: 40, battery_kwh: 2.3, payload_kg: 20, speed_ms: 2.5 },
          smart_home_matrix: { alexa: 'full', google_home: 'full', homekit: 'partial' },
          legal_compliance: { ai_act_status: 'W trakcie certyfikacji', gdpr_compliant: true, ce_mark: true }
        }
      },
      {
        id: 2,
        attributes: {
          name: 'Neura 4NE-1',
          price_eur: 45000,
          slug: 'neura-4ne-1',
          brand: 'Neura Robotics',
          description_short: 'Niemiecki robot z zaawansowanym systemem Omnisensor',
          description_full: '<h2>Niemiecka Precyzja</h2><p>Neura 4NE-1 to robot humanoidalny wyprodukowany w Niemczech, wyposażony w rewolucyjny system Omnisensor do percepcji otoczenia 360°.</p><h3>Zalety:</h3><ul><li>Certyfikacja Made in Germany</li><li>Omnisensor: 6D force/torque sensing</li><li>Modułowa konstrukcja</li><li>Najwyższe standardy bezpieczeństwa</li></ul>',
          image: '/images/f0327448-humanoid-envato-elements-pic-25325.webp',
          gallery: ['/images/f0327448-humanoid-envato-elements-pic-25325.webp', '/images/1657226851920.webp'],
          robot_height_cm: 180,
          specs_table: { dof: 35, battery_kwh: 3.0, payload_kg: 25, speed_ms: 2.0 },
          smart_home_matrix: { alexa: 'partial', google_home: 'full', homekit: 'full' },
          legal_compliance: { ai_act_status: 'Certyfikowany', gdpr_compliant: true, ce_mark: true }
        }
      },
      {
        id: 3,
        attributes: {
          name: 'Unitree H1',
          price_eur: 140000,
          slug: 'unitree-h1',
          brand: 'Unitree',
          description_short: 'Zaawansowany robot z możliwością szybkiego przemieszczania się',
          description_full: '<h2>Prędkość i Zwinność</h2><p>Unitree H1 to najszybszy robot humanoidalny na rynku, osiągający prędkość do 3.3 m/s. Idealny do dynamicznych środowisk przemysłowych.</p><h3>Specyfikacja:</h3><ul><li>Prędkość maksymalna: 3.3 m/s</li><li>Zaawansowany system balansu</li><li>Wodoodporna konstrukcja IP54</li><li>Zdalne zarządzanie przez cloud</li></ul>',
          image: '/images/4202182c2a0ff23c85ccfee3ad7789927605abba-2480x1460.avif',
          gallery: ['/images/4202182c2a0ff23c85ccfee3ad7789927605abba-2480x1460.avif', '/images/im-53023344.avif'],
          robot_height_cm: 180,
          specs_table: { dof: 42, battery_kwh: 2.8, payload_kg: 18, speed_ms: 3.3 },
          smart_home_matrix: { alexa: 'none', google_home: 'partial', homekit: 'none' },
          legal_compliance: { ai_act_status: 'W trakcie certyfikacji', gdpr_compliant: true, ce_mark: true }
        }
      },
      {
        id: 4,
        attributes: {
          name: '1X Neo',
          price_eur: 20000,
          slug: '1x-neo',
          brand: '1X',
          description_short: 'Norweski robot zaprojektowany specjalnie dla gospodarstw domowych',
          description_full: '<h2>Robot dla Domu</h2><p>1X Neo to pierwszy robot humanoidalny zaprojektowany specjalnie do użytku domowego. Bezpieczny, cichy i intuicyjny w obsłudze.</p><h3>Funkcje Domowe:</h3><ul><li>Asystent w kuchni</li><li>Pomoc w opiece nad seniorami</li><li>Automatyczne sprzątanie</li><li>Integracja z smart home</li></ul>',
          image: '/images/NEO-Gamma_Breakfast.webp',
          gallery: ['/images/NEO-Gamma_Breakfast.webp', '/images/00HUMANOID-VIDEO-kitchen-video-cover-square640.jpg'],
          robot_height_cm: 165,
          specs_table: { dof: 30, battery_kwh: 1.5, payload_kg: 10, speed_ms: 1.8 },
          smart_home_matrix: { alexa: 'full', google_home: 'full', homekit: 'full' },
          legal_compliance: { ai_act_status: 'Certyfikowany', gdpr_compliant: true, ce_mark: true }
        }
      },
      {
        id: 5,
        attributes: {
          name: 'Figure 02',
          price_eur: 85000,
          slug: 'figure-02',
          brand: 'Figure AI',
          description_short: 'Robot z wyjątkową precyzją manipulacji (16 DoF per hand)',
          description_full: '<h2>Najwyższa Precyzja</h2><p>Figure 02 wyróżnia się wyjątkową precyzją manipulacji dzięki 16 stopniom swobody w każdej dłoni. Idealny do zadań wymagających delikatności.</p><h3>Zastosowania:</h3><ul><li>Montaż precyzyjny</li><li>Laboratoryjne operacje</li><li>Obsługa delikatnych przedmiotów</li><li>Prace medyczne</li></ul>',
          image: '/images/Figure-03-humanoid-robots-Figure-AI-07.webp',
          gallery: ['/images/Figure-03-humanoid-robots-Figure-AI-07.webp', '/images/Figure-03-2023-04-770x433.webp'],
          robot_height_cm: 170,
          specs_table: { dof: 50, battery_kwh: 2.5, payload_kg: 22, speed_ms: 2.2 },
          smart_home_matrix: { alexa: 'partial', google_home: 'full', homekit: 'partial' },
          legal_compliance: { ai_act_status: 'W trakcie certyfikacji', gdpr_compliant: true, ce_mark: true }
        }
      },
      {
        id: 6,
        attributes: {
          name: 'SoftBank Pepper',
          price_eur: 25000,
          slug: 'softbank-pepper',
          brand: 'SoftBank Robotics',
          description_short: 'Robot społeczny idealny dla zastosowań w opiece zdrowotnej',
          description_full: '<h2>Robot Społeczny</h2><p>SoftBank Pepper to sprawdzony robot społeczny z tysiącami wdrożeń na całym świecie. Idealny do interakcji z ludźmi w środowisku medycznym i edukacyjnym.</p><h3>Funkcje Społeczne:</h3><ul><li>Rozpoznawanie emocji</li><li>Konwersacje w 20+ językach</li><li>Teleprezencja</li><li>Edukacja i rozrywka</li></ul>',
          image: '/images/senior-with-robot-stockcake.jpg',
          gallery: ['/images/senior-with-robot-stockcake.jpg', '/images/00HUMANOID-VIDEO-kitchen-video-cover-square640.jpg'],
          robot_height_cm: 120,
          specs_table: { dof: 20, battery_kwh: 0.8, payload_kg: 5, speed_ms: 1.0 },
          smart_home_matrix: { alexa: 'full', google_home: 'full', homekit: 'none' },
          legal_compliance: { ai_act_status: 'Certyfikowany', gdpr_compliant: true, ce_mark: true }
        }
      }
    ]
  };
}

export async function fetchArticles() {
  console.log('[MOCK] Fetching articles from Strapi');
  return {
    data: [
      {
        id: 1,
        attributes: {
          title: 'Case Study: Jak CEO z Monachium wdrożył robota i chroni swoje dane (GDPR)',
          slug: 'ceo-monachium-robot-gdpr',
          description_short: 'Rzeczywista historia właściciela startupu technologicznego z Niemiec, który zainwestował w robota Neura 4NE-1 do opieki nad swoją 82-letnią matką.',
          featured_image: '/images/senior-with-robot-stockcake.jpg',
          content: '<h2>Profil Klienta</h2><p>Dr. Michael Weber zarządza startupem FinTech w Monachium. Problem? Matka (82 lata) zapomina o lekach.</p><h3>Rozwiązanie: Neura 4NE-1</h3><p>Robot z GDPR compliance, lokalnym przetwarzaniem danych i audytem bezpieczeństwa. ROI: 19 miesięcy.</p>',
          publishedAt: '2025-10-28',
          category: 'Case Studies'
        }
      },
      {
        id: 2,
        attributes: {
          title: 'Analiza ROI: Robot humanoidalny vs. Opiekunka dla seniora w Polsce – Realne koszty 2026',
          slug: 'roi-robot-vs-opiekunka-polska',
          description_short: 'Szczegółowa analiza kosztów pokazująca rzeczywisty zwrot z inwestycji w robota opiekuńczego w porównaniu z opiekunką ludzką.',
          featured_image: '/images/NEO-Gamma_Breakfast.webp',
          content: '<h2>Problem: Kryzys Opiekunów</h2><p>W Polsce brakuje 200,000 opiekunów. Koszt opieki wzrósł o 35% od 2022.</p><h3>Porównanie</h3><p>Opiekunka: 109,824 PLN/rok. Robot 1X Neo: Punkt zwrotu po 11 miesiącach. Oszczędności 5-letnie: 427,620 PLN.</p>',
          publishedAt: '2025-10-22',
          category: 'ROI Analysis'
        }
      },
      {
        id: 3,
        attributes: {
          title: 'Top 5 Zastosowań Robotów w Domu (Innych Niż Myślisz)',
          slug: 'top-5-zastosowan-robotow-domowych',
          description_short: 'Odkryj rzeczywiste, zaskakujące zastosowania robotów humanoidalnych w europejskich domach – od opieki nad seniorami po pomoc dzieciom z autyzmem.',
          featured_image: '/images/00HUMANOID-VIDEO-kitchen-video-cover-square640.jpg',
          content: '<h2>Roboty Poza Science Fiction</h2><p>5 rzeczywistych zastosowań robotów w Europie:</p><ol><li>Opieka nad osobami z demencją (Pepper, -35% izolacji)</li><li>Przypominanie o lekach (94% skuteczności)</li><li>Gotowanie (1000+ przepisów)</li><li>Edukacja dzieci z autyzmem (76% sukcesu)</li><li>Zapobieganie upadkom (-85% ryzyka)</li></ol>',
          publishedAt: '2025-10-15',
          category: 'Use Cases'
        }
      }
    ]
  };
}
