import { Router, Request, Response } from 'express';

const router = Router();

router.get('/');
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ id: req.params.id });
});

export default router;
