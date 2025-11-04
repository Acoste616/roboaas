/**
 * Seed Blog Articles Script - EuroBot Hub Blog
 * Uploads 3 professional articles with PL/EN localizations to Strapi
 */

// Load environment variables from .env file
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  });
}

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_URL || process.env.STRAPI_API_TOKEN || '';

const ARTICLES_DATA = [
  {
    id: 'ceo-munich-gdpr',
    category: 'Case Studies',
    featured_image: '/images/xvjWEJYrNhg2Jvo97muHic.jpg',
    is_expert_report: false,
    pl: {
      title: 'Case Study: Jak CEO z Monachium Zabezpieczył Smart Home Zachowując RODO',
      slug: 'ceo-munich-robot-gdpr-case-study',
      excerpt: 'Analiza procesu decyzyjnego niemieckiego CEO przy wyborze robota humanoidalnego. Pełna zgodność RODO, security audit i rezultaty po 6 miesiącach.',
      content: 'Szczegółowa case study analizy wdrożenia robota humanoidalnego w domu CEO z pełnym compliance RODO.'
    },
    en: {
      title: 'Case Study: How a Munich CEO Secured His Smart Home While Maintaining GDPR',
      slug: 'ceo-munich-robot-gdpr-case-study-en',
      excerpt: 'Analysis of decision-making process of a German CEO choosing a humanoid robot. Full GDPR compliance, security audit, and 6-month results.',
      content: 'Detailed case study of humanoid robot implementation in CEO home with full GDPR compliance.'
    }
  },
  {
    id: 'roi-analysis-poland',
    category: 'ROI Analysis',
    featured_image: '/images/senior-with-robot-stockcake.jpg',
    is_expert_report: true,
    pl: {
      title: 'Analiza ROI: Robot Humanoidalny vs. Opiekun - Realne Koszty w Polsce 2026',
      slug: 'roi-analiza-robot-vs-opiekun-polska',
      excerpt: 'TCO analysis 5 lat: robot vs. opiekun. Breakeven 10.8 mies., oszczędności 513,495 PLN (87%). Ukryte koszty, dotacje, realny ROI.',
      content: 'Kompletna analiza finansowa Total Cost of Ownership dla robota humanoidalnego vs. tradycyjnego opiekuna w Polsce.'
    },
    en: {
      title: 'ROI Analysis: Humanoid Robot vs. Caregiver - Real Costs in Poland 2026',
      slug: 'roi-analysis-robot-vs-caregiver-poland-en',
      excerpt: '5-year TCO analysis: robot vs. caregiver. Breakeven 10.8 months, savings €128,383 (87%). Hidden costs, subsidies, real ROI.',
      content: 'Complete Total Cost of Ownership financial analysis for humanoid robot vs. traditional caregiver in Poland.'
    }
  },
  {
    id: 'top-5-use-cases',
    category: 'Use Cases',
    featured_image: '/images/NEO-Gamma_Breakfast.webp',
    is_expert_report: false,
    pl: {
      title: 'Top 5 Zastosowań Robotów Humanoidalnych w Europejskich Domach (RODO-First)',
      slug: 'top-5-zastosowan-robotow-humanoidalnych-gdpr',
      excerpt: '5 zwalidowanych use casów z realnych wdrożeń EU 2025-2026: senior monitoring, medication compliance, smart home, infant care, executive office. ROI + GDPR.',
      content: 'Praktyczny przewodnik po 5 najlepiej zwalidowanych przypadkach użycia robotów humanoidalnych w europejskim kontekście RODO.'
    },
    en: {
      title: 'Top 5 Humanoid Robot Use Cases in European Homes (GDPR-First)',
      slug: 'top-5-humanoid-robot-use-cases-gdpr-en',
      excerpt: '5 validated use cases from real EU deployments 2025-2026: senior monitoring, medication compliance, smart home, infant care, executive office. ROI + GDPR.',
      content: 'Practical guide to 5 best-validated humanoid robot use cases in European GDPR context.'
    }
  }
];

async function createArticle(articleData, locale = 'pl') {
  const localeData = articleData[locale];
  
  // Complete payload with all fields
  const payload = {
    data: {
      title: localeData.title,
      slug: localeData.slug,
      content: localeData.content,
      description_short: localeData.excerpt,
      featured_image: articleData.featured_image,
      category: articleData.category,
      is_expert_report: articleData.is_expert_report || false
    }
  };

  console.log(`\n📤 Attempting to create: "${localeData.title.substring(0, 50)}..."`);

  try {
    const response = await fetch(`${STRAPI_URL}/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`\n❌ Status: ${response.status}`);
      console.error(`❌ Error: ${errorText}`);
      
      // Try to parse error for more details
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error && errorJson.error.details) {
          console.error(`❌ Details:`, JSON.stringify(errorJson.error.details, null, 2));
        }
      } catch (e) {
        // Not JSON, ignore
      }
      
      throw new Error(`Failed to create article: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Created successfully with ID: ${result.data.id}`);
    return result;
    
  } catch (error) {
    if (error.message.includes('fetch')) {
      console.error(`\n❌ Network error - is ${STRAPI_URL} accessible?`);
    }
    throw error;
  }
}

async function seedAllArticles() {
  console.log('🚀 Starting blog articles seeding...\n');
  
  if (!STRAPI_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN not set in environment variables');
    console.log('Please set it in strapi-backend/.env file');
    process.exit(1);
  }

  console.log('✅ Token found');
  console.log('📡 Connecting to:', STRAPI_URL);
  console.log('');

  let successCount = 0;
  let failCount = 0;

  for (const article of ARTICLES_DATA) {
    try {
      console.log(`\n📝 Processing: ${article.id}`);
      
      // Create Polish version
      const plResult = await createArticle(article, 'pl');
      successCount++;
      
      // Create English version as separate article (no i18n)
      const enArticle = { ...article, id: article.id + '-en' };
      const enResult = await createArticle(enArticle, 'en');
      successCount++;
      
      console.log(`✅ Both PL and EN versions created for "${article.id}"`);
    } catch (error) {
      console.error(`❌ Failed to create article ${article.id}:`, error.message);
      failCount++;
    }
  }
  
  console.log('\n\n🎉 Seeding completed!');
  console.log('\n📊 Summary:');
  console.log(`   ✅ Success: ${successCount} articles`);
  console.log(`   ❌ Failed: ${failCount} articles`);
  console.log(`   📋 Total processed: ${ARTICLES_DATA.length} article sets`);
}

seedAllArticles().catch(console.error);
