import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { authUserMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/:userId/orders', authUserMiddleware, OrderController.createOrder);
router.get('/:userId/orders', authUserMiddleware, OrderController.getAllOrders);
router.get('/:userId/orders/:orderId', authUserMiddleware, OrderController.getOrderDetails);

export default router;
