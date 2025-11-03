/**
 * Seed Products Script
 * Populates Strapi with 5 premium humanoid robot products in 3 locales (en, pl, de)
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Image mapping to existing files in public/images
const IMAGE_MAPPING = {
  'neura-4ne1': {
    main: '/images/neura-robot-ironing.webp',
    gallery: [
      '/images/neura-robot-ironing.webp',
      '/images/4202182c2a0ff23c85ccfee3ad7789927605abba-2480x1460.avif',
      '/images/pobrane.webp'
    ]
  },
  'unitree-h1': {
    main: '/images/unitree-h1-humanoid-robot-release.jpg',
    gallery: [
      '/images/unitree-h1-humanoid-robot-release.jpg',
      '/images/Figure-03-2023-04-770x433.webp',
      '/images/Figure-03-humanoid-robots-Figure-AI-07.webp'
    ]
  },
  '1x-neo': {
    main: '/images/senior-with-robot-stockcake.jpg',
    gallery: [
      '/images/senior-with-robot-stockcake.jpg',
      '/images/NEO-Gamma_Breakfast.webp',
      '/images/00HUMANOID-VIDEO-kitchen-video-cover-square640.jpg'
    ]
  },
  'eurobot-guardian': {
    main: '/images/xvjWEJYrNhg2Jvo97muHic.jpg',
    gallery: [
      '/images/xvjWEJYrNhg2Jvo97muHic.jpg',
      '/images/im-53023344.avif',
      '/images/f0327448-humanoid-envato-elements-pic-25325.webp'
    ]
  },
  'unitree-g2': {
    main: '/images/1657226851920.webp',
    gallery: [
      '/images/1657226851920.webp',
      '/images/00HUMANOID-VIDEO-kitchen-video-cover-square640.jpg',
      '/images/NEO-Gamma_Breakfast.webp'
    ]
  }
};

const PRODUCTS = [
  // PRODUCT 1: Neura 4NE-1
  {
    id: 'neura-4ne1',
    brand: 'Neura Robotics',
    robot_height_cm: 175,
    price_eur: 28500,
    affiliate_link: '/producenci/neura/4ne-1',
    specs_table: {
      dof: 28,
      battery_kwh: 2.1,
      payload_kg: 15,
      runtime_hours: 6,
      charge_time_hours: 2,
      warranty_years: 2
    },
    smart_home_matrix: {
      alexa: 'full',
      google_home: 'partial',
      homekit: 'none'
    },
    legal_compliance: {
      ce_certified: true,
      gdpr_compliant: true,
      ai_act_status: 'Pending Certification (2026)'
    },
    localizations: {
      en: {
        name: 'Neura 4NE-1 Personal Assistant',
        slug: 'neura-4ne1-personal-assistant',
        description_short: 'German-engineered humanoid robot with EU-first privacy. GDPR-compliant AI for discerning European homes. Premium domestic assistance redefined.',
        description_full: `# Neura 4NE-1: Where German Precision Meets European Privacy Standards

The **Neura 4NE-1** represents the pinnacle of European robotics engineering—a humanoid assistant designed exclusively for privacy-conscious homeowners who refuse to compromise on data security.

## EU-First Security & GDPR

Unlike Asian or American alternatives, the Neura 4NE-1 processes **all data locally** within your home network. Zero cloud dependency means zero data exposure. Full GDPR compliance isn't an afterthought—it's engineered into every sensor and algorithm.

- **On-premise AI processing** (no cloud required)
- **Encrypted local storage** with user-controlled access
- **CE certified** for EU electrical and privacy standards
- **German TÜV safety certification**
- **24/7 European technical support** (German, English, Polish)

## Practical Home Assistance

With 28 degrees of freedom and advanced tactile sensors, the 4NE-1 handles delicate tasks with confidence:

- **Household management:** Light cleaning, object organization, laundry sorting
- **Elder care support:** Medication reminders, fall detection, emergency alerts
- **Smart home integration:** Full Alexa compatibility, partial Google Home support
- **6-hour runtime** with rapid 2-hour charging
- **15kg payload capacity** for grocery assistance

## What's in the Box?

- Neura 4NE-1 humanoid robot (fully assembled)
- EU charging station with Type C/F plug
- Premium microfiber maintenance kit
- 2-year manufacturer warranty + extended EU support
- Multilingual quick-start guide (EN/DE/PL/FR)
- GDPR compliance documentation and data processing agreement`
      },
      pl: {
        name: 'Neura 4NE-1 Asystent Osobisty',
        slug: 'neura-4ne1-asystent-osobisty',
        description_short: 'Robot humanoidalny z niemiecką inżynierią i priorytetem prywatności UE. Zgodność z RODO. Premium pomoc domowa dla wymagających.',
        description_full: `# Neura 4NE-1: Niemiecka Precyzja Spotyka Europejskie Standardy Prywatności

**Neura 4NE-1** to szczyt europejskiej inżynierii robotycznej—humanoidalny asystent zaprojektowany wyłącznie dla właścicieli domów ceniących prywatność, którzy nie akceptują kompromisów w kwestii bezpieczeństwa danych.

## Bezpieczeństwo EU-First i RODO

W przeciwieństwie do azjatyckich czy amerykańskich alternatyw, Neura 4NE-1 przetwarza **wszystkie dane lokalnie** w Twojej sieci domowej. Zero zależności od chmury oznacza zero wycieku danych. Pełna zgodność z RODO nie jest dodatkiem—jest wbudowana w każdy czujnik i algorytm.

- **Przetwarzanie AI na miejscu** (bez wymogu chmury)
- **Zaszyfrowana pamięć lokalna** z kontrolą użytkownika
- **Certyfikat CE** dla standardów elektrycznych i prywatności UE
- **Niemiecka certyfikacja bezpieczeństwa TÜV**
- **Wsparcie techniczne 24/7 w Europie** (niemiecki, angielski, polski)

## Praktyczna Pomoc Domowa

Z 28 stopniami swobody i zaawansowanymi czujnikami dotykowymi, 4NE-1 radzi sobie z delikatnymi zadaniami z pewnością:

- **Zarządzanie gospodarstwem:** Lekkie sprzątanie, organizacja przedmiotów, sortowanie prania
- **Wsparcie osób starszych:** Przypomnienia o lekach, detekcja upadków, alerty awaryjne
- **Integracja smart home:** Pełna kompatybilność z Alexa, częściowe wsparcie Google Home
- **6 godzin pracy** z szybkim 2-godzinnym ładowaniem
- **Udźwig 15kg** do pomocy przy zakupach

## Zawartość Opakowania

- Robot humanoidalny Neura 4NE-1 (w pełni zmontowany)
- Europejska stacja ładująca z wtyczką Type C/F
- Premium zestaw do konserwacji z mikrofibry
- 2-letnia gwarancja producenta + rozszerzone wsparcie EU
- Wielojęzyczna instrukcja szybkiego startu (EN/DE/PL/FR)
- Dokumentacja zgodności RODO i umowa przetwarzania danych`
      },
      de: {
        name: 'Neura 4NE-1 Persönlicher Assistent',
        slug: 'neura-4ne1-personlicher-assistent',
        description_short: 'Deutscher humanoider Roboter mit EU-Datenschutz-Priorität. DSGVO-konforme KI für anspruchsvolle europäische Haushalte. Premium neu definiert.',
        description_full: `# Neura 4NE-1: Deutsche Präzision Trifft Europäische Datenschutzstandards

Der **Neura 4NE-1** repräsentiert den Höhepunkt europäischer Robotik-Ingenieurskunst—ein humanoider Assistent, der exklusiv für datenschutzbewusste Hausbesitzer entwickelt wurde, die bei der Datensicherheit keine Kompromisse eingehen.

## EU-First Sicherheit & DSGVO

Im Gegensatz zu asiatischen oder amerikanischen Alternativen verarbeitet der Neura 4NE-1 **alle Daten lokal** in Ihrem Heimnetzwerk. Keine Cloud-Abhängigkeit bedeutet keine Datenexposition. Volle DSGVO-Konformität ist kein nachträglicher Gedanke—sie ist in jeden Sensor und Algorithmus eingebaut.

- **Lokale KI-Verarbeitung** (keine Cloud erforderlich)
- **Verschlüsselter lokaler Speicher** mit benutzerkontrolliertem Zugriff
- **CE-zertifiziert** für EU-Elektro- und Datenschutzstandards
- **Deutsche TÜV-Sicherheitszertifizierung**
- **24/7 europäischer technischer Support** (Deutsch, Englisch, Polnisch)

## Praktische Haushaltshilfe

Mit 28 Freiheitsgraden und fortschrittlichen taktilen Sensoren bewältigt der 4NE-1 anspruchsvolle Aufgaben mit Zuversicht:

- **Haushaltsführung:** Leichte Reinigung, Objektorganisation, Wäschesortierung
- **Altenpflege-Unterstützung:** Medikamentenerinnerungen, Sturzerkennung, Notfall-Alarme
- **Smart-Home-Integration:** Volle Alexa-Kompatibilität, teilweise Google Home-Unterstützung
- **6 Stunden Laufzeit** mit schneller 2-Stunden-Ladung
- **15kg Nutzlast** für Einkaufshilfe

## Lieferumfang

- Neura 4NE-1 humanoider Roboter (vollständig montiert)
- EU-Ladestation mit Typ C/F Stecker
- Premium-Mikrofaser-Wartungsset
- 2 Jahre Herstellergarantie + erweiterter EU-Support
- Mehrsprachige Schnellstartanleitung (EN/DE/PL/FR)
- DSGVO-Konformitätsdokumentation und Datenverarbeitungsvereinbarung`
      }
    }
  },

  // PRODUCT 2: Unitree H1
  {
    id: 'unitree-h1',
    brand: 'Unitree Robotics',
    robot_height_cm: 180,
    price_eur: 18900,
    affiliate_link: '/producenci/unitree/h1',
    specs_table: {
      dof: 32,
      battery_kwh: 1.8,
      payload_kg: 20,
      runtime_hours: 6,
      charge_time_hours: 2.5,
      warranty_years: 2
    },
    smart_home_matrix: {
      alexa: 'partial',
      google_home: 'partial',
      homekit: 'none'
    },
    legal_compliance: {
      ce_certified: true,
      gdpr_compliant: true,
      ai_act_status: 'Pending Certification (2026)'
    },
    localizations: {
      en: {
        name: 'Unitree H1 Advanced Mobility',
        slug: 'unitree-h1-advanced-mobility',
        description_short: 'High-performance humanoid robot with exceptional mobility. EU-adapted with GDPR compliance. Premium agility meets European safety standards.',
        description_full: `# Unitree H1: Advanced Mobility Meets European Reliability

The **Unitree H1** delivers exceptional robotic performance at an accessible price point—engineered for homeowners who value cutting-edge technology with European regulatory compliance.

## EU-First Security & GDPR

While manufactured in Asia, the H1 has been specially adapted for European markets with **local data processing firmware** and EU-certified safety protocols. All personal data remains within your home network.

- **EU firmware update** with local data processing
- **GDPR-compliant operation modes** (cloud features optional)
- **CE certification** for European electrical standards
- **European distributor warranty** with local service centers
- **Multilingual support** available in major EU languages

## Practical Home Assistance

The H1's athletic build enables dynamic movement rarely seen in home robotics:

- **Advanced mobility:** Navigate stairs, uneven surfaces, tight spaces
- **Household tasks:** Package handling, room-to-room delivery, light organizing
- **Smart home connectivity:** Partial integration with Alexa and Google Home
- **Extended 6-hour runtime** with efficient battery management
- **20kg payload capacity** for heavier domestic tasks

## What's in the Box?

- Unitree H1 humanoid robot (pre-configured for EU)
- EU-compatible charging station (Type C/F)
- Basic maintenance toolkit
- 2-year European distributor warranty
- Quick-start guide (EN/DE/PL/FR/ES)
- GDPR compliance certificate and privacy settings manual`
      },
      pl: {
        name: 'Unitree H1 Zaawansowana Mobilność',
        slug: 'unitree-h1-zaawansowana-mobilnosc',
        description_short: 'Wysokowydajny robot humanoidalny z wyjątkową mobilnością. Adaptowany dla UE z zgodnością RODO. Premium zwinność i europejskie standardy.',
        description_full: `# Unitree H1: Zaawansowana Mobilność Spotyka Europejską Niezawodność

**Unitree H1** zapewnia wyjątkową wydajność robotyczną w przystępnej cenie—zaprojektowany dla właścicieli domów ceniących najnowocześniejszą technologię zgodną z europejskimi regulacjami.

## Bezpieczeństwo EU-First i RODO

Choć produkowany w Azji, H1 został specjalnie zaadaptowany dla rynków europejskich z **oprogramowaniem lokalnego przetwarzania danych** i certyfikowanymi protokołami bezpieczeństwa UE. Wszystkie dane osobowe pozostają w Twojej sieci domowej.

- **Aktualizacja firmware EU** z lokalnym przetwarzaniem danych
- **Tryby zgodne z RODO** (funkcje chmurowe opcjonalne)
- **Certyfikacja CE** dla europejskich standardów elektrycznych
- **Gwarancja europejskiego dystrybutora** z lokalnymi centrami serwisowymi
- **Wsparcie wielojęzyczne** w głównych językach UE

## Praktyczna Pomoc Domowa

Atletyczna budowa H1 umożliwia dynamiczny ruch rzadko spotykany w robotyce domowej:

- **Zaawansowana mobilność:** Poruszanie się po schodach, nierównych powierzchniach, ciasnych przestrzeniach
- **Zadania domowe:** Przenoszenie paczek, transport między pokojami, lekka organizacja
- **Łączność smart home:** Częściowa integracja z Alexa i Google Home
- **Wydłużony czas pracy 6 godzin** z efektywnym zarządzaniem baterią
- **Udźwig 20kg** dla cięższych zadań domowych

## Zawartość Opakowania

- Robot humanoidalny Unitree H1 (prekonfigurowany dla UE)
- Stacja ładująca kompatybilna z UE (Type C/F)
- Podstawowy zestaw narzędzi konserwacyjnych
- 2-letnia gwarancja europejskiego dystrybutora
- Instrukcja szybkiego startu (EN/DE/PL/FR/ES)
- Certyfikat zgodności RODO i instrukcja ustawień prywatności`
      },
      de: {
        name: 'Unitree H1 Fortgeschrittene Mobilität',
        slug: 'unitree-h1-fortgeschrittene-mobilitat',
        description_short: 'Hochleistungs-Humanoide mit außergewöhnlicher Beweglichkeit. EU-angepasst mit DSGVO-Konformität. Premium-Agilität trifft europäische Sicherheit.',
        description_full: `# Unitree H1: Fortgeschrittene Mobilität Trifft Europäische Zuverlässigkeit

Der **Unitree H1** bietet außergewöhnliche Roboterleistung zu einem zugänglichen Preis—entwickelt für Hausbesitzer, die modernste Technologie mit europäischer Regulierungskonformität schätzen.

## EU-First Sicherheit & DSGVO

Obwohl in Asien hergestellt, wurde der H1 speziell für europäische Märkte mit **lokaler Datenverarbeitungs-Firmware** und EU-zertifizierten Sicherheitsprotokollen angepasst. Alle persönlichen Daten bleiben in Ihrem Heimnetzwerk.

- **EU-Firmware-Update** mit lokaler Datenverarbeitung
- **DSGVO-konforme Betriebsmodi** (Cloud-Funktionen optional)
- **CE-Zertifizierung** für europäische Elektrostandards
- **Europäische Händlergarantie** mit lokalen Servicezentren
- **Mehrsprachiger Support** in den wichtigsten EU-Sprachen verfügbar

## Praktische Haushaltshilfe

Der athletische Aufbau des H1 ermöglicht dynamische Bewegungen, die in der Haushaltsrobotik selten zu sehen sind:

- **Fortgeschrittene Mobilität:** Treppen, unebene Oberflächen, enge Räume navigieren
- **Haushaltsaufgaben:** Pakethandhabung, Raum-zu-Raum-Lieferung, leichtes Organisieren
- **Smart-Home-Konnektivität:** Teilweise Integration mit Alexa und Google Home
- **Verlängerte 6-Stunden-Laufzeit** mit effizientem Batteriemanagement
- **20kg Nutzlast** für schwerere Haushaltsaufgaben

## Lieferumfang

- Unitree H1 humanoider Roboter (vorkonfiguriert für EU)
- EU-kompatible Ladestation (Typ C/F)
- Basis-Wartungs-Toolkit
- 2 Jahre europäische Händlergarantie
- Schnellstartanleitung (EN/DE/PL/FR/ES)
- DSGVO-Konformitätszertifikat und Datenschutzeinstellungen-Handbuch`
      }
    }
  },

  // PRODUCT 3: 1X Neo
  {
    id: '1x-neo',
    brand: '1X Technologies',
    robot_height_cm: 165,
    price_eur: 22400,
    affiliate_link: '/producenci/1x/neo',
    specs_table: {
      dof: 24,
      battery_kwh: 2.4,
      payload_kg: 12,
      runtime_hours: 8,
      charge_time_hours: 3,
      warranty_years: 3
    },
    smart_home_matrix: {
      alexa: 'full',
      google_home: 'full',
      homekit: 'partial'
    },
    legal_compliance: {
      ce_certified: true,
      gdpr_compliant: true,
      ai_act_status: 'Pending Certification (2026)'
    },
    localizations: {
      en: {
        name: '1X Neo Caregiver Edition',
        slug: '1x-neo-caregiver-edition',
        description_short: 'Compassionate humanoid designed for elder care and home assistance. EU-certified safety. GDPR-first architecture for family peace of mind.',
        description_full: `# 1X Neo: Redefining Compassionate Home Assistance

The **1X Neo** is purpose-built for European families seeking trusted, privacy-respecting support for elderly relatives or comprehensive household management.

## EU-First Security & GDPR

Developed with input from European healthcare privacy experts, the Neo treats personal data with medical-grade confidentiality:

- **Zero cloud dependency** for health data storage
- **Medical-grade encryption** for all sensor recordings
- **Family access controls** with granular privacy settings
- **CE medical device compliance** (Class I)
- **GDPR Art. 9 compliance** for sensitive health data
- **24/7 EU-based support** with healthcare specialists

## Practical Home Assistance

The Neo combines gentle caregiving capabilities with practical household utility:

- **Elder care:** Medication reminders, fall detection with instant alerts, companionship protocols
- **Daily assistance:** Meal preparation support, object retrieval, mobility aid
- **Health monitoring:** Optional vital signs tracking (with explicit consent)
- **Smart home mastery:** Full Alexa integration, Google Home support
- **8-hour extended runtime** for overnight monitoring
- **12kg gentle payload** optimized for delicate tasks

## What's in the Box?

- 1X Neo humanoid robot (healthcare-configured)
- EU medical-grade charging station
- Emergency alert beacon (wireless)
- Family app licenses (iOS/Android) for up to 5 users
- 3-year premium warranty with priority support
- Multilingual manual (EN/DE/PL/FR/IT)
- GDPR health data processing agreement
- Optional: Professional installation and family training session`
      },
      pl: {
        name: '1X Neo Edycja Opiekuńcza',
        slug: '1x-neo-edycja-opiekuncza',
        description_short: 'Empatyczny humanoid zaprojektowany do opieki nad seniorami i pomocy domowej. Certyfikacja EU. Architektura RODO-first dla spokoju rodziny.',
        description_full: `# 1X Neo: Redefiniując Empatyczną Pomoc Domową

**1X Neo** został stworzony specjalnie dla europejskich rodzin poszukujących zaufanego, szanującego prywatność wsparcia dla starszych krewnych lub kompleksowego zarządzania gospodarstwem domowym.

## Bezpieczeństwo EU-First i RODO

Opracowany z udziałem europejskich ekspertów od prywatności w opiece zdrowotnej, Neo traktuje dane osobowe z poufnością klasy medycznej:

- **Zero zależności od chmury** dla przechowywania danych zdrowotnych
- **Szyfrowanie klasy medycznej** dla wszystkich nagrań z czujników
- **Kontrola dostępu rodziny** z szczegółowymi ustawieniami prywatności
- **Zgodność z urządzeniami medycznymi CE** (Klasa I)
- **Zgodność z Art. 9 RODO** dla wrażliwych danych zdrowotnych
- **Wsparcie 24/7 z siedzibą w UE** ze specjalistami opieki zdrowotnej

## Praktyczna Pomoc Domowa

Neo łączy delikatne możliwości opiekuńcze z praktyczną użytecznością domową:

- **Opieka nad seniorami:** Przypomnienia o lekach, detekcja upadków z natychmiastowymi alertami, protokoły towarzyszenia
- **Codzienna pomoc:** Wsparcie przygotowania posiłków, pobieranie przedmiotów, pomoc w mobilności
- **Monitoring zdrowia:** Opcjonalne śledzenie parametrów życiowych (za wyraźną zgodą)
- **Mistrzostwo smart home:** Pełna integracja Alexa, wsparcie Google Home
- **8 godzin wydłużonego czasu pracy** dla monitoringu nocnego
- **Delikatny udźwig 12kg** zoptymalizowany dla delikatnych zadań

## Zawartość Opakowania

- Robot humanoidalny 1X Neo (konfiguracja medyczna)
- Stacja ładująca klasy medycznej UE
- Beacon alarmowy awaryjny (bezprzewodowy)
- Licencje aplikacji rodzinnej (iOS/Android) dla maks. 5 użytkowników
- 3-letnia gwarancja premium z priorytetowym wsparciem
- Instrukcja wielojęzyczna (EN/DE/PL/FR/IT)
- Umowa przetwarzania danych zdrowotnych RODO
- Opcjonalnie: Profesjonalna instalacja i sesja szkoleniowa dla rodziny`
      },
      de: {
        name: '1X Neo Pflegeausgabe',
        slug: '1x-neo-pflegeausgabe',
        description_short: 'Mitfühlender Humanoide für Altenpflege und Haushaltshilfe. EU-zertifizierte Sicherheit. DSGVO-first Architektur für Familienruhe.',
        description_full: `# 1X Neo: Mitfühlende Haushaltshilfe Neu Definiert

Der **1X Neo** ist speziell für europäische Familien entwickelt, die vertrauenswürdige, datenschutzrespektierende Unterstützung für ältere Verwandte oder umfassendes Haushaltsmanagement suchen.

## EU-First Sicherheit & DSGVO

Entwickelt unter Mitwirkung europäischer Gesundheitsdatenschutz-Experten, behandelt der Neo persönliche Daten mit medizinischer Vertraulichkeit:

- **Keine Cloud-Abhängigkeit** für Gesundheitsdatenspeicherung
- **Medizinische Verschlüsselung** für alle Sensoraufzeichnungen
- **Familienzugriffskontrollen** mit granularen Datenschutzeinstellungen
- **CE-Medizinprodukt-Konformität** (Klasse I)
- **DSGVO Art. 9 Konformität** für sensible Gesundheitsdaten
- **24/7 EU-basierter Support** mit Gesundheitsspezialisten

## Praktische Haushaltshilfe

Der Neo kombiniert sanfte Pflegefähigkeiten mit praktischem Haushaltsnutzen:

- **Altenpflege:** Medikamentenerinnerungen, Sturzerkennung mit Sofortalarm, Begleitprotokolle
- **Tägliche Hilfe:** Mahlzeitenzubereitungsunterstützung, Objektabruf, Mobilitätshilfe
- **Gesundheitsüberwachung:** Optionales Vitalzeichentracking (mit ausdrücklicher Zustimmung)
- **Smart-Home-Meisterschaft:** Volle Alexa-Integration, Google Home-Unterstützung
- **8 Stunden erweiterte Laufzeit** für Nachtüberwachung
- **12kg sanfte Nutzlast** optimiert für heikle Aufgaben

## Lieferumfang

- 1X Neo humanoider Roboter (Gesundheitskonfiguration)
- EU-medizinische Ladestation
- Notfall-Alarmgeber (drahtlos)
- Familien-App-Lizenzen (iOS/Android) für bis zu 5 Benutzer
- 3 Jahre Premium-Garantie mit Priority-Support
- Mehrsprachiges Handbuch (EN/DE/PL/FR/IT)
- DSGVO-Gesundheitsdaten-Verarbeitungsvereinbarung
- Optional: Professionelle Installation und Familienschulung`
      }
    }
  },

  // PRODUCT 4: EuroBot Guardian Mk II
  {
    id: 'eurobot-guardian',
    brand: 'EuroBot Security Systems',
    robot_height_cm: 178,
    price_eur: 32900,
    affiliate_link: '/producenci/eurobot/guardian-mk2',
    specs_table: {
      dof: 30,
      battery_kwh: 2.8,
      payload_kg: 18,
      runtime_hours: 7,
      charge_time_hours: 2,
      warranty_years: 3
    },
    smart_home_matrix: {
      alexa: 'full',
      google_home: 'full',
      homekit: 'full'
    },
    legal_compliance: {
      ce_certified: true,
      gdpr_compliant: true,
      ai_act_status: 'Fully Certified (2025)'
    },
    localizations: {
      en: {
        name: 'EuroBot Guardian Mk II Security Edition',
        slug: 'eurobot-guardian-mk2-security',
        description_short: "Europe's first data-sovereignty-focused humanoid. Military-grade GDPR compliance. Premium security for discerning HNWI. Engineered in EU, data stays in EU.",
        description_full: `# EuroBot Guardian Mk II: The European Answer to Data Sovereignty

Born from European concerns about foreign tech surveillance, the **Guardian Mk II** is the **only humanoid robot** with **100% EU-designed hardware and software**—ensuring absolute data sovereignty.

## EU-First Security & GDPR

This isn't just GDPR compliance—it's **data fortress architecture**:

- **Hardware-encrypted storage** (AES-256) manufactured in Germany
- **Open-source AI firmware** audited by independent EU cybersecurity firms
- **Physical data kill-switch** for instant privacy protection
- **EU-only cloud option** (servers in Frankfurt, Amsterdam, Warsaw)
- **Quarterly security audits** by TÜV and BSI (German Federal Office for Information Security)
- **Lifetime GDPR compliance updates** guaranteed
- **White-glove EU support** with dedicated security specialists

### Why Guardian for HNWI?

Your home contains sensitive business communications, personal health data, and family privacy. Unlike Asian/American robots with opaque data policies, the Guardian offers:

- **Contractual data guarantees** with legal recourse under EU law
- **Executive privacy mode** (disables all recording in designated rooms)
- **Visitor anonymization** (automatic face/voice blurring for guests)
- **Boardroom-grade confidentiality** for home office environments

## Practical Home Assistance

Security doesn't compromise functionality:

- **Premium home management:** Intelligent cleaning, organization, inventory tracking
- **Perimeter awareness:** Optional integration with home security systems
- **Smart home sovereignty:** Full local control (Alexa/Google optional, not required)
- **Extended 7-hour runtime** with dual battery system
- **18kg payload** for comprehensive household tasks
- **Whisper-quiet operation** (35dB) for luxury living

## What's in the Box?

- EuroBot Guardian Mk II (assembled and security-hardened in EU)
- Premium EU charging dock with surge protection
- Hardware encryption key fob (personal ownership)
- Physical data kill-switch remote
- 3-year platinum warranty + 5-year security update guarantee
- White-glove installation by certified EU technicians
- Comprehensive GDPR legal documentation package
- Executive privacy training session (2 hours, in-home)
- Multilingual concierge support (EN/DE/PL/FR/IT + 15 more languages)`
      },
      pl: {
        name: 'EuroBot Guardian Mk II Edycja Bezpieczeństwa',
        slug: 'eurobot-guardian-mk2-bezpieczenstwo',
        description_short: 'Pierwszy europejski humanoid skupiony na suwerenności danych. Zgodność RODO klasy wojskowej. Premium bezpieczeństwo dla wymagających HNWI. EU-made.',
        description_full: `# EuroBot Guardian Mk II: Europejska Odpowiedź na Suwerenność Danych

Zrodzony z europejskich obaw o nadzór zagranicznych technologii, **Guardian Mk II** to **jedyny robot humanoidalny** z **w 100% zaprojektowanym w UE sprzętem i oprogramowaniem**—zapewniający absolutną suwerenność danych.

## Bezpieczeństwo EU-First i RODO

To nie tylko zgodność z RODO—to **architektura fortecy danych**:

- **Pamięć szyfrowana sprzętowo** (AES-256) produkowana w Niemczech
- **Oprogramowanie AI open-source** audytowane przez niezależne firmy cyberbezpieczeństwa UE
- **Fizyczny przełącznik zabijania danych** dla natychmiastowej ochrony prywatności
- **Opcja chmury tylko w UE** (serwery we Frankfurcie, Amsterdamie, Warszawie)
- **Kwartalne audyty bezpieczeństwa** przez TÜV i BSI (Federalny Urząd Bezpieczeństwa Informacji Niemiec)
- **Dożywotnie aktualizacje zgodności RODO** gwarantowane
- **Wsparcie premium EU** z dedykowanymi specjalistami bezpieczeństwa

### Dlaczego Guardian dla HNWI?

Twój dom zawiera wrażliwą komunikację biznesową, osobiste dane zdrowotne i prywatność rodziny. W przeciwieństwie do robotów azjatyckich/amerykańskich z nieprzejrzystymi politykami danych, Guardian oferuje:

- **Kontraktowe gwarancje danych** z drogą prawną pod prawem UE
- **Tryb prywatności wykonawczej** (wyłącza nagrywanie w wyznaczonych pokojach)
- **Anonimizacja gości** (automatyczne rozmycie twarzy/głosu dla odwiedzających)
- **Poufność klasy sali konferencyjnej** dla środowisk domowego biura

## Praktyczna Pomoc Domowa

Bezpieczeństwo nie ogranicza funkcjonalności:

- **Premium zarządzanie domem:** Inteligentne sprzątanie, organizacja, śledzenie inwentarza
- **Świadomość obwodu:** Opcjonalna integracja z systemami bezpieczeństwa domu
- **Suwerenność smart home:** Pełna kontrola lokalna (Alexa/Google opcjonalnie, niewymagane)
- **Wydłużony 7-godzinny czas pracy** z podwójnym systemem baterii
- **Udźwig 18kg** dla kompleksowych zadań domowych
- **Szepczący tryb cichy** (35dB) dla luksusowego życia

## Zawartość Opakowania

- EuroBot Guardian Mk II (zmontowany i zabezpieczony w UE)
- Premium stacja ładująca EU z ochroną przeciwprzepięciową
- Brelok klucza szyfrowania sprzętowego (własność osobista)
- Pilot fizycznego przełącznika zabijania danych
- 3-letnia gwarancja platynowa + 5-letnia gwarancja aktualizacji bezpieczeństwa
- Instalacja premium przez certyfikowanych techników EU
- Kompleksowy pakiet dokumentacji prawnej RODO
- Sesja szkoleniowa prywatności wykonawczej (2 godz., w domu)
- Wsparcie konsjerża wielojęzycznego (EN/DE/PL/FR/IT + 15 więcej języków)`
      },
      de: {
        name: 'EuroBot Guardian Mk II Sicherheitsausgabe',
        slug: 'eurobot-guardian-mk2-sicherheit',
        description_short: 'Europas erster datensouveränitätsfokussierter Humanoide. Militärische DSGVO-Konformität. Premium-Sicherheit für anspruchsvolle HNWI. EU-gefertigt.',
        description_full: `# EuroBot Guardian Mk II: Die Europäische Antwort auf Datensouveränität

Geboren aus europäischen Bedenken über ausländische Tech-Überwachung, ist der **Guardian Mk II** der **einzige humanoide Roboter** mit **100% EU-designter Hardware und Software**—zur Gewährleistung absoluter Datensouveränität.

## EU-First Sicherheit & DSGVO

Dies ist nicht nur DSGVO-Konformität—es ist **Datenfestungs-Architektur**:

- **Hardware-verschlüsselter Speicher** (AES-256) hergestellt in Deutschland
- **Open-Source-KI-Firmware** geprüft von unabhängigen EU-Cybersicherheitsfirmen
- **Physischer Daten-Kill-Switch** für sofortigen Datenschutz
- **Nur-EU-Cloud-Option** (Server in Frankfurt, Amsterdam, Warschau)
- **Vierteljährliche Sicherheitsaudits** durch TÜV und BSI
- **Lebenslange DSGVO-Konformitäts-Updates** garantiert
- **Premium-EU-Support** mit dedizierten Sicherheitsspezialisten

### Warum Guardian für HNWI?

Ihr Zuhause enthält sensible Geschäftskommunikation, persönliche Gesundheitsdaten und Familienprivatsphäre. Im Gegensatz zu asiatischen/amerikanischen Robotern mit undurchsichtigen Datenrichtlinien bietet der Guardian:

- **Vertragliche Datengarantien** mit Rechtsweg unter EU-Recht
- **Executive-Privacy-Modus** (deaktiviert alle Aufzeichnungen in festgelegten Räumen)
- **Besucher-Anonymisierung** (automatische Gesichts-/Stimmunschärfe für Gäste)
- **Boardroom-Vertraulichkeit** für Home-Office-Umgebungen

## Praktische Haushaltshilfe

Sicherheit kompromittiert keine Funktionalität:

- **Premium-Haushaltsführung:** Intelligente Reinigung, Organisation, Bestandsverfolgung
- **Perimeter-Bewusstsein:** Optionale Integration mit Haussicherheitssystemen
- **Smart-Home-Souveränität:** Volle lokale Kontrolle (Alexa/Google optional, nicht erforderlich)
- **Erweiterte 7-Stunden-Laufzeit** mit Doppelbatteriesystem
- **18kg Nutzlast** für umfassende Haushaltsaufgaben
- **Flüsterleis Betrieb** (35dB) für Luxusleben

## Lieferumfang

- EuroBot Guardian Mk II (montiert und sicherheitsgehärtet in EU)
- Premium-EU-Ladedock mit Überspannungsschutz
- Hardware-Verschlüsselungs-Schlüsselanhänger (persönliches Eigentum)
- Physische Daten-Kill-Switch-Fernbedienung
- 3 Jahre Platin-Garantie + 5 Jahre Sicherheitsupdate-Garantie
- Premium-Installation durch zertifizierte EU-Techniker
- Umfassendes DSGVO-Rechtsdokumentationspaket
- Executive-Privacy-Schulung (2 Std., im Haus)
- Mehrsprachiger Concierge-Support (EN/DE/PL/FR/IT + 15 weitere Sprachen)`
      }
    }
  },

  // PRODUCT 5: Unitree G2 Pro
  {
    id: 'unitree-g2',
    brand: 'Unitree Robotics',
    robot_height_cm: 170,
    price_eur: 15900,
    affiliate_link: '/producenci/unitree/g2-pro',
    specs_table: {
      dof: 22,
      battery_kwh: 1.5,
      payload_kg: 10,
      runtime_hours: 5,
      charge_time_hours: 2,
      warranty_years: 2
    },
    smart_home_matrix: {
      alexa: 'partial',
      google_home: 'partial',
      homekit: 'none'
    },
    legal_compliance: {
      ce_certified: true,
      gdpr_compliant: true,
      ai_act_status: 'Pending Certification (2026)'
    },
    localizations: {
      en: {
        name: 'Unitree G2 Pro Entry Assistant',
        slug: 'unitree-g2-pro-entry-assistant',
        description_short: 'Accessible luxury robotics for European homes. GDPR-adapted smart assistant. Premium technology at entry-level investment. Perfect first humanoid.',
        description_full: `# Unitree G2 Pro: Your Gateway to Premium Home Robotics

The **G2 Pro** makes sophisticated home robotics accessible to discerning European homeowners—combining advanced AI with approachable pricing and full EU regulatory compliance.

## EU-First Security & GDPR

Adapted specifically for European privacy standards, the G2 Pro prioritizes local data processing:

- **EU privacy firmware** with mandatory local storage
- **Optional cloud features** (all disabled by default)
- **GDPR-compliant setup wizard** guides privacy choices
- **CE certified** for EU electrical and data safety
- **European warranty support** with local service network
- **Regular EU compliance updates** included

### Ideal for First-Time Robot Owners

Not ready for €30k investment? The G2 Pro offers:

- **Accessible entry point** without compromising European values
- **Intuitive multilingual interface** (20+ EU languages)
- **Gradual feature activation** (learn at your own pace)
- **Future-proof upgradeability** via software updates

## Practical Home Assistance

Compact size meets practical capability:

- **Daily household support:** Light cleaning, organization, simple meal prep assistance
- **Smart home integration:** Partial Alexa and Google Home compatibility
- **Companion features:** Reminders, schedule management, video calling support
- **5-hour runtime** suitable for targeted daily tasks
- **10kg payload** for everyday items
- **Compact footprint** ideal for European apartment living

## What's in the Box?

- Unitree G2 Pro humanoid robot (EU-configured)
- Compact EU charging base (Type C/F)
- Quick-start guide (20+ languages)
- 2-year European distributor warranty
- Mobile app access (iOS/Android)
- GDPR privacy settings manual
- Optional: Extended 3-year warranty available`
      },
      pl: {
        name: 'Unitree G2 Pro Asystent Startowy',
        slug: 'unitree-g2-pro-asystent-startowy',
        description_short: 'Dostępna luksusowa robotyka dla europejskich domów. Inteligentny asystent zaadaptowany do RODO. Premium technologia w cenie wejściowej.',
        description_full: `# Unitree G2 Pro: Twoja Brama do Premium Robotyki Domowej

**G2 Pro** czyni wyrafinowaną robotykę domową dostępną dla wymagających europejskich właścicieli domów—łącząc zaawansowaną AI z przystępną ceną i pełną zgodnością z regulacjami UE.

## Bezpieczeństwo EU-First i RODO

Zaadaptowany specjalnie do europejskich standardów prywatności, G2 Pro priorytetyzuje lokalne przetwarzanie danych:

- **Oprogramowanie prywatności EU** z obowiązkową pamięcią lokalną
- **Opcjonalne funkcje chmurowe** (wszystkie domyślnie wyłączone)
- **Kreator zgodny z RODO** prowadzi przez wybory prywatności
- **Certyfikat CE** dla bezpieczeństwa elektrycznego i danych UE
- **Europejskie wsparcie gwarancyjne** z lokalną siecią serwisową
- **Regularne aktualizacje zgodności EU** w zestawie

### Idealny dla Początkujących Właścicieli Robotów

Nie jesteś gotowy na inwestycję 30k€? G2 Pro oferuje:

- **Dostępny punkt wejścia** bez kompromisów w europejskich wartościach
- **Intuicyjny interfejs wielojęzyczny** (20+ języków UE)
- **Stopniowa aktywacja funkcji** (ucz się we własnym tempie)
- **Ulepszalność na przyszłość** przez aktualizacje oprogramowania

## Praktyczna Pomoc Domowa

Kompaktowy rozmiar spotyka praktyczną zdolność:

- **Codzienna pomoc domowa:** Lekkie sprzątanie, organizacja, pomoc przy prostym przygotowaniu posiłków
- **Integracja smart home:** Częściowa kompatybilność z Alexa i Google Home
- **Funkcje towarzysza:** Przypomnienia, zarządzanie harmonogramem, wsparcie wideorozmów
- **5 godzin pracy** odpowiednie dla ukierunkowanych codziennych zadań
- **Udźwig 10kg** dla codziennych przedmiotów
- **Kompaktowy ślad** idealny do europejskich mieszkań

## Zawartość Opakowania

- Robot humanoidalny Unitree G2 Pro (konfiguracja EU)
- Kompaktowa baza ładująca EU (Type C/F)
- Instrukcja szybkiego startu (20+ języków)
- 2-letnia gwarancja europejskiego dystrybutora
- Dostęp do aplikacji mobilnej (iOS/Android)
- Instrukcja ustawień prywatności RODO
- Opcjonalnie: Dostępna rozszerzona gwarancja 3-letnia`
      },
      de: {
        name: 'Unitree G2 Pro Einstiegsassistent',
        slug: 'unitree-g2-pro-einstiegsassistent',
        description_short: 'Zugängliche Luxus-Robotik für europäische Häuser. DSGVO-angepasster Smart-Assistent. Premium-Technologie zum Einstiegspreis.',
        description_full: `# Unitree G2 Pro: Ihr Tor zur Premium-Haushaltsrobotik

Der **G2 Pro** macht anspruchsvolle Haushaltsrobotik für anspruchsvolle europäische Hausbesitzer zugänglich—kombiniert fortschrittliche KI mit erschwinglicher Preisgestaltung und voller EU-Regulierungskonformität.

## EU-First Sicherheit & DSGVO

Speziell für europäische Datenschutzstandards angepasst, priorisiert der G2 Pro lokale Datenverarbeitung:

- **EU-Datenschutz-Firmware** mit obligatorischer lokaler Speicherung
- **Optionale Cloud-Funktionen** (alle standardmäßig deaktiviert)
- **DSGVO-konformer Setup-Assistent** führt durch Datenschutzentscheidungen
- **CE-zertifiziert** für EU-Elektro- und Datensicherheit
- **Europäischer Garantie-Support** mit lokalem Servicenetzwerk
- **Regelmäßige EU-Konformitäts-Updates** inklusive

### Ideal für Erstmalige Roboterbesitzer

Nicht bereit für 30k€ Investition? Der G2 Pro bietet:

- **Zugänglicher Einstiegspunkt** ohne Kompromisse bei europäischen Werten
- **Intuitive mehrsprachige Oberfläche** (20+ EU-Sprachen)
- **Schrittweise Funktionsaktivierung** (lernen Sie in Ihrem eigenen Tempo)
- **Zukunftssichere Aufrüstbarkeit** über Software-Updates

## Praktische Haushaltshilfe

Kompakte Größe trifft praktische Fähigkeit:

- **Tägliche Haushaltsunterstützung:** Leichte Reinigung, Organisation, einfache Mahlzeitenvorbereitung
- **Smart-Home-Integration:** Teilweise Alexa- und Google Home-Kompatibilität
- **Begleiter-Features:** Erinnerungen, Terminverwaltung, Videoanruf-Unterstützung
- **5 Stunden Laufzeit** geeignet für gezielte tägliche Aufgaben
- **10kg Nutzlast** für Alltagsgegenstände
- **Kompakte Stellfläche** ideal für europäisches Wohnungsleben

## Lieferumfang

- Unitree G2 Pro humanoider Roboter (EU-konfiguriert)
- Kompakte EU-Ladebasis (Typ C/F)
- Schnellstartanleitung (20+ Sprachen)
- 2 Jahre europäische Händlergarantie
- Mobile-App-Zugang (iOS/Android)
- DSGVO-Datenschutzeinstellungen-Handbuch
- Optional: Erweiterte 3-Jahres-Garantie verfügbar`
      }
    }
  }
];

async function createProduct(productData, locale = 'en') {
  const localeData = productData.localizations[locale];
  const images = IMAGE_MAPPING[productData.id];
  
  const payload = {
    data: {
      name: localeData.name,
      slug: localeData.slug,
      description_short: localeData.description_short,
      description_full: localeData.description_full,
      price_eur: productData.price_eur,
      brand: productData.brand,
      affiliate_link: productData.affiliate_link,
      robot_height_cm: productData.robot_height_cm,
      image: images.main,
      gallery: images.gallery,
      specs_table: productData.specs_table,
      smart_home_matrix: productData.smart_home_matrix,
      legal_compliance: productData.legal_compliance,
      locale: locale,
      publishedAt: new Date().toISOString()
    }
  };

  const response = await fetch(`${STRAPI_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create product (${locale}): ${error}`);
  }

  return await response.json();
}

async function createLocalizations(productId, productData, baseLocale = 'en') {
  const otherLocales = ['pl', 'de'].filter(l => l !== baseLocale);
  
  for (const locale of otherLocales) {
    const localeData = productData.localizations[locale];
    const images = IMAGE_MAPPING[productData.id];
    
    const payload = {
      name: localeData.name,
      slug: localeData.slug,
      description_short: localeData.description_short,
      description_full: localeData.description_full,
      image: images.main,
      gallery: images.gallery,
      locale: locale
    };

    const response = await fetch(`${STRAPI_URL}/api/products/${productId}/localizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to create ${locale} localization for product ${productId}: ${error}`);
    } else {
      console.log(`✓ Created ${locale} localization for ${productData.id}`);
    }
  }
}

async function seedAllProducts() {
  console.log('🚀 Starting product seeding...\n');
  
  if (!STRAPI_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN not set in environment variables');
    console.log('Please set it in strapi-backend/.env file');
    process.exit(1);
  }

  for (const product of PRODUCTS) {
    try {
      console.log(`\n📦 Creating product: ${product.id}`);
      
      // Create base product in English
      const created = await createProduct(product, 'en');
      const productId = created.data.id;
      console.log(`✓ Created base product (EN) with ID: ${productId}`);
      
      // Create localizations for PL and DE
      await createLocalizations(productId, product, 'en');
      
      console.log(`✅ Product ${product.id} completed with all localizations`);
    } catch (error) {
      console.error(`❌ Error creating product ${product.id}:`, error.message);
    }
  }
  
  console.log('\n\n🎉 Seeding completed!');
  console.log('\n📊 Summary:');
  console.log(`   - Total products: ${PRODUCTS.length}`);
  console.log(`   - Languages: 3 (EN, PL, DE)`);
  console.log(`   - Total entries created: ${PRODUCTS.length * 3}`);
}

// Run the seeder
seedAllProducts().catch(console.error);
