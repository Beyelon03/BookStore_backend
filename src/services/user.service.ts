import { IUser } from '../interfaces/IUser';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/user.repository';
import { ApiError } from '../exceptions/api.error';
import TokenService from './token.service';
import tokenService from './token.service';
import UserDto from '../dtos/user-dto';

class UserService {
  async registration(email: string, password: string, username: string) {
    const existingUserByEmail = await UserRepository.findOneByEmail(email);
    const existingUserByUsername =
      await UserRepository.findOneByUsername(username);

    if (existingUserByEmail || existingUserByUsername) {
      throw ApiError.Conflict(
        'Пользователь с таким именем или email уже существует.',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const user: IUser = await UserRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(
    usernameOrEmail: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user =
      (await UserRepository.findOneByUsername(usernameOrEmail)) ||
      (await UserRepository.findOneByEmail(usernameOrEmail));
    if (!user) {
      throw ApiError.NotFound(
        `Пользователь с именем или email ${usernameOrEmail} не найден.`,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.BadRequest('Введен не верный пароль.');
    }

    const token = TokenService.generateTokens(user);
    return { ...token };
  }

  async logout(
    usernameOrEmail: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user =
      (await UserRepository.findOneByUsername(usernameOrEmail)) ||
      (await UserRepository.findOneByEmail(usernameOrEmail));
    if (!user) {
      throw ApiError.NotFound(
        `Пользователь с именем или email ${usernameOrEmail} не найден.`,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.BadRequest('Введен не верный пароль.');
    }

    const token = TokenService.generateTokens(user);
    return { ...token };
  }

  async refresh(
    usernameOrEmail: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user =
      (await UserRepository.findOneByUsername(usernameOrEmail)) ||
      (await UserRepository.findOneByEmail(usernameOrEmail));
    if (!user) {
      throw ApiError.NotFound(
        `Пользователь с именем или email ${usernameOrEmail} не найден.`,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.BadRequest('Введен не верный пароль.');
    }

    const token = TokenService.generateTokens(user);
    return { ...token };
  }

  async getAll(): Promise<IUser[]> {
    const users = await UserRepository.findAll();
    if (!users) {
      throw ApiError.NotFound('Список пользователей пуст.');
    }
    return users;
  }

  async getById(userId: string): Promise<IUser | null> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }
    return user;
  }

  async update(userId: string, user: Partial<IUser>): Promise<IUser | null> {
    const existingUserById = await UserRepository.findById(userId);
    if (!existingUserById) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }
    return await UserRepository.updateById(userId, user);
  }

  async delete(userId: string): Promise<void> {
    const existingUserById = await UserRepository.findById(userId);
    if (!existingUserById) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }
    await UserRepository.deleteById(userId);
  }
}

export default new UserService();
