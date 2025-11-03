#!/usr/bin/env node
/**
 * Pre-Seeding Verification Script
 * Checks all requirements before running production seeding
 */

console.log('🔍 EuroBot Hub - Pre-Seeding Verification\n');

const errors = [];
const warnings = [];

// 1. Check Node.js version
const nodeVersion = process.version;
console.log(`✓ Node.js version: ${nodeVersion}`);
if (parseInt(nodeVersion.slice(1)) < 18) {
  errors.push('Node.js 18+ required');
}

// 2. Check environment variables
console.log('\n📋 Environment Variables:');
const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'https://eurobot-hub-strapi.onrender.com';
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_URL || process.env.STRAPI_API_TOKEN;

console.log(`   STRAPI_URL: ${STRAPI_URL}`);
if (STRAPI_TOKEN) {
  console.log(`   STRAPI_TOKEN: ${STRAPI_TOKEN.substring(0, 30)}... ✅`);
} else {
  console.log(`   STRAPI_TOKEN: ❌ NOT SET`);
  errors.push('STRAPI_API_TOKEN not found in environment');
}

// 3. Check images directory
const fs = require('fs');
const path = require('path');

console.log('\n📸 Images Check:');
const imagesDir = path.join(__dirname, '..', 'public', 'images');

if (fs.existsSync(imagesDir)) {
  const images = fs.readdirSync(imagesDir).filter(f => 
    f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.avif')
  );
  console.log(`   ✅ Found ${images.length} images in public/images/`);
  
  // Check for specific required images
  const requiredImages = [
    'xvjWEJYrNhg2Jvo97muHic.jpg',
    'f0327448-humanoid-envato-elements-pic-25325.webp',
    'csm_Unitree_G1c_ab5b99757c.jpg',
    '1x-neo-launch-humanoid-robot.jpg',
    'Figure-03-humanoid-robots-Figure-AI-07.webp',
    'SoftBank_pepper.jpg'
  ];
  
  requiredImages.forEach(img => {
    if (images.includes(img)) {
      console.log(`   ✓ ${img}`);
    } else {
      warnings.push(`Missing image: ${img}`);
      console.log(`   ⚠️  ${img} - MISSING`);
    }
  });
} else {
  errors.push('public/images/ directory not found');
  console.log(`   ❌ Directory not found: ${imagesDir}`);
}

// 4. Check PDF
console.log('\n📄 PDF Check:');
const pdfPath = path.join(__dirname, '..', 'public', 'pdf', 'Robot_Security_Report_2026_PL.pdf');
if (fs.existsSync(pdfPath)) {
  const stats = fs.statSync(pdfPath);
  console.log(`   ✅ PDF found (${(stats.size / 1024).toFixed(0)} KB)`);
} else {
  warnings.push('PDF not found - email attachments will fail');
  console.log(`   ⚠️  PDF missing: ${pdfPath}`);
}

// 5. Check script file
console.log('\n📜 Script Check:');
const scriptPath = path.join(__dirname, 'strapi-backend', 'scripts', 'seed-production.js');
const altScriptPath = path.join(__dirname, '..', 'scripts', 'seed-production.js');

if (fs.existsSync(scriptPath)) {
  console.log(`   ✅ seed-production.js found`);
} else if (fs.existsSync(altScriptPath)) {
  console.log(`   ✅ seed-production.js found (alt path)`);
} else {
  errors.push('seed-production.js not found');
  console.log(`   ❌ seed-production.js not found`);
}

// Summary
console.log('\n' + '═'.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('═'.repeat(60));

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ ALL CHECKS PASSED - Ready to seed!');
  console.log('\n🚀 Run seeding with:');
  console.log('   cd strapi-backend');
  console.log('   npm run seed');
} else {
  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} ERROR(S):`);
    errors.forEach((err, i) => console.log(`   ${i + 1}. ${err}`));
  }
  
  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} WARNING(S):`);
    warnings.forEach((warn, i) => console.log(`   ${i + 1}. ${warn}`));
  }
  
  if (errors.length > 0) {
    console.log('\n❌ Fix errors before proceeding!');
    process.exit(1);
  } else {
    console.log('\n⚠️  Warnings present, but seeding can proceed.');
  }
}

console.log('\n' + '═'.repeat(60) + '\n');
