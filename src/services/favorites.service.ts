import { ApiError } from '../exceptions/api.error';
import BookRepository from '../repositories/book.repository';
import UserDto from '../dtos/user-dto';
import User from '../models/User';
import { ObjectId } from 'mongoose';

class FavoritesService {
  async addToFavorites(userId: string, bookId: ObjectId): Promise<UserDto> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound();
    }

    const book = await BookRepository.findById(bookId.toString());
    if (!book) {
      throw ApiError.NotFound();
    }

    if (user.favorites.includes(bookId)) {
      throw ApiError.Conflict('Книга уже добавлена в избранное.');
    }

    user.favorites.push(bookId);
    await user.save();

    return new UserDto(user);
  }

  async removeFromFavorites(userId: string, bookId: ObjectId): Promise<UserDto> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound();
    }

    const bookIndex = user.favorites.indexOf(bookId);
    if (bookIndex === -1) {
      throw ApiError.NotFound();
    }

    user.favorites.splice(bookIndex, 1);
    await user.save();

    return new UserDto(user);
  }

  async getAllFavorites(userId: string): Promise<UserDto> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound();
    }

    return new UserDto(user);
  }
}

export default new FavoritesService();
