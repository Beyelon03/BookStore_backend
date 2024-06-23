import { IUser } from '../interfaces/IUser';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../index';
import { ApiError } from '../exceptions/api.error';
import Token from '../models/Token';
import { ObjectId } from 'mongoose';

class TokenService {
  generateTokens(payload: Partial<IUser>): { accessToken: string; refreshToken: string } {
    if (!JWT_ACCESS_SECRET) {
      throw new ApiError(400, 'Ошибка, не указан JWT_ACCESS_SECRET.');
    }
    if (!JWT_REFRESH_SECRET) {
      throw new ApiError(400, 'Ошибка, не указан JWT_REFRESH_SECRET.');
    }

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
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
      const userData = jwt.verify(token, JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): string | JwtPayload | IUser | null {
    try {
      if (!JWT_REFRESH_SECRET) {
        throw new ApiError(400, 'Ошибка, не указан JWT_REFRESH_SECRET.');
      }
      const userData = jwt.verify(token, JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: ObjectId, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
