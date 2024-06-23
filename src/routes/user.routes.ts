import { Router } from 'express';
import userController from '../controllers/user.controller';
import getRegistrationValidation from '../middlewares/user.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';
import { authAdminMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';
import { paramIdValidator } from '../middlewares/review.validator.middleware';

const router = Router();

router.post('/registration', getRegistrationValidation(), validateRequest, userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

router.get('/', authUserMiddleware, userController.getAll);
router.get('/:id', authUserMiddleware, paramIdValidator(), validateRequest, userController.getById);
router.put('/:id', authAdminMiddleware, paramIdValidator(), validateRequest, userController.update);
router.delete('/:id', authAdminMiddleware, paramIdValidator(), validateRequest, userController.delete);

export default router;
