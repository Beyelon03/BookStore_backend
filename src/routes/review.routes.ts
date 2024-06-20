import { Router } from 'express';
import ReviewController from '../controllers/review.controller';
import {
  authAdminMiddleware,
  authUserMiddleware,
} from '../middlewares/auth.middleware';

const router = Router();

router.post('/create', authUserMiddleware, ReviewController.create);
router.get('/', authUserMiddleware, ReviewController.getAll);
router.get('/:id', authUserMiddleware, ReviewController.getById);
router.put('/:id', authAdminMiddleware, ReviewController.update);
router.delete('/:id', authAdminMiddleware, ReviewController.delete);

export default router;
