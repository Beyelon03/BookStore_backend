import { Router } from 'express';
import validateRequest from '../middlewares/validateRequest.middleware';
import { authUserMiddleware } from '../middlewares/auth.middleware';
import AuthController from '../controllers/auth.controller';
import { getRegistrationValidation } from '../middlewares/user.validator.middleware';

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/registration', getRegistrationValidation(), validateRequest, AuthController.registration);
    this.router.post('/login', AuthController.login);
    this.router.post('/logout', authUserMiddleware, AuthController.logout);
    this.router.get('/refresh', authUserMiddleware, AuthController.refresh);
  }
}

export default new AuthRoutes().router;
