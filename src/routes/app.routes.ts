import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import reviewRoutes from './review.routes';
import cartRoutes from './cart.routes';
import favoritesRoutes from './favorites.routes';
import orderRoutes from './order.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/user/cart', cartRoutes);
router.use('/user/favorites', favoritesRoutes);
router.use('/user/order', orderRoutes);
router.use('/book', bookRoutes);
router.use('/review', reviewRoutes);

export default router;
