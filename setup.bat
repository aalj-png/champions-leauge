@echo off
REM Script pour démarrer l'application complète sur Windows

echo.
echo ========================================================
echo Champions League Management System - Startup Script
echo ========================================================
echo.

REM Vérifier si Node.js est installé
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Erreur: Node.js n'est pas installé. Veuillez installer Node.js 16+
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js trouvé: %NODE_VERSION%
echo.

REM Backend setup
echo 📦 Installation du Backend...
cd backend

if not exist "node_modules" (
    call npm install
) else (
    echo ✅ Dependencies backend déjà installées
)

if not exist ".env" (
    echo ⚠️ Création du fichier .env
    copy .env.example .env
)

REM Frontend setup
echo.
echo 📦 Installation du Frontend...
cd ..\frontend

if not exist "node_modules" (
    call npm install
) else (
    echo ✅ Dependencies frontend déjà installées
)

REM Instructions pour démarrage
echo.
echo ========================================================
echo ✅ Installation complète!
echo.
echo 📝 Prochaines étapes:
echo.
echo Terminal 1 - Démarrer le Backend:
echo   cd backend ^&^& npm run dev
echo.
echo Terminal 2 - Démarrer le Frontend:
echo   cd frontend ^&^& npm run dev
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔌 Backend: http://localhost:5000
echo.
echo 📚 Consultez QUICK_START.md pour plus d'informations
echo ========================================================
echo.

pause
