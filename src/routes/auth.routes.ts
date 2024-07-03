import { Router } from 'express';
import getRegistrationValidation from '../middlewares/user.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';
import { authUserMiddleware } from '../middlewares/auth.middleware';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/registration', getRegistrationValidation(), validateRequest, AuthController.registration);
router.post('/login', AuthController.login);
router.post('/logout', authUserMiddleware, AuthController.logout);
router.get('/refresh', authUserMiddleware, AuthController.refresh);

export default router;
