import mongoose, { ObjectId } from 'mongoose';
import { ApiError } from '../exceptions/api.error';
import User from '../models/User';
import UserDto from '../dtos/user-dto';

class OrderService {
  async createOrder(
    userId: string,
    items: { book: ObjectId; quantity: number }[],
    totalAmount: number,
  ): Promise<UserDto> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    const orderId = new mongoose.Types.ObjectId().toHexString(); // Генерация нового ObjectId

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

  async getAllOrders(userId: string): Promise<{ orderId: string; orderDate: Date }[]> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    return user.orders.map((order) => ({
      orderId: order.orderId,
      orderDate: order.orderDate,
    }));
  }

  async getOrderDetails(
    userId: string,
    orderId: string,
  ): Promise<{ items: { book: ObjectId; quantity: number }[]; totalAmount: number }> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    const order = user.orders.find((order) => order.orderId === orderId);
    if (!order) {
      throw ApiError.NotFound(`Заказ с id: ${orderId} не найден у пользователя с id: ${userId}.`);
    }

    return {
      items: order.items,
      totalAmount: order.totalAmount,
    };
  }
}

export default new OrderService();
