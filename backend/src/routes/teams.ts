import { Router, Response } from 'express';
import { runQuery, getRow, getAllRows } from '../models/database';
import { AuthRequest, authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Get all teams
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const teams = await getAllRows('SELECT * FROM teams');
    res.json(teams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get team by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const team = await getRow('SELECT * FROM teams WHERE id = ?', [id]);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create team
router.post('/', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, country, logo } = req.body;

    if (!name || !country) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await runQuery(
      'INSERT INTO teams (name, country, logo) VALUES (?, ?, ?)',
      [name, country, logo || null]
    );

    res.status(201).json({
      message: 'Team created successfully',
      teamId: result.id
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update team
router.put('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, country, logo } = req.body;

    await runQuery(
      'UPDATE teams SET name = ?, country = ?, logo = ? WHERE id = ?',
      [name, country, logo, id]
    );

    res.json({ message: 'Team updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete team
router.delete('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await runQuery('DELETE FROM teams WHERE id = ?', [id]);
    res.json({ message: 'Team deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
