import { ApiError } from '../exceptions/api.error';
import BookRepository from '../repositories/book.repository';
import UserDto from '../dtos/user-dto';
import User from '../models/User';
import { ObjectId } from 'mongoose';
import { IOrderItem } from '../interfaces/IUser';

class CartService {
  async addToCart(userId: ObjectId, bookId: ObjectId, quantity: number): Promise<UserDto> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    const book = await BookRepository.findById(bookId.toString());
    if (!book) {
      throw ApiError.NotFound(`Книга с id: ${bookId} не найдена.`);
    }

    const existingCartItem = user.cart.find((item) => item.book.toString() === bookId.toString());
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ book: bookId, quantity });
    }

    await user.save();

    return new UserDto(user);
  }

  async removeFromCart(userId: ObjectId, bookId: ObjectId): Promise<UserDto> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    const cartItemIndex = user.cart.findIndex((item) => item.book.toString() === bookId.toString());
    if (cartItemIndex === -1) {
      throw ApiError.NotFound(`Книга с id: ${bookId} не найдена в корзине пользователя.`);
    }

    user.cart.splice(cartItemIndex, 1);
    await user.save();

    return new UserDto(user);
  }

  async getAllCartItems(userId: string): Promise<IOrderItem[]> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    return user.cart;
  }
}

export default new CartService();
