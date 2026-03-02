#!/bin/bash
# Script to push Champions League project to GitHub

echo "🚀 Champions League - GitHub Push Script"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized"
    echo "Run: git init first"
    exit 1
fi

echo "📝 Enter your GitHub information:"
read -p "GitHub Username: " USERNAME
read -p "Repository name (default: champions-league): " REPO_NAME
REPO_NAME=${REPO_NAME:-champions-league}

GITHUB_URL="https://github.com/$USERNAME/$REPO_NAME.git"

echo ""
echo "📌 GitHub Configuration:"
echo "URL: $GITHUB_URL"
echo ""

# Add remote
git remote add origin $GITHUB_URL 2>/dev/null || git remote set-url origin $GITHUB_URL

# Rename master to main if exists
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "master" ]; then
    echo "🔄 Renaming branch from master to main..."
    git branch -m main
fi

# Check if there are commits
COMMIT_COUNT=$(git rev-list --count HEAD)
if [ "$COMMIT_COUNT" -eq 0 ]; then
    echo "❌ No commits found. Please make your first commit first."
    exit 1
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Success! Your code is now on GitHub"
echo ""
echo "🌐 Repository URL: https://github.com/$USERNAME/$REPO_NAME"
echo "📚 Next: Go to https://vercel.com to deploy frontend"
echo ""
