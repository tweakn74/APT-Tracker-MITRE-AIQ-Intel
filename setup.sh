#!/bin/bash

# APT Tracker Setup Script
# This script helps you set up the project for the first time

set -e

echo "🛡️  APT Tracker - MITRE ATT&CK Intelligence Aggregator"
echo "=================================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version must be 20 or higher. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v)"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

echo "✅ Dependencies installed"

# Check if wrangler is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx is not available."
    exit 1
fi

echo ""
echo "=================================================="
echo "Next Steps:"
echo "=================================================="
echo ""
echo "1. Login to Cloudflare:"
echo "   npx wrangler login"
echo ""
echo "2. Create KV namespace:"
echo "   npx wrangler kv:namespace create NEWS_KV"
echo ""
echo "3. Update wrangler.toml with your KV namespace ID"
echo ""
echo "4. Update wrangler.toml with your GitHub Pages URL:"
echo "   ALLOWED_ORIGIN = \"https://YOUR_USERNAME.github.io\""
echo ""
echo "5. Deploy the worker:"
echo "   npm run deploy"
echo ""
echo "6. Update app.js with your worker URL"
echo ""
echo "7. Push to GitHub:"
echo "   git add ."
echo "   git commit -m \"Initial setup\""
echo "   git push origin main"
echo ""
echo "8. Enable GitHub Pages in repository settings"
echo ""
echo "=================================================="
echo "For detailed instructions, see DEPLOYMENT.md"
echo "=================================================="
echo ""
echo "✅ Setup complete! Follow the next steps above."

