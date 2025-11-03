/**
 * Master Seeder Script
 * Populates Strapi with all products and articles
 * Usage: node scripts/seed-all.js
 */

const { seedAllProducts } = require('./seed-products-enhanced');
const { seedAllArticles } = require('./seed-articles');

async function seedEverything() {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║        EUROBOT HUB - STRAPI MASTER SEEDER            ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  const startTime = Date.now();

  try {
    // Seed products first
    console.log('\n📦 PHASE 1: Seeding Products...\n');
    await seedAllProducts();

    // Seed articles second
    console.log('\n\n📝 PHASE 2: Seeding Articles...\n');
    await seedAllArticles();

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('\n\n╔═══════════════════════════════════════════════════════╗');
    console.log('║              🎉 ALL SEEDING COMPLETE!                 ║');
    console.log('╚═══════════════════════════════════════════════════════╝');
    console.log(`\n⏱️  Total time: ${duration} seconds`);
    console.log('\n✅ Your Strapi CMS is now populated with:');
    console.log('   • 6 humanoid robot products (18 entries total with locales)');
    console.log('   • 3 strategic blog articles (9 entries total with locales)');
    console.log('   • All data in EN, PL, DE languages\n');
    
    console.log('🚀 Next steps:');
    console.log('   1. Visit your Strapi admin: http://localhost:1337/admin');
    console.log('   2. Verify products in Content Manager > Product');
    console.log('   3. Verify articles in Content Manager > Article');
    console.log('   4. Check public API: http://localhost:1337/api/products');
    console.log('   5. Test frontend integration with Next.js\n');

  } catch (error) {
    console.error('\n\n❌ SEEDING FAILED:');
    console.error(error.message);
    console.error('\nCommon issues:');
    console.error('  • STRAPI_API_TOKEN not set in .env file');
    console.error('  • Strapi server not running (start with: npm run develop)');
    console.error('  • API permissions not configured (check Strapi Settings > Roles)');
    console.error('  • Database connection issues\n');
    process.exit(1);
  }
}

// Run master seeder
seedEverything();
