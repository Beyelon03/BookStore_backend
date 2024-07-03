import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authAdminMiddleware, authUserMiddleware } from '../middlewares/auth.middleware';
import { updateUserValidation } from '../middlewares/user.validator.middleware';
import validateRequest from '../middlewares/validateRequest.middleware';

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', authUserMiddleware, UserController.getAll);
    this.router.get('/:userId', authUserMiddleware, UserController.getById);
    this.router.put('/:userId', authAdminMiddleware, updateUserValidation(), validateRequest, UserController.update);
    this.router.delete('/:userId', authAdminMiddleware, UserController.delete);
  }
}

export default new UserRoutes().router;
