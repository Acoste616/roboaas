/**
 * Script to migrate existing products to use i18n localization
 * Since products are currently in Polish, we'll set them to 'pl' locale
 */

require('dotenv').config({ path: '../.env' });
const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'https://eurobot-hub-strapi.onrender.com';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_URL || process.env.STRAPI_API_TOKEN || '';

if (!STRAPI_TOKEN) {
  console.error('❌ Error: STRAPI_ADMIN_URL or STRAPI_API_TOKEN must be set in .env file');
  process.exit(1);
}

async function getAllProducts() {
  try {
    const url = `${STRAPI_URL}/api/products`;
    console.log(`📥 Fetching all products from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    });

    if (!response.ok) {
      console.error(`❌ Failed to fetch products: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    return [];
  }
}

async function updateProductLocale(productId, locale) {
  try {
    const url = `${STRAPI_URL}/api/products/${productId}`;
    console.log(`\n🔄 Updating Product ${productId} to locale: ${locale}`);
    
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
    console.log(`   ✅ Success! Product ${productId} is now locale '${locale}'`);
    return true;
  } catch (error) {
    console.error(`   ❌ Error:`, error.message);
    return false;
  }
}

async function migrateProducts() {
  console.log('🚀 Starting product i18n migration...\n');
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  console.log(`🔑 Token: ${STRAPI_TOKEN.substring(0, 20)}...`);
  
  const products = await getAllProducts();
  console.log(`\n📦 Found ${products.length} products to migrate\n`);
  
  if (products.length === 0) {
    console.log('⚠️  No products found. Nothing to migrate.');
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const product of products) {
    const productId = product.id;
    const productName = product.attributes.name;
    
    console.log(`\n📦 Processing: ${productName} (ID: ${productId})`);
    
    // Set all products to Polish locale (default)
    const success = await updateProductLocale(productId, 'pl');
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
    console.log('\n⚠️  Some products failed to update. Please check the errors above.');
  } else {
    console.log('\n🎉 All products successfully migrated to i18n!');
    console.log('\n💡 Next steps:');
    console.log('   1. Create English and German translations in Strapi admin');
    console.log('   2. Test locale filtering on the website');
  }
}

migrateProducts();
