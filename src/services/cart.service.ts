import { ApiError } from '../exceptions/api.error';
import BookRepository from '../repositories/book.repository';
import UserDto from '../dtos/user-dto';
import User from '../models/User';
import { ObjectId } from 'mongoose';
import { IOrderItem } from '../interfaces/IUser';

class CartService {
  async addToCart(userId: string, bookId: ObjectId, quantity: number): Promise<UserDto> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw ApiError.NotFound();
      }

      const book = await BookRepository.findById(bookId.toString());
      if (!book) {
        throw ApiError.NotFound();
      }

      const existingCartItem = user.cart.find((item) => item.book.toString() === bookId.toString());
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        user.cart.push({ book: bookId, quantity });
      }

      await user.save();

      return new UserDto(user);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async removeFromCart(userId: string, bookId: ObjectId): Promise<UserDto> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw ApiError.NotFound();
      }

      const cartItemIndex = user.cart.findIndex((item) => item.book.toString() === bookId.toString());
      if (cartItemIndex === -1) {
        throw ApiError.NotFound();
      }

      user.cart.splice(cartItemIndex, 1);
      await user.save();

      return new UserDto(user);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async getAllCartItems(userId: string): Promise<IOrderItem[]> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw ApiError.NotFound();
      }

      return user.cart;
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }
}

export default new CartService();
