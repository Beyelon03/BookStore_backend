import { Router } from 'express';
import bookController from '../controllers/book.controller';
import { authAdminMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';
import { getBookValidation, updateBookValidator } from '../middlewares/book.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';
import { paramIdValidator } from '../middlewares/review.validator.middleware';

const router = Router();

router.post('/create', authAdminMiddleware, getBookValidation(), validateRequest, bookController.create);
router.get('/', authUserMiddleware, bookController.getAll);
router.get('/:id', authUserMiddleware, paramIdValidator(), validateRequest, bookController.getById);
router.put(
  '/:id',
  authAdminMiddleware,
  paramIdValidator(),
  updateBookValidator(),
  validateRequest,
  bookController.update,
);
router.delete('/:id', authAdminMiddleware, paramIdValidator(), validateRequest, bookController.delete);

export default router;
