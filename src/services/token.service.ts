import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../index';
import { ApiError } from '../exceptions/api.error';
import Token from '../models/Token';
import { ObjectId } from 'mongoose';
import { IUser } from '../interfaces/IUser';

class TokenService {
  generateTokens(payload: Partial<IUser>): { accessToken: string; refreshToken: string } {
    if (!JWT_ACCESS_SECRET) {
      throw new ApiError(400, 'Ошибка, не указан JWT_ACCESS_SECRET.');
    }
    if (!JWT_REFRESH_SECRET) {
      throw new ApiError(400, 'Ошибка, не указан JWT_REFRESH_SECRET.');
    }

    const accessToken = jwt.sign({ ...payload }, JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ ...payload }, JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): string | JwtPayload | IUser | null {
    try {
      if (!JWT_ACCESS_SECRET) {
        throw new ApiError(400, 'Ошибка, не указан JWT_ACCESS_SECRET.');
      }
      return jwt.verify(token, JWT_ACCESS_SECRET) as IUser;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): string | JwtPayload | IUser | null {
    try {
      if (!JWT_REFRESH_SECRET) {
        throw new ApiError(400, 'Ошибка, не указан JWT_REFRESH_SECRET.');
      }
      return jwt.verify(token, JWT_REFRESH_SECRET) as IUser;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: ObjectId, refreshToken: string) {
    try {
      let tokenData = await Token.findOne({ user: userId });
      if (tokenData) {
        tokenData.refreshToken = refreshToken;
      } else {
        tokenData = await Token.create({ user: userId, refreshToken });
      }
      return tokenData.save();
    } catch (e) {
      throw new ApiError(500, 'Ошибка сохранения токена.');
    }
  }

  async removeToken(refreshToken: string) {
    try {
      return await Token.deleteOne({ refreshToken });
    } catch (e) {
      throw new ApiError(500, 'Ошибка удаления токена.');
    }
  }

  async removeTokenByUserId(userId: ObjectId): Promise<void> {
    try {
      await Token.deleteOne({ user: userId });
    } catch (e) {
      throw new ApiError(500, 'Ошибка удаления токена по userId.');
    }
  }

  async findToken(refreshToken: string) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (e) {
      throw new ApiError(500, 'Ошибка поиска токена.');
    }
  }
}

export default new TokenService();
