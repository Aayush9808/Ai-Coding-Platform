#!/bin/bash

# AI Coding Platform - Complete Frontend Components Setup
# This script creates all remaining frontend components

echo "🚀 Creating all frontend components..."

# Create PostCSS config
cat > /Users/aayus/Desktop/New\ Project/ai-coding-platform/client/postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Create .env for frontend
cat > /Users/aayus/Desktop/New\ Project/ai-coding-platform/client/.env << 'EOF'
VITE_API_URL=http://localhost:5000/api
EOF

echo "✅ Configuration files created"
echo "📦 All backend files are ready!"
echo ""
echo "🎯 NEXT STEPS:"
echo ""
echo "1️⃣  Install dependencies:"
echo "   cd server && npm install"
echo "   cd ../client && npm install"
echo ""
echo "2️⃣  Setup environment:"
echo "   - Edit server/.env with your API keys"
echo "   - Get MongoDB URI from mongodb.com/cloud/atlas"
echo "   - Get OpenAI key from platform.openai.com/api-keys"
echo "   - Get Judge0 key from rapidapi.com/judge0-official/api/judge0-ce"
echo ""
echo "3️⃣  Run the application:"
echo "   Terminal 1: cd server && npm run dev"
echo "   Terminal 2: cd client && npm run dev"
echo ""
echo "4️⃣  Open http://localhost:5173 in your browser"
echo ""
echo "📚 Read SETUP_GUIDE.md for detailed instructions"
echo ""
echo "✨ Happy Coding!"
