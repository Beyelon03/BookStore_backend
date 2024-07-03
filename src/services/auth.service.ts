import UserDto from '../dtos/user-dto';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/user.repository';
import { IUser, UserRoles } from '../interfaces/IUser';
import { ApiError } from '../exceptions/api.error';
import TokenService from './token.service';

class AuthService {
  async registration(
    email: string,
    password: string,
    username: string,
  ): Promise<{ user: UserDto; accessToken: string; refreshToken: string }> {
    await this.checkIfUserExists(email, username);

    const hashedPassword = await bcrypt.hash(password, 5);
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
      throw new ApiError(400, 'Неверные данные для входа.');
    }

    return this.generateUserResponse(user);
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    await TokenService.removeToken(refreshToken);
    return { message: 'Токен удалён.' };
  }

  async refresh(refreshToken: string): Promise<{ user: UserDto; accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw new ApiError(401, 'Отсутствует токен обновления.');
    }

    const userData = TokenService.validateRefreshToken(refreshToken) as IUser;
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new ApiError(401, 'Недействительный токен обновления.');
    }

    const user = await UserRepository.findById(userData._id.toString());
    if (!user) {
      throw new ApiError(404, `Пользователь с id: ${userData._id} не найден.`);
    }

    return this.generateUserResponse(user);
  }

  private async checkIfUserExists(email: string, username: string): Promise<void> {
    const [existingUserByEmail, existingUserByUsername] = await Promise.all([
      UserRepository.findOneByEmail(email),
      UserRepository.findOneByUsername(username),
    ]);

    if (existingUserByEmail || existingUserByUsername) {
      throw new ApiError(409, 'Пользователь с таким именем или email уже существует.');
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
    const tokens = TokenService.generateTokens(userDto);
    await TokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new AuthService();
