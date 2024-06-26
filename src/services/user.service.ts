import { IUser, UserRoles } from '../interfaces/IUser';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/user.repository';
import { ApiError } from '../exceptions/api.error';
import TokenService from './token.service';
import UserDto from '../dtos/user-dto';
import { JwtPayload } from 'jsonwebtoken';
import ReviewService from './review.service';
import Book from '../models/Book';

class UserService {
  async registration(
    email: string,
    password: string,
    username: string,
  ): Promise<{ user: UserDto; accessToken: string; refreshToken: string }> {
    await this.checkIfUserExists(email, username);

    const hashedPassword = await bcrypt.hash(password, 3);
    const user = await UserRepository.create({
      email,
      username,
      password: hashedPassword,
      role: UserRoles.user,
      createdAt: new Date(),
    });

    return this.generateUserResponse(user);
  }

  async login(
    usernameOrEmail: string,
    password: string,
  ): Promise<{ user: UserDto; accessToken: string; refreshToken: string }> {
    const user = await this.findUserByUsernameOrEmail(usernameOrEmail);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw ApiError.BadRequest('Неверные данные для входа.');
    }

    return this.generateUserResponse(user);
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    await TokenService.removeToken(refreshToken);
    return { message: 'Токен удалён.' };
  }

  async refresh(refreshToken: string): Promise<{ user: UserDto; accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken) as JwtPayload;
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserRepository.findById(userData._id);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userData.id} не найден.`);
    }

    return this.generateUserResponse(user);
  }

  async getAll(): Promise<UserDto[]> {
    const users = await UserRepository.findAll();
    if (!users.length) {
      throw ApiError.NotFound('Список пользователей пуст.');
    }
    return users.map((user) => new UserDto(user));
  }

  async getById(userId: string): Promise<UserDto> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }
    return new UserDto(user);
  }

  async update(userId: string, user: Partial<IUser>): Promise<UserDto> {
    const existingUser = await UserRepository.findById(userId);
    if (!existingUser) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    const updatedUser = await UserRepository.updateById(userId, user);
    if (!updatedUser) {
      throw ApiError.BadRequest('Ошибка при обновлении пользователя.');
    }

    return new UserDto(updatedUser);
  }

  async delete(userId: string): Promise<void> {
    const existingUser = await UserRepository.findById(userId);
    if (!existingUser) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }

    await TokenService.removeTokenByUserId(existingUser._id);
    await ReviewService.deleteAllByUser(userId);

    const userBooks = existingUser.books || [];
    for (const bookId of userBooks) {
      await Book.updateOne({ _id: bookId }, { $pull: { seller: existingUser._id } });
    }

    await UserRepository.deleteById(userId);
  }

  private async checkIfUserExists(email: string, username: string): Promise<void> {
    const [existingUserByEmail, existingUserByUsername] = await Promise.all([
      UserRepository.findOneByEmail(email),
      UserRepository.findOneByUsername(username),
    ]);

    if (existingUserByEmail || existingUserByUsername) {
      throw ApiError.Conflict('Пользователь с таким именем или email уже существует.');
    }
  }

  private async findUserByUsernameOrEmail(usernameOrEmail: string): Promise<IUser | null> {
    return (
      (await UserRepository.findOneByUsername(usernameOrEmail)) ||
      (await UserRepository.findOneByEmail(usernameOrEmail))
    );
  }

  private async generateUserResponse(
    user: IUser,
  ): Promise<{ user: UserDto; accessToken: string; refreshToken: string }> {
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new UserService();
