/**
 * ═══════════════════════════════════════════════════════════
 *  EUROBOT HUB - PRODUCTION SEEDING SCRIPT
 * ═══════════════════════════════════════════════════════════
 * 
 * Seeds 6 premium humanoid robots to Strapi CMS
 * Target: https://eurobot-hub-strapi.onrender.com
 * 
 * Products:
 * 1. Tesla Optimus Gen 3 (€20,000)
 * 2. Neura 4NE-1 (€28,500) - EU Certified
 * 3. Unitree H1 (€90,000)
 * 4. 1X Neo (€55,000)
 * 5. Figure 02 (€35,000)
 * 6. SoftBank Pepper (€18,500)
 * 
 * Usage:
 * node scripts/seed-production.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://eurobot-hub-strapi.onrender.com';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_URL || process.env.STRAPI_API_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN not found!');
  console.error('💡 Add to .env: STRAPI_API_TOKEN=your_token_here');
  process.exit(1);
}

console.log('🚀 EuroBot Hub - Production Seeding');
console.log('📡 Target:', STRAPI_URL);
console.log('🔑 Token:', STRAPI_TOKEN.substring(0, 30) + '...\n');

// ═══════════════════════════════════════════════════════════
// PRODUCT DATA - 6 Premium Humanoid Robots
// ═══════════════════════════════════════════════════════════

const PRODUCTS_DATA = [
  // ───────────────────────────────────────────────────────
  // 1. TESLA OPTIMUS GEN 3
  // ───────────────────────────────────────────────────────
  {
    base: {
      brand: 'Tesla',
      price_eur: 20000,
      robot_height_cm: 173,
      affiliate_link: 'https://tesla.com/optimus',
      image: '/images/xvjWEJYrNhg2Jvo97muHic.jpg',
      gallery: ['/images/xvjWEJYrNhg2Jvo97muHic.jpg', '/images/Tesla-Optimus-Bot-Eggs-Hands.jpg', '/images/2-The-next-generation-of-Tesla\'s-humanoid-robot-makes-its-debut.webp'],
      specs_table: { dof: 28, battery_kwh: 2.3, payload_kg: 20, speed_ms: 1.4, runtime_hours: 8, charge_time_hours: 3 },
      smart_home_matrix: { alexa: 'partial', google_home: 'partial', homekit: 'none' },
      legal_compliance: { ce_certified: false, gdpr_compliant: false, ai_act_status: 'Not Certified - US Product' }
    },
    locales: {
      en: {
        name: 'Tesla Optimus Gen 3',
        slug: 'tesla-optimus-gen-3',
        description_short: 'Silicon Valley innovation meets European reality. Advanced AI, 28 DoF - but GDPR/AI Act compliance pending.',
        description_full: `<h1>Tesla Optimus Gen 3: American Excellence, European Challenges</h1>
<p><strong>€20,000</strong> | 173cm | 28 Degrees of Freedom | 8h Runtime</p>

<h2>⚠️ Critical EU Considerations</h2>
<p><strong>GDPR Status:</strong> ❌ Not EU-certified. Tesla's cloud infrastructure processes data on US servers, raising concerns under GDPR Article 44 (international data transfers). For HNWI handling sensitive business communications at home, this poses legal liability.</p>
<p><strong>AI Act:</strong> ⏳ Pending (2026+). As a "high-risk AI system" under EU AI Act Article 6, Optimus requires third-party conformity assessment before commercial deployment in Europe.</p>

<h2>Technical Excellence</h2>
<ul>
<li><strong>28 DoF</strong> - Industry-leading articulation for complex tasks</li>
<li><strong>2.3 kWh Battery</strong> - 8 hours continuous operation</li>
<li><strong>20kg Payload</strong> - Handles household items with ease</li>
<li><strong>Tesla Neural Network</strong> - Same AI architecture as Full Self-Driving</li>
<li><strong>1.4 m/s Walking Speed</strong> - Natural human-like gait</li>
</ul>

<h2>Why European Buyers Choose Alternatives</h2>
<ol>
<li><strong>Data Sovereignty</strong> - No local processing guarantee</li>
<li><strong>Regulatory Uncertainty</strong> - AI Act compliance timeline unclear</li>
<li><strong>Support Network</strong> - Limited European service infrastructure</li>
</ol>

<p><em>🛡️ EuroBot Hub Recommendation: Excellent technology, but consider EU-certified alternatives like Neura 4NE-1 for peace of mind.</em></p>`
      },
      pl: {
        name: 'Tesla Optimus Gen 3',
        slug: 'tesla-optimus-gen-3',
        description_short: 'Innowacja z Doliny Krzemowej spotyka europejską rzeczywistość. Zaawansowana AI, 28 stopni swobody - ale zgodność RODO/AI Act oczekująca.',
        description_full: `<h1>Tesla Optimus Gen 3: Amerykańska Doskonałość, Europejskie Wyzwania</h1>
<p><strong>87 000 PLN</strong> | 173cm | 28 Stopni Swobody | 8h Pracy</p>

<h2>⚠️ Krytyczne Uwagi dla UE</h2>
<p><strong>Status RODO:</strong> ❌ Brak certyfikacji UE. Infrastruktura chmurowa Tesli przetwarza dane na serwerach amerykańskich, co budzi obawy pod Art. 44 RODO (transfery międzynarodowe). Dla HNWI obsługujących wrażliwą komunikację biznesową w domu, to oznacza odpowiedzialność prawną.</p>
<p><strong>AI Act:</strong> ⏳ W trakcie (2026+). Jako "system AI wysokiego ryzyka" pod Art. 6 EU AI Act, Optimus wymaga oceny zgodności przez stronę trzecią przed komercyjnym wdrożeniem w Europie.</p>

<h2>Doskonałość Techniczna</h2>
<ul>
<li><strong>28 Stopni Swobody</strong> - Wiodąca w branży artykulacja dla złożonych zadań</li>
<li><strong>Bateria 2.3 kWh</strong> - 8 godzin ciągłej pracy</li>
<li><strong>Udźwig 20kg</strong> - Bezproblemowo radzi sobie z przedmiotami domowymi</li>
<li><strong>Sieć Neuronowa Tesli</strong> - Ta sama architektura AI co Full Self-Driving</li>
<li><strong>Prędkość 1.4 m/s</strong> - Naturalny, ludzki chód</li>
</ul>

<h2>Dlaczego Europejscy Nabywcy Wybierają Alternatywy</h2>
<ol>
<li><strong>Suwerenność Danych</strong> - Brak gwarancji lokalnego przetwarzania</li>
<li><strong>Niepewność Regulacyjna</strong> - Niejasny harmonogram zgodności z AI Act</li>
<li><strong>Sieć Wsparcia</strong> - Ograniczona europejska infrastruktura serwisowa</li>
</ol>

<p><em>🛡️ Rekomendacja EuroBot Hub: Doskonała technologia, ale rozważ alternatywy certyfikowane w UE jak Neura 4NE-1 dla spokoju ducha.</em></p>`
      },
      de: {
        name: 'Tesla Optimus Gen 3',
        slug: 'tesla-optimus-gen-3',
        description_short: 'Silicon Valley Innovation trifft europäische Realität. Fortgeschrittene KI, 28 Freiheitsgrade - aber DSGVO/AI Act Compliance ausstehend.',
        description_full: `<h1>Tesla Optimus Gen 3: Amerikanische Exzellenz, Europäische Herausforderungen</h1>
<p><strong>€20.000</strong> | 173cm | 28 Freiheitsgrade | 8h Laufzeit</p>

<h2>⚠️ Kritische EU-Überlegungen</h2>
<p><strong>DSGVO-Status:</strong> ❌ Nicht EU-zertifiziert. Teslas Cloud-Infrastruktur verarbeitet Daten auf US-Servern, was Bedenken unter DSGVO Artikel 44 (internationale Datentransfers) aufwirft.</p>
<p><strong>AI Act:</strong> ⏳ Ausstehend (2026+). Als "hochriskantes KI-System" unter EU AI Act Artikel 6 benötigt Optimus eine Drittpartei-Konformitätsbewertung.</p>

<h2>Technische Exzellenz</h2>
<ul>
<li><strong>28 Freiheitsgrade</strong> - Branchenführende Artikulation</li>
<li><strong>2.3 kWh Batterie</strong> - 8 Stunden Dauerbetrieb</li>
<li><strong>20kg Nutzlast</strong> - Bewältigt Haushaltsaufgaben mühelos</li>
<li><strong>Tesla Neural Network</strong> - Gleiche KI wie Full Self-Driving</li>
</ul>

<p><em>🛡️ EuroBot Hub Empfehlung: Exzellente Technologie, aber erwägen Sie EU-zertifizierte Alternativen wie Neura 4NE-1.</em></p>`
      }
    }
  },

  // ───────────────────────────────────────────────────────
  // 2. NEURA 4NE-1 (EU FLAGSHIP)
  // ───────────────────────────────────────────────────────
  {
    base: {
      brand: 'Neura Robotics',
      price_eur: 28500,
      robot_height_cm: 175,
      affiliate_link: 'https://neurarobotics.com/4ne',
      image: '/images/f0327448-humanoid-envato-elements-pic-25325.webp',
      gallery: ['/images/f0327448-humanoid-envato-elements-pic-25325.webp', '/images/4202182c2a0ff23c85ccfee3ad7789927605abba-2480x1460.avif', '/images/pobrane.webp'],
      specs_table: { dof: 28, battery_kwh: 2.1, payload_kg: 15, speed_ms: 1.2, runtime_hours: 6, charge_time_hours: 2 },
      smart_home_matrix: { alexa: 'full', google_home: 'partial', homekit: 'none' },
      legal_compliance: { ce_certified: true, gdpr_compliant: true, ai_act_status: 'Pre-certified (2026 Ready)' }
    },
    locales: {
      en: {
        name: 'Neura 4NE-1 Personal Assistant',
        slug: 'neura-4ne1-personal-assistant',
        description_short: '🇪🇺 German engineering with EU-first privacy. Full GDPR compliance, local data processing, CE certified. The gold standard for European homes.',
        description_full: `<h1>Neura 4NE-1: Where German Precision Meets European Privacy Standards</h1>
<p><strong>€28,500</strong> | 175cm | 28 DoF | ✅ CE Certified | ✅ GDPR Compliant</p>

<h2>✅ EU-First Security & GDPR</h2>
<h3>Complete Data Sovereignty</h3>
<p>Unlike American or Asian alternatives, the 4NE-1 processes <strong>all data locally</strong> within your home network. Zero cloud dependency = zero data exposure.</p>

<ul>
<li>🔒 <strong>On-premise AI processing</strong> - No cloud required</li>
<li>🔐 <strong>AES-256 encryption</strong> - User-controlled keys</li>
<li>✅ <strong>CE certified</strong> - EU electrical & privacy standards</li>
<li>🇩🇪 <strong>German TÜV safety cert</strong></li>
<li>📞 <strong>24/7 European support</strong> - German, English, Polish</li>
</ul>

<h3>GDPR Built-In (Article 28 Compliant)</h3>
<ul>
<li>Right to deletion (Article 17)</li>
<li>Data portability (Article 20)</li>
<li>Transparent processing (Article 13)</li>
<li>No third-party sharing without consent</li>
</ul>

<h2>Practical Home Assistance</h2>
<ul>
<li>🏠 <strong>Household management</strong> - Cleaning, organization, laundry</li>
<li>👴 <strong>Elder care support</strong> - Medication reminders, fall detection</li>
<li>🏡 <strong>Smart home integration</strong> - Full Alexa, partial Google Home</li>
<li>⚡ <strong>6h runtime</strong> - Quick 2h charging</li>
<li>📦 <strong>15kg payload</strong> - Grocery assistance</li>
</ul>

<h2>Premium Package</h2>
<ul>
<li>Neura 4NE-1 humanoid (fully assembled)</li>
<li>EU charging station (Type C/F)</li>
<li>Premium maintenance kit</li>
<li>2-year warranty + EU support</li>
<li>Multilingual guide (EN/DE/PL/FR)</li>
<li>GDPR compliance docs + DPA</li>
</ul>

<p><em>🛡️ EuroBot Hub Verified: Pre-certified for EU AI Act 2026 compliance.</em></p>`
      },
      pl: {
        name: 'Neura 4NE-1 Asystent Osobisty',
        slug: 'neura-4ne1-asystent-osobisty',
        description_short: '🇪🇺 Niemiecka inżynieria z priorytetem prywatności UE. Pełna zgodność RODO, lokalne przetwarzanie, certyfikat CE. Złoty standard dla europejskich domów.',
        description_full: `<h1>Neura 4NE-1: Niemiecka Precyzja Spotyka Europejskie Standardy Prywatności</h1>
<p><strong>123 500 PLN</strong> | 175cm | 28 Stopni Swobody | ✅ CE | ✅ RODO</p>

<h2>✅ Bezpieczeństwo EU-First i RODO</h2>
<h3>Kompletna Suwerenność Danych</h3>
<p>W przeciwieństwie do amerykańskich czy azjatyckich alternatyw, 4NE-1 przetwarza <strong>wszystkie dane lokalnie</strong> w Twojej sieci domowej.</p>

<ul>
<li>🔒 <strong>Przetwarzanie AI na miejscu</strong> - Bez wymogu chmury</li>
<li>🔐 <strong>Szyfrowanie AES-256</strong> - Klucze kontrolowane przez użytkownika</li>
<li>✅ <strong>Certyfikat CE</strong> - Standardy elektryczne i prywatności UE</li>
<li>🇩🇪 <strong>Certyfikacja TÜV</strong></li>
<li>📞 <strong>Wsparcie 24/7 w Europie</strong> - Niemiecki, angielski, polski</li>
</ul>

<h2>Praktyczna Pomoc Domowa</h2>
<ul>
<li>🏠 <strong>Zarządzanie gospodarstwem</strong> - Sprzątanie, organizacja, pranie</li>
<li>👴 <strong>Wsparcie osób starszych</strong> - Przypomnienia o lekach, detekcja upadków</li>
<li>🏡 <strong>Integracja smart home</strong> - Pełna kompatybilność Alexa</li>
<li>⚡ <strong>6h pracy</strong> - Szybkie 2h ładowanie</li>
<li>📦 <strong>Udźwig 15kg</strong> - Pomoc przy zakupach</li>
</ul>

<p><em>🛡️ Zweryfikowane przez EuroBot Hub: Pre-certyfikowany na zgodność EU AI Act 2026.</em></p>`
      },
      de: {
        name: 'Neura 4NE-1 Persönlicher Assistent',
        slug: 'neura-4ne1-personlicher-assistent',
        description_short: '🇪🇺 Deutsche Ingenieurskunst mit EU-Datenschutz-Priorität. Volle DSGVO-Konformität, lokale Verarbeitung, CE-zertifiziert. Der Goldstandard für Europa.',
        description_full: `<h1>Neura 4NE-1: Deutsche Präzision Trifft Europäische Datenschutzstandards</h1>
<p><strong>€28.500</strong> | 175cm | 28 Freiheitsgrade | ✅ CE | ✅ DSGVO</p>

<h2>✅ EU-First Sicherheit & DSGVO</h2>
<p>Der 4NE-1 verarbeitet <strong>alle Daten lokal</strong> in Ihrem Heimnetzwerk. Keine Cloud-Abhängigkeit.</p>

<ul>
<li>🔒 <strong>Lokale KI-Verarbeitung</strong></li>
<li>🔐 <strong>AES-256 Verschlüsselung</strong></li>
<li>✅ <strong>CE-zertifiziert</strong></li>
<li>🇩🇪 <strong>TÜV-Sicherheitszertifizierung</strong></li>
<li>📞 <strong>24/7 Support</strong> - Deutsch, Englisch, Polnisch</li>
</ul>

<p><em>🛡️ EuroBot Hub Geprüft: Vorzertifiziert für EU AI Act 2026.</em></p>`
      }
    }
  },

  // ───────────────────────────────────────────────────────
  // 3. UNITREE H1
  // ───────────────────────────────────────────────────────
  {
    base: {
      brand: 'Unitree Robotics',
      price_eur: 90000,
      robot_height_cm: 180,
      affiliate_link: 'https://unitree.com/h1',
      image: '/images/csm_Unitree_G1c_ab5b99757c.jpg',
      gallery: ['/images/csm_Unitree_G1c_ab5b99757c.jpg', '/images/unitree-g1-humanoid-robot-gets-upgraded-learns-kung-fu-moves-v0-h6CACOy6nKRRvIossY54emwdMDonboSkEA8Tt_9NPHA.webp', '/images/pobrane (1).webp'],
      specs_table: { dof: 25, battery_kwh: 0.9, payload_kg: 30, speed_ms: 3.3, runtime_hours: 4, charge_time_hours: 2 },
      smart_home_matrix: { alexa: 'none', google_home: 'none', homekit: 'none' },
      legal_compliance: { ce_certified: false, gdpr_compliant: false, ai_act_status: 'Not Certified - Chinese Product' }
    },
    locales: {
      en: {
        name: 'Unitree H1 Dynamic Robot',
        slug: 'unitree-h1-dynamic-robot',
        description_short: 'Fastest humanoid on market (3.3 m/s). Extreme agility, 30kg payload. Research/industrial focus - limited home suitability.',
        description_full: `<h1>Unitree H1: Speed Demon of Humanoid Robotics</h1>
<p><strong>€90,000</strong> | 180cm | 25 DoF | <strong>3.3 m/s Speed</strong> (World's Fastest)</p>

<h2>⚡ Extreme Performance</h2>
<ul>
<li>🏃 <strong>3.3 m/s running speed</strong> - Unprecedented agility</li>
<li>💪 <strong>30kg payload capacity</strong> - Industrial-grade strength</li>
<li>🎯 <strong>Dynamic balancing</strong> - Advanced locomotion algorithms</li>
<li>🔬 <strong>Research platform</strong> - Open SDK for custom applications</li>
</ul>

<h2>⚠️ European Market Considerations</h2>
<p><strong>Target Audience:</strong> Research labs, universities, industrial R&D - NOT home users.</p>
<ul>
<li>❌ No GDPR compliance (Chinese data processing)</li>
<li>❌ No CE certification</li>
<li>❌ No smart home integration (Alexa/Google/HomeKit)</li>
<li>⚠️ Short 4h runtime (optimized for speed, not endurance)</li>
<li>⚠️ No EU support network</li>
</ul>

<h2>Best Use Cases</h2>
<ul>
<li>University robotics research</li>
<li>Industrial automation testing</li>
<li>Advanced locomotion studies</li>
<li>Custom platform development</li>
</ul>

<p><em>🛡️ EuroBot Hub Note: Exceptional technology for professionals. Home users should consider Neura 4NE-1 or Figure 02.</em></p>`
      },
      pl: {
        name: 'Unitree H1 Robot Dynamiczny',
        slug: 'unitree-h1-robot-dynamiczny',
        description_short: 'Najszybszy humanoid na rynku (3.3 m/s). Ekstremalna zwinność, udźwig 30kg. Fokus badawczy/przemysłowy - ograniczona przydatność domowa.',
        description_full: `<h1>Unitree H1: Demon Prędkości w Robotyce Humanoidalnej</h1>
<p><strong>390 000 PLN</strong> | 180cm | 25 Stopni Swobody | <strong>3.3 m/s</strong> (Najszybszy na świecie)</p>

<h2>⚡ Ekstremalna Wydajność</h2>
<ul>
<li>🏃 <strong>Prędkość biegu 3.3 m/s</strong> - Bezprecedensowa zwinność</li>
<li>💪 <strong>Udźwig 30kg</strong> - Przemysłowa wytrzymałość</li>
<li>🎯 <strong>Dynamiczne balansowanie</strong> - Zaawansowane algorytmy lokomocji</li>
<li>🔬 <strong>Platforma badawcza</strong> - Otwarty SDK</li>
</ul>

<h2>⚠️ Uwagi dla Rynku Europejskiego</h2>
<p><strong>Grupa docelowa:</strong> Laboratoria badawcze, uniwersytety, przemysłowe R&D - NIE użytkownicy domowi.</p>
<ul>
<li>❌ Brak zgodności RODO (chińskie przetwarzanie danych)</li>
<li>❌ Brak certyfikatu CE</li>
<li>❌ Brak integracji smart home</li>
<li>⚠️ Krótki czas pracy 4h</li>
</ul>

<p><em>🛡️ Uwaga EuroBot Hub: Wyjątkowa technologia dla profesjonalistów. Użytkownicy domowi: Neura 4NE-1 lub Figure 02.</em></p>`
      },
      de: {
        name: 'Unitree H1 Dynamischer Roboter',
        slug: 'unitree-h1-dynamischer-roboter',
        description_short: 'Schnellster Humanoide am Markt (3.3 m/s). Extreme Agilität, 30kg Nutzlast. Forschungs-/Industriefokus - begrenzte Heimeignung.',
        description_full: `<h1>Unitree H1: Geschwindigkeitsdämon der Humanoiden Robotik</h1>
<p><strong>€90.000</strong> | 180cm | 25 Freiheitsgrade | <strong>3.3 m/s</strong> (Weltschnellster)</p>

<h2>⚡ Extreme Leistung</h2>
<ul>
<li>🏃 <strong>3.3 m/s Laufgeschwindigkeit</strong></li>
<li>💪 <strong>30kg Nutzlast</strong></li>
<li>🎯 <strong>Dynamisches Balancieren</strong></li>
</ul>

<h2>⚠️ Europäische Marktüberlegungen</h2>
<ul>
<li>❌ Keine DSGVO-Konformität</li>
<li>❌ Keine CE-Zertifizierung</li>
</ul>

<p><em>🛡️ EuroBot Hub: Für Profis. Heimanwender sollten Neura 4NE-1 erwägen.</em></p>`
      }
    }
  },

  // ───────────────────────────────────────────────────────
  // 4. 1X NEO
  // ───────────────────────────────────────────────────────
  {
    base: {
      brand: '1X Technologies',
      price_eur: 55000,
      robot_height_cm: 165,
      affiliate_link: 'https://1x.tech/neo',
      image: '/images/1x-neo-launch-humanoid-robot.jpg',
      gallery: ['/images/1x-neo-launch-humanoid-robot.jpg', '/images/NEO-Gamma_Breakfast.webp', '/images/neo3-1600x899.webp'],
      specs_table: { dof: 20, battery_kwh: 2.0, payload_kg: 15, speed_ms: 1.0, runtime_hours: 10, charge_time_hours: 4 },
      smart_home_matrix: { alexa: 'partial', google_home: 'full', homekit: 'partial' },
      legal_compliance: { ce_certified: true, gdpr_compliant: true, ai_act_status: 'Pending Certification (2026)' }
    },
    locales: {
      en: {
        name: '1X Neo Home Assistant',
        slug: '1x-neo-home-assistant',
        description_short: 'Norwegian innovation with 10h battery life. CE certified, GDPR compliant. Designed specifically for European households.',
        description_full: `<h1>1X Neo: Scandinavian Design Meets Home Automation</h1>
<p><strong>€55,000</strong> | 165cm | 20 DoF | ✅ CE Certified | <strong>10h Battery Life</strong></p>

<h2>🇳🇴 European Innovation</h2>
<p>Developed in Norway with EU privacy standards from day one. Backed by OpenAI investments but maintaining European data sovereignty.</p>

<h2>✅ EU Compliance</h2>
<ul>
<li>✅ <strong>CE certified</strong> - Full EU market approval</li>
<li>✅ <strong>GDPR compliant</strong> - Local data processing options</li>
<li>⏳ <strong>AI Act ready</strong> - Pre-certification in progress</li>
<li>🇪🇺 <strong>European support</strong> - Oslo & Berlin offices</li>
</ul>

<h2>Outstanding Battery Life</h2>
<ul>
<li>⚡ <strong>10 hours runtime</strong> - Longest in class</li>
<li>🔋 <strong>2.0 kWh battery</strong> - Full day coverage</li>
<li>🔌 <strong>Standard EU charging</strong> - Type C/F plugs</li>
</ul>

<h2>Smart Home Integration</h2>
<ul>
<li>🏠 <strong>Full Google Home</strong> - Native integration</li>
<li>🔊 <strong>Partial Alexa</strong> - Voice commands supported</li>
<li>🍎 <strong>Partial HomeKit</strong> - iOS compatibility</li>
</ul>

<h2>Home Tasks</h2>
<ul>
<li>🧹 Light cleaning & organization</li>
<li>📦 Object transport (15kg payload)</li>
<li>👴 Elder care assistance</li>
<li>🔐 Home security monitoring</li>
</ul>

<p><em>🛡️ EuroBot Hub Verified: Best battery life on market. Ideal for large homes requiring all-day autonomy.</em></p>`
      },
      pl: {
        name: '1X Neo Asystent Domowy',
        slug: '1x-neo-asystent-domowy',
        description_short: 'Norweska innowacja z 10h czasem pracy. Certyfikat CE, zgodność RODO. Zaprojektowany specjalnie dla europejskich gospodarstw domowych.',
        description_full: `<h1>1X Neo: Skandynawski Design Spotyka Automatykę Domową</h1>
<p><strong>238 500 PLN</strong> | 165cm | 20 Stopni Swobody | ✅ CE | <strong>10h Baterii</strong></p>

<h2>🇳🇴 Europejska Innowacja</h2>
<p>Rozwijany w Norwegii z europejskimi standardami prywatności od pierwszego dnia. Wspierany przez inwestycje OpenAI, ale zachowujący europejską suwerenność danych.</p>

<h2>✅ Zgodność z UE</h2>
<ul>
<li>✅ <strong>Certyfikat CE</strong> - Pełne zatwierdzenie na rynek UE</li>
<li>✅ <strong>Zgodność RODO</strong> - Opcje lokalnego przetwarzania danych</li>
<li>⏳ <strong>Gotowy na AI Act</strong> - Pre-certyfikacja w toku</li>
<li>🇪🇺 <strong>Wsparcie europejskie</strong> - Biura w Oslo i Berlinie</li>
</ul>

<h2>Wybitna Żywotność Baterii</h2>
<ul>
<li>⚡ <strong>10 godzin pracy</strong> - Najdłuższy w klasie</li>
<li>🔋 <strong>Bateria 2.0 kWh</strong> - Pokrycie całego dnia</li>
<li>🔌 <strong>Standardowe ładowanie EU</strong> - Wtyczki Type C/F</li>
</ul>

<h2>Integracja Smart Home</h2>
<ul>
<li>🏠 <strong>Pełne Google Home</strong> - Natywna integracja</li>
<li>🔊 <strong>Częściowe Alexa</strong> - Obsługa komend głosowych</li>
<li>🍎 <strong>Częściowe HomeKit</strong> - Kompatybilność iOS</li>
</ul>

<p><em>🛡️ Zweryfikowane przez EuroBot Hub: Najlepszy czas pracy na baterii. Idealny dla dużych domów wymagających całodziennej autonomii.</em></p>`
      },
      de: {
        name: '1X Neo Hausassistent',
        slug: '1x-neo-hausassistent',
        description_short: 'Norwegische Innovation mit 10h Akkulaufzeit. CE-zertifiziert, DSGVO-konform. Speziell für europäische Haushalte entwickelt.',
        description_full: `<h1>1X Neo: Skandinavisches Design Trifft Hausautomation</h1>
<p><strong>€55.000</strong> | 165cm | 20 Freiheitsgrade | ✅ CE | <strong>10h Akku</strong></p>

<h2>🇳🇴 Europäische Innovation</h2>
<p>In Norwegen entwickelt mit EU-Datenschutzstandards von Tag eins.</p>

<h2>✅ EU-Konformität</h2>
<ul>
<li>✅ <strong>CE-zertifiziert</strong></li>
<li>✅ <strong>DSGVO-konform</strong></li>
<li>🇪🇺 <strong>Europäischer Support</strong> - Oslo & Berlin</li>
</ul>

<h2>Herausragende Akkulaufzeit</h2>
<ul>
<li>⚡ <strong>10 Stunden Laufzeit</strong> - Klassenführend</li>
<li>🔋 <strong>2.0 kWh Batterie</strong></li>
</ul>

<p><em>🛡️ EuroBot Hub: Beste Akkulaufzeit am Markt.</em></p>`
      }
    }
  },

  // ───────────────────────────────────────────────────────
  // 5. FIGURE 02
  // ───────────────────────────────────────────────────────
  {
    base: {
      brand: 'Figure AI',
      price_eur: 35000,
      robot_height_cm: 170,
      affiliate_link: 'https://figure.ai',
      image: '/images/Figure-03-humanoid-robots-Figure-AI-07.webp',
      gallery: ['/images/Figure-03-humanoid-robots-Figure-AI-07.webp', '/images/figure-ai-dishwasher-1.jpg', '/images/Figure-03-2023-04-770x433.webp'],
      specs_table: { dof: 24, battery_kwh: 1.8, payload_kg: 20, speed_ms: 1.2, runtime_hours: 5, charge_time_hours: 2 },
      smart_home_matrix: { alexa: 'none', google_home: 'partial', homekit: 'none' },
      legal_compliance: { ce_certified: false, gdpr_compliant: false, ai_act_status: 'Not Certified - US Product' }
    },
    locales: {
      en: {
        name: 'Figure 02 General Purpose Robot',
        slug: 'figure-02-general-purpose-robot',
        description_short: 'US innovation with OpenAI-powered vision. Impressive dexterity. GDPR/AI Act compliance pending - consider for tech enthusiasts.',
        description_full: `<h1>Figure 02: OpenAI Vision Meets Robotics</h1>
<p><strong>€35,000</strong> | 170cm | 24 DoF | OpenAI Integration</p>

<h2>🤖 Advanced AI Capabilities</h2>
<ul>
<li>👁️ <strong>OpenAI vision system</strong> - GPT-powered scene understanding</li>
<li>✋ <strong>Advanced dexterity</strong> - Fine motor control for delicate tasks</li>
<li>🧠 <strong>Natural language</strong> - Conversational task instructions</li>
<li>🔧 <strong>General purpose</strong> - Adaptable to multiple scenarios</li>
</ul>

<h2>⚠️ European Market Status</h2>
<p><strong>Current Status:</strong> Pre-production beta units. EU certification pending.</p>
<ul>
<li>❌ No GDPR compliance (US cloud processing)</li>
<li>❌ No CE certification</li>
<li>⚠️ Limited smart home integration</li>
<li>⏳ AI Act compliance timeline unclear</li>
<li>🇺🇸 US-based support only</li>
</ul>

<h2>Best For</h2>
<ul>
<li>Early adopters & tech enthusiasts</li>
<li>Research institutions</li>
<li>Pilot programs & testing</li>
<li>Non-privacy-critical environments</li>
</ul>

<h2>Technical Highlights</h2>
<ul>
<li>24 degrees of freedom</li>
<li>20kg payload capacity</li>
<li>5-hour runtime</li>
<li>Quick 2-hour charging</li>
</ul>

<p><em>🛡️ EuroBot Hub Note: Cutting-edge AI but regulatory uncertainty. EU buyers prioritizing compliance should choose Neura 4NE-1 or 1X Neo.</em></p>`
      },
      pl: {
        name: 'Figure 02 Robot Ogólnego Przeznaczenia',
        slug: 'figure-02-robot-ogolnego-przeznaczenia',
        description_short: 'Amerykańska innowacja z wizją OpenAI. Imponująca zręczność. Zgodność RODO/AI Act oczekująca - rozważ dla entuzjastów technologii.',
        description_full: `<h1>Figure 02: Wizja OpenAI Spotyka Robotykę</h1>
<p><strong>151 500 PLN</strong> | 170cm | 24 Stopnie Swobody | Integracja OpenAI</p>

<h2>🤖 Zaawansowane Możliwości AI</h2>
<ul>
<li>👁️ <strong>System wizji OpenAI</strong> - Rozumienie scen przez GPT</li>
<li>✋ <strong>Zaawansowana zręczność</strong> - Precyzyjna kontrola motoryczna</li>
<li>🧠 <strong>Język naturalny</strong> - Konwersacyjne instrukcje zadań</li>
<li>🔧 <strong>Ogólne przeznaczenie</strong> - Adaptowalny do wielu scenariuszy</li>
</ul>

<h2>⚠️ Status na Rynku Europejskim</h2>
<p><strong>Obecny status:</strong> Jednostki beta przed produkcją. Certyfikacja UE oczekująca.</p>
<ul>
<li>❌ Brak zgodności RODO (przetwarzanie w chmurze US)</li>
<li>❌ Brak certyfikatu CE</li>
<li>⚠️ Ograniczona integracja smart home</li>
<li>⏳ Niejasny harmonogram zgodności z AI Act</li>
<li>🇺🇸 Tylko wsparcie z USA</li>
</ul>

<h2>Najlepszy Dla</h2>
<ul>
<li>Wczesnych adopatorów i entuzjastów tech</li>
<li>Instytucji badawczych</li>
<li>Programów pilotażowych i testów</li>
<li>Środowisk niekrytycznych pod względem prywatności</li>
</ul>

<p><em>🛡️ Uwaga EuroBot Hub: Najnowocześniejsza AI, ale niepewność regulacyjna. Nabywcy w UE priorytetyzujący zgodność powinni wybrać Neura 4NE-1 lub 1X Neo.</em></p>`
      },
      de: {
        name: 'Figure 02 Mehrzweckroboter',
        slug: 'figure-02-mehrzweckroboter',
        description_short: 'US-Innovation mit OpenAI-Vision. Beeindruckende Geschicklichkeit. DSGVO/AI Act Compliance ausstehend - für Tech-Enthusiasten.',
        description_full: `<h1>Figure 02: OpenAI Vision Trifft Robotik</h1>
<p><strong>€35.000</strong> | 170cm | 24 Freiheitsgrade | OpenAI Integration</p>

<h2>🤖 Fortgeschrittene KI-Fähigkeiten</h2>
<ul>
<li>👁️ <strong>OpenAI Visionssystem</strong> - GPT-gestütztes Szenenverständnis</li>
<li>✋ <strong>Fortgeschrittene Geschicklichkeit</strong></li>
<li>🧠 <strong>Natürliche Sprache</strong></li>
</ul>

<h2>⚠️ Europäischer Marktstatus</h2>
<ul>
<li>❌ Keine DSGVO-Konformität</li>
<li>❌ Keine CE-Zertifizierung</li>
</ul>

<p><em>🛡️ EuroBot Hub: Modernste KI, aber regulatorische Unsicherheit.</em></p>`
      }
    }
  },

  // ───────────────────────────────────────────────────────
  // 6. SOFTBANK PEPPER
  // ───────────────────────────────────────────────────────
  {
    base: {
      brand: 'SoftBank Robotics',
      price_eur: 18500,
      robot_height_cm: 120,
      affiliate_link: 'https://softbankrobotics.com/emea/en/pepper',
      image: '/images/SoftBank_pepper.jpg',
      gallery: ['/images/SoftBank_pepper.jpg', '/images/senior-with-robot-stockcake.jpg'],
      specs_table: { dof: 20, battery_kwh: 0.8, payload_kg: 5, speed_ms: 0.6, runtime_hours: 12, charge_time_hours: 5 },
      smart_home_matrix: { alexa: 'none', google_home: 'none', homekit: 'none' },
      legal_compliance: { ce_certified: true, gdpr_compliant: true, ai_act_status: 'Certified (Legacy Product)' }
    },
    locales: {
      en: {
        name: 'SoftBank Pepper Social Robot',
        slug: 'softbank-pepper-social-robot',
        description_short: '✅ Legacy leader with full EU certification. 12h battery, emotional AI. Perfect for elder care & customer service. Compact 120cm design.',
        description_full: `<h1>SoftBank Pepper: The Proven European Choice</h1>
<p><strong>€18,500</strong> | 120cm | 20 DoF | ✅ CE + GDPR + AI Act Certified</p>

<h2>✅ Complete EU Compliance (Market Leader)</h2>
<ul>
<li>✅ <strong>CE certified</strong> - 10+ years EU market presence</li>
<li>✅ <strong>GDPR compliant</strong> - European data centers</li>
<li>✅ <strong>AI Act certified</strong> - Legacy grandfathered status</li>
<li>🇪🇺 <strong>EU support network</strong> - Paris, London, Berlin offices</li>
<li>🏥 <strong>Medical certified</strong> - Approved for healthcare facilities</li>
</ul>

<h2>Social Interaction Specialist</h2>
<ul>
<li>😊 <strong>Emotional AI</strong> - Recognizes faces & moods</li>
<li>💬 <strong>Natural conversation</strong> - 20+ languages</li>
<li>👴 <strong>Elder care focus</strong> - Companionship & reminders</li>
<li>🏬 <strong>Customer service</strong> - Retail & hospitality proven</li>
</ul>

<h2>Outstanding Battery Life</h2>
<ul>
<li>⚡ <strong>12 hours runtime</strong> - Longest on market</li>
<li>🔋 <strong>All-day autonomy</strong> - No mid-day charging</li>
<li>♿ <strong>Compact 120cm</strong> - Non-threatening for elderly</li>
</ul>

<h2>Limitations (Transparency)</h2>
<ul>
<li>⚠️ Low payload (5kg) - Not for heavy tasks</li>
<li>⚠️ Slow speed (0.6 m/s) - Not for dynamic environments</li>
<li>⚠️ No smart home integration - Standalone system</li>
<li>📅 Legacy technology (2014 design)</li>
</ul>

<h2>Best For</h2>
<ul>
<li>🏥 Healthcare & elder care facilities</li>
<li>🏬 Retail customer service</li>
<li>🏫 Educational institutions</li>
<li>👴 Senior companionship at home</li>
</ul>

<p><em>🛡️ EuroBot Hub Verified: Most legally compliant option. Perfect for EU organizations prioritizing regulatory certainty over cutting-edge tech.</em></p>`
      },
      pl: {
        name: 'SoftBank Pepper Robot Społeczny',
        slug: 'softbank-pepper-robot-spoleczny',
        description_short: '✅ Lider legacy z pełną certyfikacją UE. Bateria 12h, emocjonalna AI. Idealny do opieki nad seniorami i obsługi klienta. Kompaktowy design 120cm.',
        description_full: `<h1>SoftBank Pepper: Sprawdzony Europejski Wybór</h1>
<p><strong>80 200 PLN</strong> | 120cm | 20 Stopni Swobody | ✅ CE + RODO + AI Act</p>

<h2>✅ Pełna Zgodność z UE (Lider Rynku)</h2>
<ul>
<li>✅ <strong>Certyfikat CE</strong> - 10+ lat obecności na rynku UE</li>
<li>✅ <strong>Zgodność RODO</strong> - Europejskie centra danych</li>
<li>✅ <strong>Certyfikat AI Act</strong> - Status legacy</li>
<li>🇪🇺 <strong>Sieć wsparcia EU</strong> - Biura w Paryżu, Londynie, Berlinie</li>
<li>🏥 <strong>Certyfikacja medyczna</strong> - Zatwierdzony dla placówek zdrowotnych</li>
</ul>

<h2>Specjalista Interakcji Społecznych</h2>
<ul>
<li>😊 <strong>Emocjonalna AI</strong> - Rozpoznaje twarze i nastroje</li>
<li>💬 <strong>Naturalna konwersacja</strong> - 20+ języków</li>
<li>👴 <strong>Fokus na opiekę nad seniorami</strong> - Towarzystwo i przypomnienia</li>
<li>🏬 <strong>Obsługa klienta</strong> - Sprawdzony w handlu i hotelarstwie</li>
</ul>

<h2>Wybitna Żywotność Baterii</h2>
<ul>
<li>⚡ <strong>12 godzin pracy</strong> - Najdłuższy na rynku</li>
<li>🔋 <strong>Całodniowa autonomia</strong> - Bez ładowania w południe</li>
<li>♿ <strong>Kompaktowy 120cm</strong> - Niegrożący dla osób starszych</li>
</ul>

<h2>Ograniczenia (Transparentność)</h2>
<ul>
<li>⚠️ Niski udźwig (5kg) - Nie do ciężkich zadań</li>
<li>⚠️ Niska prędkość (0.6 m/s)</li>
<li>⚠️ Brak integracji smart home</li>
<li>📅 Technologia legacy (projekt 2014)</li>
</ul>

<h2>Najlepszy Dla</h2>
<ul>
<li>🏥 Placówki zdrowotne i opieki nad seniorami</li>
<li>🏬 Obsługa klienta w handlu</li>
<li>🏫 Instytucje edukacyjne</li>
<li>👴 Towarzystwo seniorów w domu</li>
</ul>

<p><em>🛡️ Zweryfikowane przez EuroBot Hub: Najbardziej zgodna prawnie opcja. Idealna dla organizacji UE priorytetyzujących pewność regulacyjną ponad najnowszą technologię.</em></p>`
      },
      de: {
        name: 'SoftBank Pepper Sozialer Roboter',
        slug: 'softbank-pepper-sozialer-roboter',
        description_short: '✅ Legacy-Marktführer mit voller EU-Zertifizierung. 12h Akku, emotionale KI. Perfekt für Altenpflege & Kundenservice. Kompaktes 120cm Design.',
        description_full: `<h1>SoftBank Pepper: Die Bewährte Europäische Wahl</h1>
<p><strong>€18.500</strong> | 120cm | 20 Freiheitsgrade | ✅ CE + DSGVO + AI Act</p>

<h2>✅ Vollständige EU-Konformität (Marktführer)</h2>
<ul>
<li>✅ <strong>CE-zertifiziert</strong> - 10+ Jahre EU-Marktpräsenz</li>
<li>✅ <strong>DSGVO-konform</strong> - Europäische Rechenzentren</li>
<li>✅ <strong>AI Act zertifiziert</strong> - Legacy-Status</li>
<li>🇪🇺 <strong>EU-Support-Netzwerk</strong> - Paris, London, Berlin</li>
</ul>

<h2>Sozialinteraktions-Spezialist</h2>
<ul>
<li>😊 <strong>Emotionale KI</strong> - Erkennt Gesichter & Stimmungen</li>
<li>💬 <strong>Natürliche Konversation</strong> - 20+ Sprachen</li>
<li>👴 <strong>Altenpflege-Fokus</strong></li>
</ul>

<h2>Herausragende Akkulaufzeit</h2>
<ul>
<li>⚡ <strong>12 Stunden Laufzeit</strong> - Marktführend</li>
<li>♿ <strong>Kompakte 120cm</strong></li>
</ul>

<p><em>🛡️ EuroBot Hub: Rechtlich sicherste Option.</em></p>`
      }
    }
  }
];

// ═══════════════════════════════════════════════════════════
// SEEDING LOGIC
// ═══════════════════════════════════════════════════════════

async function seedProduct(productData) {
  const { base, locales } = productData;
  
  console.log(`\n📦 Seeding: ${locales.en.name}`);
  console.log(`   Price: €${base.price_eur.toLocaleString()}`);
  
  const results = { en: null, pl: null, de: null };
  
  // 1. Create EN version (base locale)
  try {
    const response = await fetch(`${STRAPI_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          ...base,
          ...locales.en,
          locale: 'en',
          publishedAt: new Date().toISOString()
        }
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }
    
    const created = await response.json();
    results.en = created.data.id;
    console.log(`   ✅ EN created (ID: ${results.en})`);
    
  } catch (error) {
    console.error(`   ❌ EN failed:`, error.message);
    return results;
  }
  
  // 2. Create PL localization
  try {
    const response = await fetch(`${STRAPI_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          ...base,
          ...locales.pl,
          locale: 'pl',
          publishedAt: new Date().toISOString()
        }
      })
    });
    
    if (response.ok) {
      const created = await response.json();
      results.pl = created.data.id;
      console.log(`   ✅ PL created (ID: ${results.pl})`);
    }
  } catch (error) {
    console.log(`   ⚠️  PL skipped:`, error.message);
  }
  
  // 3. Create DE localization
  try {
    const response = await fetch(`${STRAPI_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          ...base,
          ...locales.de,
          locale: 'de',
          publishedAt: new Date().toISOString()
        }
      })
    });
    
    if (response.ok) {
      const created = await response.json();
      results.de = created.data.id;
      console.log(`   ✅ DE created (ID: ${results.de})`);
    }
  } catch (error) {
    console.log(`   ⚠️  DE skipped:`, error.message);
  }
  
  return results;
}

async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║     STARTING PRODUCTION SEEDING - 6 PRODUCTS          ║');
  console.log('╚═══════════════════════════════════════════════════════╝');
  
  const startTime = Date.now();
  const summary = [];
  
  for (const product of PRODUCTS_DATA) {
    const result = await seedProduct(product);
    summary.push({ name: product.locales.en.name, result });
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log('\n\n╔═══════════════════════════════════════════════════════╗');
  console.log('║            🎉 SEEDING COMPLETE!                       ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');
  
  console.log('📊 Summary:');
  summary.forEach((item, i) => {
    const enStatus = item.result.en ? '✅' : '❌';
    const plStatus = item.result.pl ? '✅' : '⚠️';
    const deStatus = item.result.de ? '✅' : '⚠️';
    console.log(`   ${i + 1}. ${item.name}: EN ${enStatus} | PL ${plStatus} | DE ${deStatus}`);
  });
  
  console.log(`\n⏱️  Total time: ${duration}s`);
  console.log(`\n🎯 Next steps:`);
  console.log(`   1. Visit: ${STRAPI_URL}/admin/content-manager/collection-types/api::product.product`);
  console.log(`   2. Verify all products are visible`);
  console.log(`   3. Check frontend: https://roboass.vercel.app/en/sklep`);
  console.log('');
}

main().catch(error => {
  console.error('\n❌ FATAL ERROR:', error);
  process.exit(1);
});
