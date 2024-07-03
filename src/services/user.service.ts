import { IUser } from '../interfaces/IUser';
import UserRepository from '../repositories/user.repository';
import { ApiError } from '../exceptions/api.error';
import TokenService from './token.service';
import UserDto from '../dtos/user-dto';
import ReviewService from './review.service';
import Book from '../models/Book';

class UserService {
  async getAll(): Promise<UserDto[]> {
    try {
      const users = await UserRepository.findAll();
      if (!users.length) {
        throw ApiError.NotFound();
      }
      return users.map((user) => new UserDto(user));
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async getById(userId: string): Promise<UserDto> {
    try {
      const user = await UserRepository.findById(userId);
      if (!user) {
        throw ApiError.NotFound();
      }
      return new UserDto(user);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async update(userId: string, user: Partial<IUser>): Promise<UserDto> {
    try {
      const existingUser = await UserRepository.findById(userId);
      if (!existingUser) {
        throw ApiError.NotFound();
      }

      const updatedUser = await UserRepository.updateById(userId, user);
      if (!updatedUser) {
        throw ApiError.BadRequest();
      }

      return new UserDto(updatedUser);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      const existingUser = await UserRepository.findById(userId);
      if (!existingUser) {
        throw ApiError.NotFound();
      }

      await TokenService.removeTokenByUserId(existingUser._id);
      await ReviewService.deleteAllByUser(userId);

      await Book.updateMany({ seller: existingUser._id }, { $pull: { seller: existingUser._id } });

      await UserRepository.deleteById(userId);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }
}

export default new UserService();
