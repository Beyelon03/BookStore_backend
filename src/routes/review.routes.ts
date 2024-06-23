import { Router } from 'express';
import ReviewController from '../controllers/review.controller';
import { authAdminMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';
import { getReviewValidation, paramIdValidator } from '../middlewares/review.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';

const router = Router();

router.post('/create', authUserMiddleware, getReviewValidation(), validateRequest, ReviewController.create);
router.get('/', authUserMiddleware, ReviewController.getAll);
router.get('/:id', authUserMiddleware, paramIdValidator(), validateRequest, ReviewController.getById);
router.put('/:id', authAdminMiddleware, paramIdValidator(), validateRequest, ReviewController.update);
router.delete('/:id', authAdminMiddleware, paramIdValidator(), validateRequest, ReviewController.delete);

export default router;
