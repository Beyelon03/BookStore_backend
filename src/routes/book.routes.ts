import { Router } from 'express';
import BookController from '../controllers/book.controller';
import { authAdminMiddleware } from '../middlewares/auth.middleware';
import { getBookValidation, updateBookValidator } from '../middlewares/book.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';

class BookRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/create', authAdminMiddleware, getBookValidation(), validateRequest, BookController.create);
    this.router.get('/', BookController.getAll);
    this.router.get('/:bookId', BookController.getById);
    this.router.put('/:bookId', authAdminMiddleware, updateBookValidator(), validateRequest, BookController.update);
    this.router.delete('/:bookId', authAdminMiddleware, BookController.delete);
  }
}

export default new BookRoutes().router;
