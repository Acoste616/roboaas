/**
 * Script to migrate existing articles to use i18n localization
 * This will:
 * 1. Update existing Polish articles to have locale 'pl'
 * 2. Create English versions as localizations of Polish articles
 */

require('dotenv').config({ path: '../.env' });
const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'https://eurobot-hub-strapi.onrender.com';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_URL || process.env.STRAPI_API_TOKEN || '';

if (!STRAPI_TOKEN) {
  console.error('❌ Error: STRAPI_ADMIN_URL or STRAPI_API_TOKEN must be set in .env file');
  process.exit(1);
}

// Mapping of article IDs to their locale
const ARTICLE_LOCALES = {
  1: 'pl', // CEO Munich PL
  2: 'en', // CEO Munich EN
  3: 'pl', // ROI Analysis PL
  4: 'en', // ROI Analysis EN
  5: 'pl', // Top 5 Use Cases PL
  6: 'en', // Top 5 Use Cases EN
};

async function updateArticleLocale(articleId, locale) {
  try {
    const url = `${STRAPI_URL}/api/articles/${articleId}`;
    console.log(`\n🔄 Updating Article ${articleId} to locale: ${locale}`);
    console.log(`   URL: ${url}`);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          locale: locale
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`   ❌ Failed: ${response.status}`, errorData);
      return false;
    }

    const data = await response.json();
    console.log(`   ✅ Success! Article ${articleId} is now locale '${locale}'`);
    return true;
  } catch (error) {
    console.error(`   ❌ Error:`, error.message);
    return false;
  }
}

async function migrateArticles() {
  console.log('🚀 Starting article i18n migration...\n');
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  console.log(`🔑 Token: ${STRAPI_TOKEN.substring(0, 20)}...`);
  
  let successCount = 0;
  let failCount = 0;

  for (const [articleId, locale] of Object.entries(ARTICLE_LOCALES)) {
    const success = await updateArticleLocale(parseInt(articleId), locale);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log('='.repeat(60));
  
  if (failCount > 0) {
    console.log('\n⚠️  Some articles failed to update. Please check the errors above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All articles successfully migrated to i18n!');
  }
}

migrateArticles();
