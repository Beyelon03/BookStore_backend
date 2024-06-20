import { Router } from 'express';
import bookController from '../controllers/book.controller';
import {
  authAdminMiddleware,
  authUserMiddleware,
} from '../middlewares/auth.middleware';

const router = Router();

router.post('/create', authAdminMiddleware,bookController.create);
router.get('/', authUserMiddleware, bookController.getAll);
router.get('/:id', authUserMiddleware, bookController.getById);
router.put('/:id', authAdminMiddleware, bookController.update);
router.delete('/:id', authAdminMiddleware, bookController.delete);

export default router;
