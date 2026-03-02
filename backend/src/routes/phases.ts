import { Router, Response } from 'express';
import { runQuery, getRow, getAllRows } from '../models/database';
import { AuthRequest, authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Get all phases
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const phases = await getAllRows('SELECT * FROM phases ORDER BY start_date DESC');
    res.json(phases);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get phase by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const phase = await getRow('SELECT * FROM phases WHERE id = ?', [id]);
    if (!phase) {
      return res.status(404).json({ error: 'Phase not found' });
    }
    res.json(phase);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create phase
router.post('/', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, start_date, end_date, matches_format } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await runQuery(
      'INSERT INTO phases (name, description, start_date, end_date, matches_format) VALUES (?, ?, ?, ?, ?)',
      [name, description || null, start_date || null, end_date || null, matches_format || 'knockout']
    );

    res.status(201).json({
      message: 'Phase created successfully',
      phaseId: result.id
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update phase
router.put('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, start_date, end_date, matches_format } = req.body;

    await runQuery(
      'UPDATE phases SET name = ?, description = ?, start_date = ?, end_date = ?, matches_format = ? WHERE id = ?',
      [name, description, start_date, end_date, matches_format, id]
    );

    res.json({ message: 'Phase updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete phase
router.delete('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await runQuery('DELETE FROM phases WHERE id = ?', [id]);
    res.json({ message: 'Phase deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
