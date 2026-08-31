#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envExample = path.join(process.cwd(), '.env.example');
const envLocal = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envLocal)) {
  console.log('⚠️  .env.local not found');

  if (fs.existsSync(envExample)) {
    console.log('📋 Copying .env.example to .env.local...');
    fs.copyFileSync(envExample, envLocal);
    console.log('✅ .env.local created. Please update it with your values.');
  } else {
    console.log('❌ .env.example not found either. Please create .env.local manually.');
    process.exit(1);
  }
} else {
  console.log('✅ .env.local exists');
}

// Check required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SANITY_API_TOKEN',
];

const missingVars = [];

if (fs.existsSync(envLocal)) {
  const envContent = fs.readFileSync(envLocal, 'utf-8');

  requiredEnvVars.forEach(varName => {
    const regex = new RegExp(`^${varName}=(.+)$`, 'm');
    const match = envContent.match(regex);

    if (!match || !match[1] || match[1].trim() === '') {
      missingVars.push(varName);
    }
  });
}

if (missingVars.length > 0) {
  console.log('⚠️  Missing or empty environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\nPlease set these variables in your .env.local file');
} else {
  console.log('✅ All required environment variables are set');
}

console.log('\n📚 Development environment check complete!');
