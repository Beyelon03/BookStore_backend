import { Router } from 'express';
import userController from '../controllers/user.controller';
import getRegistrationValidation from '../middlewares/user.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';
import { authAdminMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';
import { paramIdValidator } from '../middlewares/review.validator.middleware';
import FavoritesController from '../controllers/favorites.controller';

const router = Router();

router.post('/registration', getRegistrationValidation(), validateRequest, userController.registration);
router.post('/login', userController.login);
router.post('/logout', authUserMiddleware, userController.logout);
router.get('/refresh', authUserMiddleware, userController.refresh);

router.get('/', authUserMiddleware, userController.getAll);
router.get('/:id', authUserMiddleware, paramIdValidator(), validateRequest, userController.getById);
router.put('/:id', authAdminMiddleware, paramIdValidator(), validateRequest, userController.update);
router.delete('/:id', authAdminMiddleware, paramIdValidator(), validateRequest, userController.delete);

router.get('/favorites/', authUserMiddleware, FavoritesController.getAllFavorites);
router.post('/favorites/add', authUserMiddleware, FavoritesController.addToFavorites);
router.post('/favorites/remove', authUserMiddleware, FavoritesController.removeFromFavorites);

export default router;
