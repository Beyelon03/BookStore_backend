import { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { authUserMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/cart/:userId', authUserMiddleware, CartController.getAllCartItems);
router.post('/add-to-cart', authUserMiddleware, CartController.addToCart);
router.post('/remove-from-cart', authUserMiddleware, CartController.removeFromCart);

export default router;
