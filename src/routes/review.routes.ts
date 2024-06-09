import { Router } from 'express';
import adminMiddleware from '../middlewares/admin.middleware';
import ReviewController from '../controllers/review.controller';

const router = Router();

router.post('/create', adminMiddleware, ReviewController.create);
router.get('/', adminMiddleware, ReviewController.getAll);
router.get('/:id', adminMiddleware, ReviewController.getById);
router.put('/:id', adminMiddleware, ReviewController.update);
router.delete('/:id', adminMiddleware, ReviewController.delete);

export default router;
