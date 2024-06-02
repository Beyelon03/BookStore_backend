import { Router, Request, Response } from 'express';
import userController from '../controllers/user.controller';
import {
  getRegistrationValidation,
  validateRequest,
} from '../middlewares/userValidator.middleware';

const router = Router();

router.post(
  '/registration',
  getRegistrationValidation(),
  validateRequest,
  userController.registration,
);
router.post('/login', userController.login);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
