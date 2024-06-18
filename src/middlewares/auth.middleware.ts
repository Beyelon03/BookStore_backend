import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IDecodeData } from './admin.middleware';
import { ApiError } from '../exceptions/api.error';
import { JWT_ACCESS_SECRET } from '../index';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IDecodeData;
  }
}

export default function authMiddleware(
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
    req.user = decodeData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
