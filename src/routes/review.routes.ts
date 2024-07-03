import { Router } from 'express';
import ReviewController from '../controllers/review.controller';
import { authAdminMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';
import { getReviewValidation } from '../middlewares/review.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';

const router = Router();

router.post('/create', authUserMiddleware, getReviewValidation(), validateRequest, ReviewController.create);
router.get('/', authUserMiddleware, ReviewController.getAll);
router.get('/:reviewId', authUserMiddleware, ReviewController.getById);
router.put('/:reviewId', authAdminMiddleware, ReviewController.update);
router.delete('/:reviewId', authAdminMiddleware, ReviewController.delete);

export default router;
