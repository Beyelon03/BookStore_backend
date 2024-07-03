import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authAdminMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authUserMiddleware, UserController.getAll);
router.get('/:userId', authUserMiddleware, UserController.getById);
router.put('/:userId', authAdminMiddleware, UserController.update);
router.delete('/:userId', authAdminMiddleware, UserController.delete);

export default router;
