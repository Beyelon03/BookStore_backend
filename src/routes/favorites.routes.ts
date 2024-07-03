import { Router } from 'express';
import FavoritesController from '../controllers/favorites.controller';
import { authUserMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/favorites/:userId', authUserMiddleware, FavoritesController.getAllFavorites);
router.post('/favorites/add/:userId', authUserMiddleware, FavoritesController.addToFavorites);
router.post('/favorites/remove', authUserMiddleware, FavoritesController.removeFromFavorites);

export default router;
