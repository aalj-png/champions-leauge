@echo off
REM Script to push Champions League project to GitHub

echo.
echo ========================================
echo Champions League - GitHub Push Script
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Erreur: Git repository not initialized
    echo Run: git init first
    pause
    exit /b 1
)

echo 📝 Enter your GitHub information:
set /p USERNAME="GitHub Username: "
set /p REPO_NAME="Repository name (default: champions-league): "

if "%REPO_NAME%"=="" set REPO_NAME=champions-league

set GITHUB_URL=https://github.com/%USERNAME%/%REPO_NAME%.git

echo.
echo GitHub Configuration:
echo URL: %GITHUB_URL%
echo.

REM Add remote (or update if exists)
git remote add origin %GITHUB_URL% 2>nul || git remote set-url origin %GITHUB_URL%

REM Rename master to main if exists
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set CURRENT_BRANCH=%%i

if "%CURRENT_BRANCH%"=="master" (
    echo Renomming branch from master to main...
    git branch -m main
)

REM Check if there are commits
for /f %%i in ('git rev-list --count HEAD') do set COMMIT_COUNT=%%i

if "%COMMIT_COUNT%"=="0" (
    echo Erreur: No commits found
    pause
    exit /b 1
)

REM Push to GitHub
echo.
echo 📤 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Success! Your code is on GitHub
echo.
echo Repository URL: https://github.com/%USERNAME%/%REPO_NAME%
echo Next: Go to https://vercel.com to deploy frontend
echo.
pause
