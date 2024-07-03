import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authAdminMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authUserMiddleware, userController.getAll);
router.get('/:id', authUserMiddleware, userController.getById);
router.put('/:id', authAdminMiddleware, userController.update);
router.delete('/:id', authAdminMiddleware, userController.delete);

export default router;
