/**
 * Enhanced Seed Products Script  
 * Re-exports the original seed-products.js with module.exports
 */

// Import the original seeding logic
const originalSeeder = require('./seed-products');

// Make it importable by other scripts
module.exports = {
  seedAllProducts: () => {
    // Execute the original script
    return require('./seed-products');
  }
};

// If run directly, execute seeding
if (require.main === module) {
  require('./seed-products');
}
