import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initializeDatabase } from './models/database';

// Routes imports
import authRoutes from './routes/auth';
import teamsRoutes from './routes/teams';
import playersRoutes from './routes/players';
import matchesRoutes from './routes/matches';
import classementRoutes from './routes/classement';
import phasesRoutes from './routes/phases';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
initializeDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/classement', classementRoutes);
app.use('/api/phases', phasesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
