#!/bin/bash
# Script pour démarrer l'application complète

echo "🚀 Champions League Management System - Startup Script"
echo "========================================================"

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 16+"
    exit 1
fi

echo "✅ Node.js trouvé: $(node --version)"

# Backend setup
echo ""
echo "📦 Installation du Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ Dependencies backend déjà installées"
fi

if [ ! -f ".env" ]; then
    echo "⚠️ Création du fichier .env"
    cp .env.example .env
fi

# Frontend setup
echo ""
echo "📦 Installation du Frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ Dependencies frontend déjà installées"
fi

# Instructions pour démarrage
echo ""
echo "========================================================"
echo "✅ Installation complète!"
echo ""
echo "📝 Prochaines étapes:"
echo ""
echo "Terminal 1 - Démarrer le Backend:"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 - Démarrer le Frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:5000"
echo ""
echo "📚 Consultez QUICK_START.md pour plus d'informations"
echo "========================================================"
