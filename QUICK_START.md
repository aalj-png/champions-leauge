# Installation & Guide de Démarrage

## Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn
- SQLite3

## Installation Rapide

### Étape 1: Cloner et Entrer dans le Répertoire

```bash
cd c:\Users\HP\Desktop\tp7
```

### Étape 2: Installer les Dépendances Backend

```bash
cd backend
npm install
```

### Étape 3: Configurer l'Environnement du Backend

Créez un fichier `.env` à partir du template:

```bash
copy .env.example .env
```

Ou éditez manuellement `.env`:
```
PORT=5000
JWT_SECRET=champion_league_secret_key_2026
NODE_ENV=development
DB_PATH=./data/champions_league.db
```

### Étape 4: Installer les Dépendances Frontend

```bash
cd ../frontend
npm install
```

## Lancer l'Application

### Terminal 1: Lancer le Backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur: **http://localhost:5000**

### Terminal 2: Lancer le Frontend

```bash
cd frontend
npm run dev
```

L'application ouvre à: **http://localhost:3000**

## Première Utilisation

### 1. Créer un Compte

Allez sur http://localhost:3000
- Cliquez sur "Create Account"
- Remplissez le formulaire
- Validez

### 2. Se Connecter

- Entrez vos identifiants
- Cliquez sur "Sign In"

### 3. Activer le Rôle Admin (optionnel)

Pour créer des équipes et des matchs, changez votre rôle en admin:

```bash
# Dans un nouveau terminal
cd backend
sqlite3 data/champions_league.db
```

Dans SQLite3:
```sql
UPDATE users SET role='admin' WHERE username='votre_nom_utilisateur';
.exit
```

### 4. Créer des Données de Test

1. **Créer des Équipes** (Team Menu):
   - Real Madrid
   - Bayern Munich
   - Manchester City
   - Paris Saint-Germain

2. **Ajouter des Joueurs** (Player Menu):
   - Sélectionnez une équipe
   - Ajoutez les joueurs avec position et numéro de maillot

3. **Créer une Phase** (Phases Menu):
   - Nommez-la "Groupe A"
   - Sélectionnez le format "Group Stage"
   - Fixez les dates

4. **Créer des Matchs** (Matches Menu):
   - Sélectionnez la phase
   - Choisissez deux équipes
   - Entrez la date et le lieu

5. **Enregistrer les Résultats**:
   - Allez dans Matches
   - Editez un match
   - Entrez les scores
   - Le classement se met à jour automatiquement

6. **Consulter le Classement** (Standings Menu):
   - Sélectionnez la phase
   - Consultez les standings en temps réel

## Résolution des Problèmes

### Le frontend ne trouve pas le backend

Vérifiez que le backend tourne sur le port 5000:
```bash
netstat -ano | findstr :5000
```

### Erreur de base de données

Supprimez la base ancienne et laissez-la se recréer:
```bash
rm backend/data/champions_league.db
```

### Port déjà utilisé

Modifiez le port dans `.env` ou `vite.config.ts`:
```bash
# Pour le backend, changez PORT dans .env
# Pour le frontend, créez vite.config.ts avec server.port: 3001
```

## Structure des Fichiers

```
tp7/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Commandes Utiles

### Backend
```bash
npm run dev      # Développement avec watch
npm run build    # Compiler TypeScript
npm start        # Lancer la version compilée
```

### Frontend
```bash
npm run dev      # Développement avec Vite
npm run build    # Build production
npm run preview  # Prévisualisation du build
```

## Accès par Défaut

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Base de données**: `backend/data/champions_league.db`

## Support

Pour des problèmes, consultez:
- [README.md](./README.md) - Documentation complète
- Logs du terminal pour messages d'erreur
- Console du navigateur (F12) pour erreurs frontend

Bonne chance! ⚽
