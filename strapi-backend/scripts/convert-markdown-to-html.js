/**
 * Convert Markdown content to HTML for better display
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

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

// Configure marked for better HTML output
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

// Extract Polish content from MD file
function extractPolishContent(mdPath) {
  const content = fs.readFileSync(mdPath, 'utf8');
  
  const plStart = content.indexOf('## WERSJA POLSKA (PL)');
  const enStart = content.indexOf('## WERSJA ANGIELSKA (EN)') || content.indexOf('## English Version');
  
  if (plStart === -1) {
    return '';
  }
  
  const plContent = enStart > plStart 
    ? content.substring(plStart, enStart)
    : content.substring(plStart);
  
  return plContent
    .replace('## WERSJA POLSKA (PL)', '')
    .replace(/^---+$/gm, '')
    .trim();
}

// Extract English content from MD file
function extractEnglishContent(mdPath) {
  const content = fs.readFileSync(mdPath, 'utf8');
  
  const enStart = content.indexOf('## WERSJA ANGIELSKA (EN)') || content.indexOf('## English Version');
  
  if (enStart === -1) {
    return '';
  }
  
  const enContent = content.substring(enStart);
  
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
  console.log(`\n📝 Converting article ${articleId} (${language.toUpperCase()}) to HTML...`);
  
  if (!fs.existsSync(mdFile)) {
    console.error(`❌ File not found: ${mdFile}`);
    return;
  }
  
  // Extract Markdown content
  const markdown = language === 'pl' 
    ? extractPolishContent(mdFile)
    : extractEnglishContent(mdFile);
  
  if (!markdown) {
    console.error(`❌ Could not extract ${language} content`);
    return;
  }
  
  // Convert Markdown to HTML
  const html = marked.parse(markdown);
  
  console.log(`   Markdown: ${markdown.length} chars → HTML: ${html.length} chars`);
  
  const payload = {
    data: {
      content: html
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

async function convertAllArticles() {
  console.log('🚀 Converting Markdown to HTML...\n');
  
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
  
  console.log('\n\n🎉 Conversion completed!');
  console.log('\n📊 Summary:');
  console.log(`   ✅ Success: ${successCount} articles`);
  console.log(`   ❌ Failed: ${failCount} articles`);
}

convertAllArticles().catch(console.error);
