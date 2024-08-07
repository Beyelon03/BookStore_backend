import mongoose from 'mongoose';
import { ApiError } from '../exceptions/api.error';
import User from '../models/User';
import UserDto from '../dtos/user-dto';
import { IOrderItem } from '../interfaces/IUser';

interface ResponseOrderDetails {
  items: IOrderItem[];
  totalAmount: number;
}

interface ResponseAllOrder {
  orderId: string;
  orderDate: Date;
}

class OrderService {
  async createOrder(userId: string, items: IOrderItem[], totalAmount: number): Promise<UserDto> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound();
    }

    const orderId = new mongoose.Types.ObjectId().toHexString();

    const newOrder = {
      orderId: orderId,
      items: items.map((item) => ({ book: item.book, quantity: item.quantity })),
      totalAmount,
      orderDate: new Date(),
    };

    user.orders.push(newOrder);
    await user.save();

    return new UserDto(user);
  }

  async getAllOrders(userId: string): Promise<ResponseAllOrder[]> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound();
    }

    return user.orders.map((order) => ({
      orderId: order.orderId,
      orderDate: order.orderDate,
    }));
  }

  async getOrderDetails(userId: string, orderId: string): Promise<ResponseOrderDetails> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound();
    }

    const order = user.orders.find((order) => order.orderId === orderId);
    if (!order) {
      throw ApiError.NotFound();
    }

    return {
      items: order.items,
      totalAmount: order.totalAmount,
    };
  }
}

export default new OrderService();
