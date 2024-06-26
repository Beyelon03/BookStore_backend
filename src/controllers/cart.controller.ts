import { NextFunction, Request, Response } from 'express';
import CartService from '../services/cart.service';

class CartController {
  async addToCart(req: Request, res: Response, next: NextFunction) {
    const { userId, bookId, quantity } = req.body;
    try {
      const updatedUser = await CartService.addToCart(userId, bookId, quantity);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req: Request, res: Response, next: NextFunction) {
    const { userId, bookId } = req.body;
    try {
      const updatedUser = await CartService.removeFromCart(userId, bookId);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async getAllCartItems(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      const cartItems = await CartService.getAllCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
