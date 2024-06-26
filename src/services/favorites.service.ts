import { ApiError } from '../exceptions/api.error';
import BookRepository from '../repositories/book.repository';
import UserDto from '../dtos/user-dto';
import User from '../models/User';
import { ObjectId } from 'mongoose';

class FavoritesService {
  async addToFavorites(userId: ObjectId, bookId: ObjectId): Promise<UserDto> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    const book = await BookRepository.findById(bookId.toString());
    if (!book) {
      throw ApiError.NotFound(`Книга с id: ${bookId} не найдена.`);
    }

    if (user.favorites.includes(bookId)) {
      throw ApiError.Conflict('Книга уже добавлена в избранное.');
    }

    user.favorites.push(bookId);
    await user.save();

    return new UserDto(user);
  }

  async removeFromFavorites(userId: ObjectId, bookId: ObjectId): Promise<UserDto> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    const bookIndex = user.favorites.indexOf(bookId);
    if (bookIndex === -1) {
      throw ApiError.NotFound(`Книга с id: ${bookId} не найдена в избранном пользователя.`);
    }

    user.favorites.splice(bookIndex, 1);
    await user.save();

    return new UserDto(user);
  }

  async getAllFavorites(userId: ObjectId): Promise<ObjectId[]> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    return user.favorites;
  }
}

export default new FavoritesService();
