import { Router } from 'express';
import userController from '../controllers/user.controller';
import {
  getRegistrationValidation,
  validateRequest,
} from '../middlewares/userValidator.middleware';
import adminMiddleware from '../middlewares/admin.middleware';
import {  } from 'express';

const router = Router();

router.post('/registration', getRegistrationValidation(), validateRequest, userController.registration);
router.post('/login', userController.login);
router.get('/', adminMiddleware, userController.getAll);
router.get('/:id', adminMiddleware, userController.getById);
router.put('/:id', adminMiddleware, userController.update);
router.delete('/:id', adminMiddleware, userController.delete);

export default router;
