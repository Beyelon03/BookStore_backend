import { Router } from 'express';
import userController from '../controllers/user.controller';
import getRegistrationValidation from '../middlewares/userValidator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';
import {
  authAdminMiddleware,
  authUserMiddleware,
} from '../middlewares/auth.middleware';

const router = Router();

router.post('/registration', getRegistrationValidation(), validateRequest, userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

router.get('/', authAdminMiddleware, userController.getAll);
router.get('/:id', authAdminMiddleware, userController.getById);
router.put('/:id', authAdminMiddleware, userController.update);
router.delete('/:id', authAdminMiddleware, userController.delete);

export default router;
