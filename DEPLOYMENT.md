# 🚀 GitHub & Vercel Deployment Guide

## ✅ Étape 1: Créer un Repository GitHub

### 1.1 Aller sur GitHub
1. Allez sur https://github.com/new
2. Connectez-vous (créez un compte si nécessaire)

### 1.2 Créer le Repository
- **Repository name**: `champions-league`
- **Description**: Champions League Management System
- **Public**: Sélectionnez "Public" (pour Vercel)
- **Initialize README**: Non (déjà fait)
- Cliquez "Create repository"

### 1.3 Copier l'URL du Repository
L'URL ressemblera à:
```
https://github.com/YOUR_USERNAME/champions-league.git
```

## ✅ Étape 2: Pousser le Code vers GitHub

Remplacez `YOUR_USERNAME` par votre nom d'utilisateur GitHub:

```bash
cd c:\Users\HP\Desktop\tp7

# Ajouter le remote GitHub
git remote add origin https://github.com/YOUR_USERNAME/champions-league.git

# Renommer la branche master en main (optionnel mais recommandé)
git branch -M main

# Pousser le code
git push -u origin main
```

## ✅ Étape 3: Déployer le Frontend sur Vercel

### 3.1 Aller sur Vercel
1. Allez sur https://vercel.com
2. Cliquez "Sign Up" (ou connectez-vous)
3. Choisissez "Continue with GitHub"
4. Autorisez Vercel à accéder à votre GitHub

### 3.2 Importer le Project
1. Cliquez "New Project"
2. Sélectionnez le repository `champions-league`
3. Cliquez "Import"

### 3.3 Configurer le Projet
**Framework Preset**: Vite

**Root Directory**: 
```
frontend
```

**Environment Variables**:
```
VITE_API_URL=https://votre-api-backend.com/api
```

(Mettre à jour après le déploiement du backend)

### 3.4 Déployer
Cliquez "Deploy" et attendez la fin du déploiement.

**URL Frontend**: `https://champions-league-xyz.vercel.app`

## ✅ Étape 4: Déployer le Backend

### Option A: Heroku (Gratuit avec limites)

#### 4.1 Aller sur Heroku
1. Allez sur https://www.heroku.com
2. Créez un compte
3. Cliquez "New" → "Create new app"

#### 4.2 Configuration Heroku
- **App name**: `champions-league-api`
- Cliquez "Create app"

#### 4.3 Connecter GitHub
1. Aller à "Deploy"
2. Sélectionnez "GitHub"
3. Recherchez `champions-league`
4. Cliquez "Connect"

#### 4.4 Enable Automatic Deploys
- Cochez "Automatic deploys" sur la branche `main`

#### 4.5 Ajouter Environment Variables
Allez à "Settings" → "Config Vars":
```
PORT=5000
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=production
DB_PATH=./data/champions_league.db
```

#### 4.6 Déployer
Cliquez "Deploy Branch"

**URL Backend**: `https://champions-league-api.herokuapp.com`

### Option B: Railway.app (Recommandé)

#### 4.1 Aller sur Railway
1. Allez sur https://railway.app
2. Cliquez "Login" (GitHub login)

#### 4.2 Create New Project
1. Cliquez "New Project"
2. Sélectionnez "Deploy from GitHub repo"
3. Choisissez `champions-league`

#### 4.3 Configure
1. Sélectionnez le service Node
2. Changez la branche à `main`
3. Changez le root directory à `backend`

#### 4.4 Environment Variables
Dans l'onglet "Variables":
```
PORT=5000
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=production
DB_PATH=./data/champions_league.db
```

#### 4.5 Déployer
Railway déploie automatiquement

**URL Backend**: `https://champions-league-api-production.up.railway.app`

### Option C: Render.com

#### 4.1 Aller sur Render
1. Allez sur https://render.com
2. Cliquez "Sign up"

#### 4.2 Create New Web Service
1. Cliquez "New +"
2. Sélectionnez "Web Service"
3. Connectez GitHub

#### 4.3 Configure
- **Name**: `champions-league-api`
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### 4.4 Environment Variables
```
PORT=5000
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=production
DB_PATH=./data/champions_league.db
```

#### 4.5 Créer Service
Cliquez "Create Web Service"

**URL Backend**: `https://champions-league-api.onrender.com`

## ✅ Étape 5: Mettre à Jour les URLs

### 5.1 Backend
Pas de changement si les URLs utilisent des variables d'environnement.

### 5.2 Frontend - Mettre à jour src/api.ts

Remplacez:
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

Par l'URL complète du backend déployé.

Puis redéployez sur Vercel.

## ✅ Étape 6: Tester l'Application

1. Ouvrez `https://champions-league-xyz.vercel.app`
2. Inscrivez-vous
3. Se connectez
4. Testez toutes les fonctionnalités

## 🔒 Points Importants de Sécurité

- ✅ Changez `JWT_SECRET` en production
- ✅ Définir `NODE_ENV=production` sur le backend
- ✅ Utilisez HTTPS partout (Vercel/Railway/Render le font)
- ✅ Ne commitez jamais les `.env` (utiliser `.env.example`)
- ✅ Utilisez des environment variables pour les secrets

## 📝 Commandes Git Utiles

```bash
# Vérifier le statut
git status

# Faire un commit
git commit -m "feat: description du changement"

# Pousser les changements
git push origin main

# Créer une nouvelle branche
git checkout -b feature/my-feature
git push -u origin feature/my-feature

# Merger une branche
git checkout main
git merge feature/my-feature
git push origin main
```

## 🔧 Troubleshooting

### Frontend ne trouve pas le Backend
- Vérifier la variable `VITE_API_URL` dans Vercel
- Vérifier que le backend est en ligne
- Utiliser l'URL complète du backend

### Database erreur sur le backend
- Railway/Render créent des fichiers temporaires
- Utiliser PostgreSQL au lieu de SQLite en production (recommandé)

### Vercel deployment échoue
- Vérifier les erreurs dans "Deployments" → "Function Logs"
- Vérifier que `frontend` est le Root Directory
- Vérifier que `npm install` et `npm run build` fonctionnent localement

## 📚 Ressources Útiles

- [Vercel Docs](https://vercel.com/docs)
- [Railway.app Docs](https://docs.railway.app)
- [Render.com Docs](https://render.com/docs)
- [GitHub Docs](https://docs.github.com)

## ✨ Vous Êtes Prêts!

Votre application est maintenant en production! 🚀

Si vous avez besoin d'aide, consultez les docs ou contactez le support.
