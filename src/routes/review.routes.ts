import { Router } from 'express';
import ReviewController from '../controllers/review.controller';
import { authAdminMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';
import { getReviewValidation } from '../middlewares/review.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';

class ReviewRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/create', authUserMiddleware, getReviewValidation(), validateRequest, ReviewController.create);
    this.router.get('/', ReviewController.getAll);
    this.router.get('/:reviewId', ReviewController.getById);
    this.router.put('/:reviewId', authAdminMiddleware, ReviewController.update);
    this.router.delete('/:reviewId', authAdminMiddleware, ReviewController.delete);
  }
}

export default new ReviewRoutes().router;
