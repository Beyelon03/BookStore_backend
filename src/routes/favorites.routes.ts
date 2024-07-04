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
    this.router.get('/:userId', authUserMiddleware, FavoritesController.getAllFavorites);
    this.router.post('/add/:userId', authUserMiddleware, FavoritesController.addToFavorites);
    this.router.post('/remove/:userId', authUserMiddleware, FavoritesController.removeFromFavorites);
  }
}

export default new FavoritesRoutes().router;
