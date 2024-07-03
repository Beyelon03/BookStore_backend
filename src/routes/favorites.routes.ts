import { Router } from 'express';
import FavoritesController from '../controllers/favorites.controller';
import { authUserMiddleware } from '../middlewares/auth.middleware';

class FavoritesRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/favorites/:userId', authUserMiddleware, FavoritesController.getAllFavorites);
    this.router.post('/favorites/add/:userId', authUserMiddleware, FavoritesController.addToFavorites);
    this.router.post('/favorites/remove', authUserMiddleware, FavoritesController.removeFromFavorites);
  }
}

export default new FavoritesRoutes().router;
