import UserDto from '../dtos/user-dto';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/user.repository';
import { IUser, UserRoles } from '../interfaces/IUser';
import { ApiError } from '../exceptions/api.error';
import TokenService from './token.service';

interface userAuthResponse {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async registration(email: string, password: string, username: string): Promise<userAuthResponse> {
    try {
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
    } catch (error) {
      throw ApiError.BadRequest();
    }
  }

  async login(usernameOrEmail: string, password: string): Promise<userAuthResponse> {
    try {
      const user = await this.findUserByUsernameOrEmail(usernameOrEmail);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw ApiError.UnauthorizedError('Неверный логин или пароль.');
      }

      return this.generateUserResponse(user);
    } catch (error) {
      throw ApiError.BadRequest();
    }
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    try {
      await TokenService.removeToken(refreshToken);
      return { message: 'Токен удалён.' };
    } catch (error) {
      throw ApiError.BadRequest();
    }
  }

  async refresh(refreshToken: string): Promise<userAuthResponse> {
    try {
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
        throw ApiError.NotFound();
      }

      return this.generateUserResponse(user);
    } catch (error) {
      throw ApiError.BadRequest();
    }
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

  private async generateUserResponse(user: IUser): Promise<userAuthResponse> {
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens(userDto);
    await TokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new AuthService();
