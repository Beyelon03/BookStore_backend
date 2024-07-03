import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import reviewRoutes from './review.routes';
import cartRoutes from './cart.routes';
import favoritesRoutes from './favorites.routes';
import orderRoutes from './order.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/orders', orderRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);

export default router;
