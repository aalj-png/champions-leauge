# Champions League Management System

Une application web complète pour gérer les matchs, équipes et joueurs de la Champions League avec un classement automatique.

## Fonctionnalités

✅ **Authentification & Autorisation**
- Inscription et connexion des utilisateurs
- Rôles admin et utilisateur
- JWT token-based authentication

✅ **Gestion des Équipes**
- Créer, modifier, supprimer des équipes
- Ajouter le logo et le pays de l'équipe
- Liste complète des équipes

✅ **Gestion des Joueurs**
- Ajouter des joueurs aux équipes
- Gérer les positions (GK, DEF, MID, FWD)
- Numéro de maillot, date de naissance, nationalité

✅ **Gestion des Matchs**
- Créer et programmer les matchs
- Enregistrer les scores
- Suivre le statut (pending, completed, cancelled)

✅ **Classement Dynamique**
- Mise à jour automatique des standings après chaque match
- Points, buts marqués/encaissés, différence de buts
- Classement en temps réel

✅ **Gestion des Phases**
- Créer différentes phases (knockout, group stage, round robin)
- Dates de début et fin
- Description de la phase

✅ **Design Moderne**
- Interface utilisateur élégante avec Tailwind CSS
- Design responsive (mobile, tablet, desktop)
- Gradients et animations modernes

## Architecture

### Backend (Node.js + Express)
```
backend/
├── src/
│   ├── index.ts              # Point d'entrée principal
│   ├── middleware/
│   │   └── auth.ts           # Authentification & autorisation
│   ├── models/
│   │   └── database.ts       # Configuration SQLite
│   └── routes/
│       ├── auth.ts           # Routes authentification
│       ├── teams.ts          # Routes équipes
│       ├── players.ts        # Routes joueurs
│       ├── matches.ts        # Routes matchs
│       ├── classement.ts     # Routes classement
│       └── phases.ts         # Routes phases
├── package.json
└── tsconfig.json
```

### Frontend (React + TypeScript)
```
frontend/
├── src/
│   ├── App.tsx               # Composant principal
│   ├── main.tsx              # Point d'entrée
│   ├── api.ts                # Service API Axios
│   ├── index.css             # Styles globaux
│   ├── components/
│   │   └── NavBar.tsx        # Barre de navigation
│   ├── context/
│   │   └── AuthContext.tsx   # Context authentification
│   └── pages/
│       ├── Home.tsx
│       ├── Login.tsx
│       ├── Register.tsx
│       ├── Dashboard.tsx
│       ├── Teams.tsx
│       ├── Players.tsx
│       ├── Matches.tsx
│       ├── Classement.tsx
│       ├── Phases.tsx
│       └── Profile.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

### Base de Données (SQLite)
- `users` - Utilisateurs du système
- `teams` - Équipes participantes
- `players` - Joueurs
- `phases` - Phases du tournoi
- `matches` - Matchs
- `classement` - Standings/Classement

## Installation & Démarrage

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Modifier `.env`:
```
PORT=5000
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
DB_PATH=./data/champions_league.db
```

Lancer le serveur:
```bash
npm run dev
```

Le backend va démarrer sur `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Lancer l'application:
```bash
npm run dev
```

L'application va ouvrir sur `http://localhost:3000`

## Tester l'Application

### Créer un Compte Admin

1. S'inscrire sur `/register`
2. Via le terminal sécurisé, modifier le rôle:
```bash
sqlite3 ./data/champions_league.db "UPDATE users SET role='admin' WHERE username='votre_username'"
```

### Utiliser l'Application

1. Se connecter
2. Créer des équipes
3. Ajouter des joueurs aux équipes
4. Créer une/des phases
5. Créer et enregistrer les résultats des matchs
6. Consulter le classement automatique

## API Endpoints

### Auth
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil (authentifié)

### Teams
- `GET /api/teams` - Lister les équipes
- `GET /api/teams/:id` - Détail d'une équipe
- `POST /api/teams` - Créer une équipe (admin)
- `PUT /api/teams/:id` - Modifier une équipe (admin)
- `DELETE /api/teams/:id` - Supprimer une équipe (admin)

### Players
- `GET /api/players` - Lister tous les joueurs
- `GET /api/players/team/:teamId` - Joueurs d'une équipe
- `GET /api/players/:id` - Détail d'un joueur
- `POST /api/players` - Créer un joueur (admin)
- `PUT /api/players/:id` - Modifier un joueur (admin)
- `DELETE /api/players/:id` - Supprimer un joueur (admin)

### Matches
- `GET /api/matches` - Lister tous les matchs
- `GET /api/matches/phase/:phaseId` - Matchs d'une phase
- `GET /api/matches/:id` - Détail d'un match
- `POST /api/matches` - Créer un match (admin)
- `PUT /api/matches/:id` - Mettre à jour le score (admin)
- `DELETE /api/matches/:id` - Supprimer un match (admin)

### Classement
- `GET /api/classement` - Tous les classements
- `GET /api/classement/phase/:phaseId` - Classement d'une phase

### Phases
- `GET /api/phases` - Lister les phases
- `GET /api/phases/:id` - Détail d'une phase
- `POST /api/phases` - Créer une phase (admin)
- `PUT /api/phases/:id` - Modifier une phase (admin)
- `DELETE /api/phases/:id` - Supprimer une phase (admin)

## Technologies Utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite3** - Base de données
- **TypeScript** - Typage statique
- **JWT** - Authentification
- **Bcryptjs** - Hachage des mots de passe
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **React Router** - Navigation
- **Axios** - Client HTTP

## Déploiement

### Production Backend
```bash
cd backend
npm run build
npm start
```

### Production Frontend
```bash
cd frontend
npm run build
```

Les fichiers dans `dist/` sont prêts pour le déploiement.

## Améliorations Futures

- [ ] Système de notifications
- [ ] Historique des matchs détaillé
- [ ] Statistiques des joueurs
- [ ] Système de calendrier interactif
- [ ] Export des données PDF
- [ ] Graphiques et statistiques avancées
- [ ] Système de commentaires sur les matchs
- [ ] Système de prédictions

## License

MIT License

## Support

Pour toute question ou problème, veuillez créer une issue.
