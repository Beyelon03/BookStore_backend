import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { authUserMiddleware } from '../middlewares/auth.middleware';

class OrderRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/:userId', authUserMiddleware, OrderController.createOrder);
    this.router.get('/:userId', authUserMiddleware, OrderController.getAllOrders);
    this.router.get('/:userId/:orderId', authUserMiddleware, OrderController.getOrderDetails);
  }
}

export default new OrderRoutes().router;
