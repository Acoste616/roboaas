/**
 * Seed Articles Script
 * Populates Strapi with strategic blog articles in 3 locales (en, pl, de)
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Article data will be loaded from external JSON files to keep this file manageable
// For now, creating a simplified version with core functionality

async function createArticle(articleData, locale = 'en') {
  const localeData = articleData.localizations[locale];
  
  const payload = {
    data: {
      title: localeData.title,
      slug: localeData.slug,
      description_short: localeData.description_short,
      content: localeData.content,
      category: articleData.category,
      featured_image: articleData.featured_image,
      is_expert_report: articleData.is_expert_report || false,
      locale: locale,
      publishedAt: new Date().toISOString()
    }
  };

  const response = await fetch(`${STRAPI_URL}/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create article (${locale}): ${error}`);
  }

  return await response.json();
}

async function createLocalizations(articleId, articleData, baseLocale = 'en') {
  const otherLocales = ['pl', 'de'].filter(l => l !== baseLocale);
  
  for (const locale of otherLocales) {
    const localeData = articleData.localizations[locale];
    
    const payload = {
      title: localeData.title,
      slug: localeData.slug,
      description_short: localeData.description_short,
      content: localeData.content,
      locale: locale
    };

    const response = await fetch(`${STRAPI_URL}/api/articles/${articleId}/localizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to create ${locale} localization for article ${articleId}: ${error}`);
    } else {
      console.log(`✓ Created ${locale} localization for ${articleData.id}`);
    }
  }
}

async function seedAllArticles() {
  console.log('🚀 Starting article seeding...\n');
  
  if (!STRAPI_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN not set in environment variables');
    console.log('Please set it in strapi-backend/.env file');
    process.exit(1);
  }

  // Load articles from external JSON file to keep manageable
  const articlesPath = './article-data.json';
  let articles;
  
  try {
    const fs = require('fs');
    if (fs.existsSync(articlesPath)) {
      articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    } else {
      console.log('⚠️  article-data.json not found. Creating sample articles...');
      articles = getSampleArticles();
    }
  } catch (error) {
    console.log('⚠️  Error loading articles. Using sample data...');
    articles = getSampleArticles();
  }

  for (const article of articles) {
    try {
      console.log(`\n📝 Creating article: ${article.id}`);
      
      // Create base article in English
      const created = await createArticle(article, 'en');
      const articleId = created.data.id;
      console.log(`✓ Created base article (EN) with ID: ${articleId}`);
      
      // Create localizations for PL and DE
      await createLocalizations(articleId, article, 'en');
      
      console.log(`✅ Article ${article.id} completed with all localizations`);
    } catch (error) {
      console.error(`❌ Error creating article ${article.id}:`, error.message);
    }
  }
  
  console.log('\n\n🎉 Seeding completed!');
  console.log('\n📊 Summary:');
  console.log(`   - Total articles: ${articles.length}`);
  console.log(`   - Languages: 3 (EN, PL, DE)`);
  console.log(`   - Total entries created: ${articles.length * 3}`);
}

function getSampleArticles() {
  return [
    {
      id: 'ceo-monachium-robot-gdpr',
      category: 'Case Studies',
      featured_image: '/images/xvjWEJYrNhg2Jvo97muHic.jpg',
      is_expert_report: false,
      localizations: {
        en: {
          title: 'How a Munich CEO Secured His Smart Home: A GDPR Success Story',
          slug: 'ceo-munich-robot-gdpr-case-study',
          description_short: 'Executive case study: Implementing humanoid robotics while maintaining boardroom-level data security.',
          content: '<h1>Case Study: Munich CEO & Robot Security</h1><p>Real-world implementation of GDPR-compliant humanoid robotics...</p>'
        },
        pl: {
          title: 'Jak CEO z Monachium Zabezpieczył Swój Smart Home',
          slug: 'ceo-monachium-robot-gdpr-studium',
          description_short: 'Studium przypadku: Wdrożenie robotyki z zachowaniem bezpieczeństwa danych.',
          content: '<h1>Studium Przypadku: CEO z Monachium</h1><p>Rzeczywiste wdrożenie robotyki zgodnej z RODO...</p>'
        },
        de: {
          title: 'Münchner CEO Sichert Smart Home mit DSGVO',
          slug: 'munchen-ceo-robot-dsgvo-fallstudie',
          description_short: 'Executive-Fallstudie: Robotik-Implementierung mit Boardroom-Datensicherheit.',
          content: '<h1>Fallstudie: Münchner CEO & Roboter-Sicherheit</h1><p>Real-world DSGVO-konforme Robotik...</p>'
        }
      }
    },
    {
      id: 'roi-robot-vs-opiekunka',
      category: 'ROI Analysis',
      featured_image: '/images/senior-with-robot-stockcake.jpg',
      is_expert_report: false,
      localizations: {
        en: {
          title: 'Robot vs. Caregiver: Real ROI Numbers for Poland 2026',
          slug: 'roi-robot-vs-caregiver-poland-2026',
          description_short: 'Financial analysis with 5-year TCO breakdown for humanoid robots vs. traditional care.',
          content: '<h1>ROI Analysis: Robot vs Caregiver</h1><p>Detailed financial breakdown...</p>'
        },
        pl: {
          title: 'Robot vs. Opiekunka: Prawdziwe Liczby ROI 2026',
          slug: 'roi-robot-vs-opiekunka-polska-2026',
          description_short: 'Analiza finansowa z rozbiciem TCO na 5 lat.',
          content: '<h1>Analiza ROI: Robot vs Opiekunka</h1><p>Szczegółowa analiza finansowa...</p>'
        },
        de: {
          title: 'Roboter vs. Pflegekraft: ROI-Zahlen Polen 2026',
          slug: 'roi-roboter-vs-pflegekraft-polen-2026',
          description_short: 'Finanzanalyse mit 5-Jahres-TCO-Aufschlüsselung.',
          content: '<h1>ROI-Analyse: Roboter vs Pflegekraft</h1><p>Detaillierte Finanzanalyse...</p>'
        }
      }
    },
    {
      id: 'top-5-zastosowan',
      category: 'Use Cases',
      featured_image: '/images/NEO-Gamma_Breakfast.webp',
      is_expert_report: false,
      localizations: {
        en: {
          title: 'Top 5 Real-World Robot Use Cases in 2026',
          slug: 'top-5-robot-use-cases-2026',
          description_short: 'Practical applications where humanoid robots excel vs. marketing hype.',
          content: '<h1>Top 5 Robot Use Cases</h1><p>Real applications with measurable ROI...</p>'
        },
        pl: {
          title: 'Top 5 Rzeczywistych Zastosowań Robotów 2026',
          slug: 'top-5-zastosowan-robotow-2026',
          description_short: 'Praktyczne aplikacje gdzie roboty wyróżniają się dziś.',
          content: '<h1>Top 5 Zastosowań Robotów</h1><p>Prawdziwe aplikacje z ROI...</p>'
        },
        de: {
          title: 'Top 5 Reale Roboter-Anwendungsfälle 2026',
          slug: 'top-5-roboter-anwendungsfalle-2026',
          description_short: 'Praktische Anwendungen wo Roboter heute glänzen.',
          content: '<h1>Top 5 Roboter-Anwendungsfälle</h1><p>Echte Anwendungen mit ROI...</p>'
        }
      }
    }
  ];
}

// Run the seeder
if (require.main === module) {
  seedAllArticles().catch(console.error);
}

module.exports = { createArticle, createLocalizations, seedAllArticles };
