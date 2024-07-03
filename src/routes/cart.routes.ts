import { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { authUserMiddleware } from '../middlewares/auth.middleware';

class CartRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/:userId', authUserMiddleware, CartController.getAllCartItems);
    this.router.post('/add-to-cart/:userId', authUserMiddleware, CartController.addToCart);
    this.router.post('/remove-from-cart/:userId', authUserMiddleware, CartController.removeFromCart);
  }
}

export default new CartRoutes().router;
