import { Router, Response } from 'express';
import { runQuery, getRow, getAllRows } from '../models/database';
import { AuthRequest, authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Get all matches
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const matches = await getAllRows(`
      SELECT m.*, 
             ht.name as home_team_name, at.name as away_team_name,
             p.name as phase_name
      FROM matches m
      LEFT JOIN teams ht ON m.home_team_id = ht.id
      LEFT JOIN teams at ON m.away_team_id = at.id
      LEFT JOIN phases p ON m.phase_id = p.id
      ORDER BY m.match_date DESC
    `);
    res.json(matches);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get matches by phase
router.get('/phase/:phaseId', async (req: AuthRequest, res: Response) => {
  try {
    const { phaseId } = req.params;
    const matches = await getAllRows(`
      SELECT m.*, 
             ht.name as home_team_name, at.name as away_team_name
      FROM matches m
      LEFT JOIN teams ht ON m.home_team_id = ht.id
      LEFT JOIN teams at ON m.away_team_id = at.id
      WHERE m.phase_id = ?
      ORDER BY m.match_date
    `, [phaseId]);
    res.json(matches);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get match by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const match = await getRow(`
      SELECT m.*, 
             ht.name as home_team_name, at.name as away_team_name
      FROM matches m
      LEFT JOIN teams ht ON m.home_team_id = ht.id
      LEFT JOIN teams at ON m.away_team_id = at.id
      WHERE m.id = ?
    `, [id]);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(match);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create match
router.post('/', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { phase_id, home_team_id, away_team_id, match_date, venue } = req.body;

    if (!phase_id || !home_team_id || !away_team_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await runQuery(
      'INSERT INTO matches (phase_id, home_team_id, away_team_id, match_date, venue) VALUES (?, ?, ?, ?, ?)',
      [phase_id, home_team_id, away_team_id, match_date || null, venue || null]
    );

    res.status(201).json({
      message: 'Match created successfully',
      matchId: result.id
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update match score
router.put('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { home_score, away_score, status } = req.body;

    await runQuery(
      'UPDATE matches SET home_score = ?, away_score = ?, status = ? WHERE id = ?',
      [home_score, away_score, status || 'completed', id]
    );

    // Update classement after match update
    const match = await getRow('SELECT * FROM matches WHERE id = ?', [id]);
    if (match && status === 'completed') {
      await updateClassement(match.phase_id, match.home_team_id, match.away_team_id, home_score, away_score);
    }

    res.json({ message: 'Match updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete match
router.delete('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await runQuery('DELETE FROM matches WHERE id = ?', [id]);
    res.json({ message: 'Match deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function updateClassement(phase_id: number, home_team_id: number, away_team_id: number, home_score: number, away_score: number) {
  // Ensure teams exist in classement
  const homeExists = await getRow('SELECT * FROM classement WHERE phase_id = ? AND team_id = ?', [phase_id, home_team_id]);
  if (!homeExists) {
    await runQuery('INSERT INTO classement (phase_id, team_id) VALUES (?, ?)', [phase_id, home_team_id]);
  }

  const awayExists = await getRow('SELECT * FROM classement WHERE phase_id = ? AND team_id = ?', [phase_id, away_team_id]);
  if (!awayExists) {
    await runQuery('INSERT INTO classement (phase_id, team_id) VALUES (?, ?)', [phase_id, away_team_id]);
  }

  // Update home team
  if (home_score > away_score) {
    await runQuery(
      'UPDATE classement SET matches_played = matches_played + 1, wins = wins + 1, goals_for = goals_for + ?, goals_against = goals_against + ?, points = points + 3 WHERE phase_id = ? AND team_id = ?',
      [home_score, away_score, phase_id, home_team_id]
    );
  } else if (home_score < away_score) {
    await runQuery(
      'UPDATE classement SET matches_played = matches_played + 1, losses = losses + 1, goals_for = goals_for + ?, goals_against = goals_against + ? WHERE phase_id = ? AND team_id = ?',
      [home_score, away_score, phase_id, home_team_id]
    );
  } else {
    await runQuery(
      'UPDATE classement SET matches_played = matches_played + 1, draws = draws + 1, goals_for = goals_for + ?, goals_against = goals_against + ?, points = points + 1 WHERE phase_id = ? AND team_id = ?',
      [home_score, away_score, phase_id, home_team_id]
    );
  }

  // Update away team
  if (away_score > home_score) {
    await runQuery(
      'UPDATE classement SET matches_played = matches_played + 1, wins = wins + 1, goals_for = goals_for + ?, goals_against = goals_against + ?, points = points + 3 WHERE phase_id = ? AND team_id = ?',
      [away_score, home_score, phase_id, away_team_id]
    );
  } else if (away_score < home_score) {
    await runQuery(
      'UPDATE classement SET matches_played = matches_played + 1, losses = losses + 1, goals_for = goals_for + ?, goals_against = goals_against + ? WHERE phase_id = ? AND team_id = ?',
      [away_score, home_score, phase_id, away_team_id]
    );
  } else {
    await runQuery(
      'UPDATE classement SET matches_played = matches_played + 1, draws = draws + 1, goals_for = goals_for + ?, goals_against = goals_against + ?, points = points + 1 WHERE phase_id = ? AND team_id = ?',
      [away_score, home_score, phase_id, away_team_id]
    );
  }
}

export default router;
