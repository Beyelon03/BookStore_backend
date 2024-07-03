import { Router } from 'express';
import AuthRoutes from './auth.routes';
import BookRoutes from './book.routes';
import CartRoutes from './cart.routes';
import UserRoutes from './user.routes';
import FavoritesRoutes from './favorites.routes';
import OrderRoutes from './order.routes';
import ReviewRoutes from './review.routes';

class AppRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/users', UserRoutes);
    this.router.use('/auth', AuthRoutes);
    this.router.use('/cart', CartRoutes);
    this.router.use('/favorites', FavoritesRoutes);
    this.router.use('/orders', OrderRoutes);
    this.router.use('/books', BookRoutes);
    this.router.use('/reviews', ReviewRoutes);
  }
}

export default new AppRoutes().router;
