import { Router, Response } from 'express';
import { getAllRows } from '../models/database';
import { AuthRequest } from '../middleware/auth';

const router = Router();

// Get classement by phase
router.get('/phase/:phaseId', async (req: AuthRequest, res: Response) => {
  try {
    const { phaseId } = req.params;
    const classement = await getAllRows(`
      SELECT c.*, t.name as team_name, t.logo
      FROM classement c
      LEFT JOIN teams t ON c.team_id = t.id
      WHERE c.phase_id = ?
      ORDER BY c.points DESC, (c.goals_for - c.goals_against) DESC, c.goals_for DESC
    `, [phaseId]);

    // Add positions
    const withPositions = classement.map((row, index) => ({
      ...row,
      position: index + 1
    }));

    res.json(withPositions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all classements
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const classement = await getAllRows(`
      SELECT c.*, t.name as team_name, p.name as phase_name
      FROM classement c
      LEFT JOIN teams t ON c.team_id = t.id
      LEFT JOIN phases p ON c.phase_id = p.id
      ORDER BY c.phase_id, c.points DESC, (c.goals_for - c.goals_against) DESC
    `);
    res.json(classement);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
