/**
 * Clear All Products from Strapi
 * WARNING: This will DELETE all products in the database
 * Use before fresh seeding
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://eurobot-hub-strapi.onrender.com';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_URL || process.env.STRAPI_API_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN not found!');
  process.exit(1);
}

console.log('⚠️  WARNING: This will DELETE all products!');
console.log('📡 Target:', STRAPI_URL);
console.log('');

async function clearAllProducts() {
  try {
    // Fetch all products
    const response = await fetch(`${STRAPI_URL}/api/products?pagination[limit]=100`, {
      headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    const products = data.data || [];
    
    console.log(`📦 Found ${products.length} products to delete\n`);
    
    if (products.length === 0) {
      console.log('✅ Database already empty!');
      return;
    }
    
    // Delete each product
    for (const product of products) {
      console.log(`   Deleting: ${product.attributes?.name || product.id}...`);
      
      const deleteResponse = await fetch(`${STRAPI_URL}/api/products/${product.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
      });
      
      if (deleteResponse.ok) {
        console.log(`   ✅ Deleted ID ${product.id}`);
      } else {
        console.log(`   ❌ Failed to delete ID ${product.id}`);
      }
    }
    
    console.log(`\n🎉 Cleared ${products.length} products!`);
    console.log('\n💡 Now run: npm run seed:production');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearAllProducts();
