import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/book', bookRoutes);

export default router;
