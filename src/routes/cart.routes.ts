import { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { authUserMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:userId', authUserMiddleware, CartController.getAllCartItems);
router.post('/add-to-cart/:userId', authUserMiddleware, CartController.addToCart);
router.post('/remove-from-cart/:userId', authUserMiddleware, CartController.removeFromCart);

export default router;
