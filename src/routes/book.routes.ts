import { Router } from 'express';
import adminMiddleware from '../middlewares/admin.middleware';
import bookController from '../controllers/book.controller';

const router = Router();

router.post('/create', bookController.create);
router.get('/', adminMiddleware, bookController.getAll);
router.get('/:id', adminMiddleware, bookController.getById);
router.put('/:id', adminMiddleware, bookController.update);
router.delete('/:id', adminMiddleware, bookController.delete);

export default router;
