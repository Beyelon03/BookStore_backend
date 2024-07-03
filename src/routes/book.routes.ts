import { Router } from 'express';
import BookController from '../controllers/book.controller';
import { authAdminMiddleware } from '../middlewares/auth.middleware';
import { getBookValidation, updateBookValidator } from '../middlewares/book.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';

const router = Router();

router.post('/create', authAdminMiddleware, getBookValidation(), validateRequest, BookController.create);
router.get('/', BookController.getAll);
router.get('/:bookId', BookController.getById);
router.put('/:bookId', authAdminMiddleware, updateBookValidator(), validateRequest, BookController.update);
router.delete('/:bookId', authAdminMiddleware, BookController.delete);

export default router;
