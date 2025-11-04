/**
 * Update existing articles with featured images and missing fields
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

const STRAPI_URL = process.env.STRAPI_URL || 'https://eurobot-hub-strapi.onrender.com';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_URL || process.env.STRAPI_API_TOKEN || '';

// Article updates with images
const ARTICLE_UPDATES = [
  {
    id: 1, // CEO Munich PL
    featured_image: '/images/xvjWEJYrNhg2Jvo97muHic.jpg',
    description_short: 'Analiza procesu decyzyjnego niemieckiego CEO przy wyborze robota humanoidalnego. Pełna zgodność RODO, security audit i rezultaty po 6 miesiącach.',
    category: 'Case Studies',
    is_expert_report: false
  },
  {
    id: 2, // CEO Munich EN
    featured_image: '/images/xvjWEJYrNhg2Jvo97muHic.jpg',
    description_short: 'Analysis of decision-making process of a German CEO choosing a humanoid robot. Full GDPR compliance, security audit, and 6-month results.',
    category: 'Case Studies',
    is_expert_report: false
  },
  {
    id: 3, // ROI Analysis PL
    featured_image: '/images/senior-with-robot-stockcake.jpg',
    description_short: 'TCO analysis 5 lat: robot vs. opiekun. Breakeven 10.8 mies., oszczędności 513,495 PLN (87%). Ukryte koszty, dotacje, realny ROI.',
    category: 'ROI Analysis',
    is_expert_report: true
  },
  {
    id: 4, // ROI Analysis EN
    featured_image: '/images/senior-with-robot-stockcake.jpg',
    description_short: '5-year TCO analysis: robot vs. caregiver. Breakeven 10.8 months, savings €128,383 (87%). Hidden costs, subsidies, real ROI.',
    category: 'ROI Analysis',
    is_expert_report: true
  },
  {
    id: 5, // Top 5 Use Cases PL
    featured_image: '/images/NEO-Gamma_Breakfast.webp',
    description_short: '5 zwalidowanych use casów z realnych wdrożeń EU 2025-2026: senior monitoring, medication compliance, smart home, infant care, executive office. ROI + GDPR.',
    category: 'Use Cases',
    is_expert_report: false
  },
  {
    id: 6, // Top 5 Use Cases EN
    featured_image: '/images/NEO-Gamma_Breakfast.webp',
    description_short: '5 validated use cases from real EU deployments 2025-2026: senior monitoring, medication compliance, smart home, infant care, executive office. ROI + GDPR.',
    category: 'Use Cases',
    is_expert_report: false
  }
];

async function updateArticle(articleId, updateData) {
  const payload = {
    data: updateData
  };

  console.log(`\n📝 Updating article ID ${articleId}...`);

  try {
    const response = await fetch(`${STRAPI_URL}/api/articles/${articleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Status: ${response.status}`);
      console.error(`❌ Error: ${errorText}`);
      throw new Error(`Failed to update article: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Updated successfully`);
    return result;
    
  } catch (error) {
    console.error(`❌ Error updating article ${articleId}:`, error.message);
    throw error;
  }
}

async function updateAllArticles() {
  console.log('🚀 Starting article updates...\n');
  
  if (!STRAPI_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN not set');
    process.exit(1);
  }

  console.log('✅ Token found');
  console.log('📡 Connecting to:', STRAPI_URL);

  let successCount = 0;
  let failCount = 0;

  for (const update of ARTICLE_UPDATES) {
    try {
      const { id, ...updateData } = update;
      await updateArticle(id, updateData);
      successCount++;
    } catch (error) {
      failCount++;
    }
  }
  
  console.log('\n\n🎉 Updates completed!');
  console.log('\n📊 Summary:');
  console.log(`   ✅ Success: ${successCount} articles`);
  console.log(`   ❌ Failed: ${failCount} articles`);
}

updateAllArticles().catch(console.error);
