import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../services/user.service';
import { UserRoles } from '../interfaces/IUser';

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

export default function adminMiddleware(
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
    if (decodeData.role === UserRoles.admin) {
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
