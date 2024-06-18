import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRoles } from '../interfaces/IUser';
import { ApiError } from '../exceptions/api.error';
import { JWT_ACCESS_SECRET } from '../index';

export interface IDecodeData {
  id: string;
  role: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: IDecodeData;
  }
}

export default function sellerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }
    if (!JWT_ACCESS_SECRET) {
      return next(new ApiError(400, 'Отсутсвует JWT_ACCESS_SECRET'));
    }
    const decodeData: IDecodeData = jwt.verify(
      token,
      JWT_ACCESS_SECRET,
    ) as IDecodeData;
    if (
      decodeData.role === UserRoles.seller ||
      decodeData.role === UserRoles.admin
    ) {
      req.user = decodeData;
      next();
    } else {
      return next(ApiError.Forbidden());
    }
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
