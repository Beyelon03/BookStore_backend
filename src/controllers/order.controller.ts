import { NextFunction, Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const { items, totalAmount } = req.body;
    try {
      const user = await OrderService.createOrder(userId, items, totalAmount);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      const orders = await OrderService.getAllOrders(userId);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getOrderDetails(req: Request, res: Response, next: NextFunction) {
    const { userId, orderId } = req.params;
    try {
      const orderDetails = await OrderService.getOrderDetails(userId, orderId);
      res.json(orderDetails);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
