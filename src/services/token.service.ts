import { IUser } from '../interfaces/IUser';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../index';
import { ApiError } from '../exceptions/api.error';
import Token from '../models/Token';
import UserDto from '../dtos/user-dto';

class TokenService {
  generateTokens (payload: Partial<IUser>) {
    if (!JWT_ACCESS_SECRET) {
      throw new ApiError(400, 'Ошибка, не указан JWT_ACCESS_SECRET.');
    }
    if (!JWT_REFRESH_SECRET) {
      throw new ApiError(400, 'Ошибка, не указан JWT_REFRESH_SECRET.');
    }

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken })
    return token;
  }

}

export default new TokenService();
