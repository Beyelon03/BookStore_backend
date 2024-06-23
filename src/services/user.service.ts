import { IUser, UserRoles } from '../interfaces/IUser';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/user.repository';
import { ApiError } from '../exceptions/api.error';
import TokenService from './token.service';
import UserDto from '../dtos/user-dto';
import { JwtPayload } from 'jsonwebtoken';

class UserService {
  async registration(email: string, password: string, username: string) {
    const existingUserByEmail = await UserRepository.findOneByEmail(email);
    const existingUserByUsername = await UserRepository.findOneByUsername(username);

    if (existingUserByEmail || existingUserByUsername) {
      throw ApiError.Conflict('Пользователь с таким именем или email уже существует.');
    }
    const hashedPassword = await bcrypt.hash(password, 3);
    const user = await UserRepository.create({
      email,
      username,
      password: hashedPassword,
      role: UserRoles.user,
      createdAt: new Date(),
    });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto._id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(usernameOrEmail: string, password: string) {
    const user =
      (await UserRepository.findOneByUsername(usernameOrEmail)) ||
      (await UserRepository.findOneByEmail(usernameOrEmail));
    if (!user) {
      throw ApiError.NotFound(`Пользователь с именем или email ${usernameOrEmail} не найден.`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Введен не верный пароль.');
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return { message: 'Токен удалён.' };
  }

  async refresh(refreshToken: string) {
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

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto._id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAll(): Promise<Array<UserDto>> {
    const users = await UserRepository.findAll();
    if (!users) {
      throw ApiError.NotFound('Список пользователей пуст.');
    }
    const usersDto = UserDto.fromArray(users);
    return usersDto;
  }

  async getById(userId: string): Promise<UserDto | null> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }
    const userDto = new UserDto(user);
    return userDto;
  }

  async update(userId: string, user: Partial<IUser>): Promise<UserDto | null> {
    const existingUserById = await UserRepository.findById(userId);
    if (!existingUserById) {
      throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
    }
    const updatedUser = await UserRepository.updateById(userId, user);
    if (!updatedUser) {
      throw ApiError.BadRequest('Ошибка при обновлении пользователя.');
    }
    const userDto = new UserDto(updatedUser);
    return userDto;
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
