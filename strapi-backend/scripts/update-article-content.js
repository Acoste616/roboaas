/**
 * Update articles with full content from MD files
 */

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

// Extract Polish content from MD file
function extractPolishContent(mdPath) {
  const content = fs.readFileSync(mdPath, 'utf8');
  
  // Find Polish version section
  const plStart = content.indexOf('## WERSJA POLSKA (PL)');
  const enStart = content.indexOf('## WERSJA ANGIELSKA (EN)') || content.indexOf('## English Version');
  
  if (plStart === -1) {
    console.error('Could not find Polish version in:', mdPath);
    return '';
  }
  
  // Extract content between PL and EN sections
  const plContent = enStart > plStart 
    ? content.substring(plStart, enStart)
    : content.substring(plStart);
  
  // Remove the section header and clean up
  return plContent
    .replace('## WERSJA POLSKA (PL)', '')
    .replace(/^---+$/gm, '')
    .trim();
}

// Extract English content from MD file
function extractEnglishContent(mdPath) {
  const content = fs.readFileSync(mdPath, 'utf8');
  
  // Find English version section
  const enStart = content.indexOf('## WERSJA ANGIELSKA (EN)') || content.indexOf('## English Version');
  
  if (enStart === -1) {
    console.error('Could not find English version in:', mdPath);
    return '';
  }
  
  // Extract everything after EN section
  const enContent = content.substring(enStart);
  
  // Remove the section header and clean up
  return enContent
    .replace(/## WERSJA ANGIELSKA \(EN\)|## English Version/g, '')
    .replace(/^---+$/gm, '')
    .trim();
}

const ARTICLE_UPDATES = [
  {
    id: 1,
    mdFile: path.join(__dirname, '../../datatobuild/blog-article-1-ceo-munich.md'),
    language: 'pl'
  },
  {
    id: 2,
    mdFile: path.join(__dirname, '../../datatobuild/blog-article-1-ceo-munich.md'),
    language: 'en'
  },
  {
    id: 3,
    mdFile: path.join(__dirname, '../../datatobuild/blog-article-2-roi-analysis.md'),
    language: 'pl'
  },
  {
    id: 4,
    mdFile: path.join(__dirname, '../../datatobuild/blog-article-2-roi-analysis.md'),
    language: 'en'
  },
  {
    id: 5,
    mdFile: path.join(__dirname, '../../datatobuild/blog-article-3-top-5-use-cases.md'),
    language: 'pl'
  },
  {
    id: 6,
    mdFile: path.join(__dirname, '../../datatobuild/blog-article-3-top-5-use-cases.md'),
    language: 'en'
  }
];

async function updateArticleContent(articleId, mdFile, language) {
  console.log(`\n📝 Updating article ${articleId} (${language.toUpperCase()})...`);
  
  if (!fs.existsSync(mdFile)) {
    console.error(`❌ File not found: ${mdFile}`);
    return;
  }
  
  // Extract content based on language
  const content = language === 'pl' 
    ? extractPolishContent(mdFile)
    : extractEnglishContent(mdFile);
  
  if (!content) {
    console.error(`❌ Could not extract ${language} content from ${mdFile}`);
    return;
  }
  
  console.log(`   Content length: ${content.length} characters`);
  
  const payload = {
    data: {
      content: content
    }
  };

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
      throw new Error(`Failed to update: ${errorText}`);
    }

    console.log(`✅ Updated successfully`);
    
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    throw error;
  }
}

async function updateAllArticles() {
  console.log('🚀 Starting article content updates...\n');
  
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
      await updateArticleContent(update.id, update.mdFile, update.language);
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
