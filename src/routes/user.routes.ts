import { Router } from 'express';
import userController from '../controllers/user.controller';
import adminMiddleware from '../middlewares/admin.middleware';
import getRegistrationValidation from '../middlewares/userValidator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';

const router = Router();

router.post('/registration', getRegistrationValidation(), validateRequest, userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

router.get('/', adminMiddleware, userController.getAll);
router.get('/:id', adminMiddleware, userController.getById);
router.put('/:id', adminMiddleware, userController.update);
router.delete('/:id', adminMiddleware, userController.delete);

export default router;
