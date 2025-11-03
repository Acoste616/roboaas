#!/usr/bin/env node

// Strapi API Structure Validator
// 
// Validates that all Collection Types have complete API structure:
// - routes/*.js
// - controllers/*.js
// - services/*.js
// - content-types/*/schema.json
// 
// Usage: node scripts/validate-api.js

const fs = require('fs');
const path = require('path');

// Configuration
const API_DIR = path.join(__dirname, '..', 'src', 'api');
const REQUIRED_FILE_TYPES = ['routes', 'controllers', 'services', 'content-types'];

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateApiStructure() {
  log('\n🔍 Validating Strapi API structure...', 'cyan');
  log('═'.repeat(50), 'cyan');

  // Check if API directory exists
  if (!fs.existsSync(API_DIR)) {
    log('\n❌ Error: src/api directory not found!', 'red');
    process.exit(1);
  }

  // Get all Collection Types
  const contentTypes = fs.readdirSync(API_DIR).filter(item => {
    const itemPath = path.join(API_DIR, item);
    return fs.statSync(itemPath).isDirectory();
  });

  if (contentTypes.length === 0) {
    log('\n⚠️  Warning: No Collection Types found in src/api/', 'yellow');
    process.exit(0);
  }

  log(`\nFound ${contentTypes.length} Collection Type(s): ${contentTypes.join(', ')}`, 'blue');

  let hasErrors = false;
  const results = [];

  // Validate each Collection Type
  contentTypes.forEach(type => {
    log(`\n📦 Validating: ${type}`, 'cyan');
    const typeDir = path.join(API_DIR, type);
    const errors = [];

    // Check required directories
    REQUIRED_FILE_TYPES.forEach(fileType => {
      const dirPath = path.join(typeDir, fileType);
      
      if (!fs.existsSync(dirPath)) {
        errors.push(`Missing directory: ${fileType}/`);
        return;
      }

      // Check for required files
      if (fileType === 'routes' || fileType === 'controllers' || fileType === 'services') {
        const expectedFile = path.join(dirPath, `${type}.js`);
        if (!fs.existsSync(expectedFile)) {
          errors.push(`Missing file: ${fileType}/${type}.js`);
        } else {
          log(`  ✅ ${fileType}/${type}.js`, 'green');
        }
      }

      // Check content-types schema
      if (fileType === 'content-types') {
        const schemaPath = path.join(dirPath, type, 'schema.json');
        if (!fs.existsSync(schemaPath)) {
          errors.push(`Missing file: content-types/${type}/schema.json`);
        } else {
          // Validate schema.json structure
          try {
            const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
            
            if (!schema.kind || !schema.collectionName || !schema.attributes) {
              errors.push(`Invalid schema.json: Missing required fields (kind, collectionName, attributes)`);
            } else {
              log(`  ✅ content-types/${type}/schema.json`, 'green');
              
              // Check for i18n configuration
              if (schema.pluginOptions && schema.pluginOptions.i18n && schema.pluginOptions.i18n.localized) {
                log(`  ℹ️  i18n enabled (localized content)`, 'blue');
              }
            }
          } catch (error) {
            errors.push(`Invalid schema.json: ${error.message}`);
          }
        }
      }
    });

    // Report results for this Collection Type
    if (errors.length > 0) {
      hasErrors = true;
      log(`\n  ❌ Errors found:`, 'red');
      errors.forEach(err => log(`     - ${err}`, 'red'));
    } else {
      log(`  ✅ All files present and valid`, 'green');
    }

    results.push({
      type,
      valid: errors.length === 0,
      errors
    });
  });

  // Print summary
  log('\n' + '═'.repeat(50), 'cyan');
  log('\n📊 Validation Summary:', 'cyan');
  
  results.forEach(result => {
    const status = result.valid ? '✅' : '❌';
    const color = result.valid ? 'green' : 'red';
    log(`  ${status} ${result.type}`, color);
  });

  const validCount = results.filter(r => r.valid).length;
  const totalCount = results.length;
  
  log(`\n${validCount}/${totalCount} Collection Types valid\n`, validCount === totalCount ? 'green' : 'yellow');

  // Exit with appropriate code
  if (hasErrors) {
    log('❌ Validation failed! Please fix the errors above.', 'red');
    log('\nTo fix missing files, run:', 'yellow');
    log('  strapi generate content-type <name>', 'yellow');
    log('or create files manually following Strapi v4 structure.\n', 'yellow');
    process.exit(1);
  } else {
    log('✅ All Collection Types have valid structure!', 'green');
    log('Ready for deployment.\n', 'green');
    process.exit(0);
  }
}

// Run validation
try {
  validateApiStructure();
} catch (error) {
  log(`\n❌ Unexpected error: ${error.message}`, 'red');
  console.error(error.stack);
  process.exit(1);
}
