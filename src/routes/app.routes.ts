import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import reviewRoutes from './review.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/book', bookRoutes);
router.use('/review', reviewRoutes);

export default router;
