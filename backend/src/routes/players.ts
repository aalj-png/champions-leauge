import { Router, Response } from 'express';
import { runQuery, getRow, getAllRows } from '../models/database';
import { AuthRequest, authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Get all players
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const players = await getAllRows(`
      SELECT p.*, t.name as team_name FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
    `);
    res.json(players);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get players by team
router.get('/team/:teamId', async (req: AuthRequest, res: Response) => {
  try {
    const { teamId } = req.params;
    const players = await getAllRows(
      'SELECT * FROM players WHERE team_id = ?',
      [teamId]
    );
    res.json(players);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get player by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const player = await getRow('SELECT * FROM players WHERE id = ?', [id]);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(player);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create player
router.post('/', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, position, jersey_number, team_id, birth_date, nationality } = req.body;

    if (!name || !position || !jersey_number || !team_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await runQuery(
      'INSERT INTO players (name, position, jersey_number, team_id, birth_date, nationality) VALUES (?, ?, ?, ?, ?, ?)',
      [name, position, jersey_number, team_id, birth_date || null, nationality || null]
    );

    res.status(201).json({
      message: 'Player created successfully',
      playerId: result.id
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update player
router.put('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, position, jersey_number, birth_date, nationality } = req.body;

    await runQuery(
      'UPDATE players SET name = ?, position = ?, jersey_number = ?, birth_date = ?, nationality = ? WHERE id = ?',
      [name, position, jersey_number, birth_date, nationality, id]
    );

    res.json({ message: 'Player updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete player
router.delete('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await runQuery('DELETE FROM players WHERE id = ?', [id]);
    res.json({ message: 'Player deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
