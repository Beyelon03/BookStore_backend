import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../services/user.service';

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
      return res.status(403).json({ message: 'Пользователь не авторизован.' });
    }
    const decodeData: IDecodeData = jwt.verify(
      token,
      JWT_SECRET,
    ) as IDecodeData;
    if (decodeData.role === 'seller' || decodeData.role === 'admin') {
      req.user = decodeData;
      next();
    } else {
      return res
        .status(403)
        .json({ message: 'У Вас нет прав для этого действия.' });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ message: 'Пользователь не авторизован.' });
    } else {
      return res.status(403).json({ message: 'Произошла неизвестная ошибка.' });
    }
  }
}
