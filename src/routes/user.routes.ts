import { Router, Request, Response } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/');
router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ userId: req.params.id });
});
router.post('/registration', userController.registration)


export default router;
