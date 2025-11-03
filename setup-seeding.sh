#!/bin/bash

# EuroBot Hub - Automated Seeding Setup Script
# This script helps you configure and run the Strapi seeding system

set -e  # Exit on error

echo "╔═══════════════════════════════════════════════════════╗"
echo "║     EUROBOT HUB - SEEDING SETUP ASSISTANT             ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
else
    echo "✅ .env.local already exists"
fi

# Check if STRAPI_API_TOKEN is set
if ! grep -q "STRAPI_API_TOKEN=.*[a-zA-Z0-9]" .env.local; then
    echo ""
    echo "⚠️  STRAPI_API_TOKEN not configured in .env.local"
    echo ""
    echo "📋 Follow these steps:"
    echo "   1. Start Strapi: cd strapi-backend && npm run develop"
    echo "   2. Visit: http://localhost:1337/admin"
    echo "   3. Login (or create admin account)"
    echo "   4. Go to: Settings → API Tokens"
    echo "   5. Create new token with 'Full Access'"
    echo "   6. Copy the token"
    echo ""
    read -p "Paste your Strapi API token here: " STRAPI_TOKEN
    
    # Update .env.local
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/STRAPI_API_TOKEN=.*/STRAPI_API_TOKEN=$STRAPI_TOKEN/" .env.local
    else
        # Linux
        sed -i "s/STRAPI_API_TOKEN=.*/STRAPI_API_TOKEN=$STRAPI_TOKEN/" .env.local
    fi
    
    echo "✅ Token saved to .env.local"
fi

# Copy to strapi-backend/.env
echo ""
echo "📝 Syncing token to strapi-backend/.env..."
if [ ! -f "strapi-backend/.env" ]; then
    touch strapi-backend/.env
fi

STRAPI_TOKEN=$(grep "STRAPI_API_TOKEN=" .env.local | cut -d '=' -f2)
if ! grep -q "STRAPI_API_TOKEN" strapi-backend/.env; then
    echo "STRAPI_API_TOKEN=$STRAPI_TOKEN" >> strapi-backend/.env
else
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/STRAPI_API_TOKEN=.*/STRAPI_API_TOKEN=$STRAPI_TOKEN/" strapi-backend/.env
    else
        sed -i "s/STRAPI_API_TOKEN=.*/STRAPI_API_TOKEN=$STRAPI_TOKEN/" strapi-backend/.env
    fi
fi
echo "✅ Token synced to strapi-backend/.env"

# Check if Strapi is running
echo ""
echo "🔍 Checking if Strapi is running..."
if curl -s http://localhost:1337/api > /dev/null 2>&1; then
    echo "✅ Strapi is running at http://localhost:1337"
else
    echo "⚠️  Strapi is not running"
    echo ""
    read -p "Do you want to start Strapi now? (y/n): " START_STRAPI
    
    if [ "$START_STRAPI" = "y" ] || [ "$START_STRAPI" = "Y" ]; then
        echo "🚀 Starting Strapi..."
        cd strapi-backend
        npm run develop &
        STRAPI_PID=$!
        echo "⏳ Waiting for Strapi to start (this may take 30-60 seconds)..."
        sleep 30
        cd ..
        
        if curl -s http://localhost:1337/api > /dev/null 2>&1; then
            echo "✅ Strapi started successfully!"
        else
            echo "❌ Strapi failed to start. Please start it manually:"
            echo "   cd strapi-backend && npm run develop"
            exit 1
        fi
    else
        echo ""
        echo "❌ Cannot proceed without Strapi running."
        echo "Please start it manually: cd strapi-backend && npm run develop"
        exit 1
    fi
fi

# Run seeding
echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║              READY TO SEED STRAPI CMS                 ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "This will populate your Strapi with:"
echo "  • 6 humanoid robot products (18 entries with locales)"
echo "  • 3 strategic blog articles (9 entries with locales)"
echo ""
read -p "Proceed with seeding? (y/n): " PROCEED

if [ "$PROCEED" = "y" ] || [ "$PROCEED" = "Y" ]; then
    echo ""
    echo "🌱 Starting seeding process..."
    cd strapi-backend
    npm run seed
    
    echo ""
    echo "╔═══════════════════════════════════════════════════════╗"
    echo "║                 ✅ SETUP COMPLETE!                    ║"
    echo "╚═══════════════════════════════════════════════════════╝"
    echo ""
    echo "🎉 Next steps:"
    echo "   1. Visit Strapi Admin: http://localhost:1337/admin"
    echo "   2. Verify products in Content Manager → Product"
    echo "   3. Test API: http://localhost:1337/api/products"
    echo "   4. Start Next.js: npm run dev (in project root)"
    echo ""
else
    echo ""
    echo "⏸️  Seeding cancelled. You can run it later with:"
    echo "   cd strapi-backend && npm run seed"
fi

echo ""
echo "📚 For detailed docs, see: SETUP_SEEDING.md"
echo ""
