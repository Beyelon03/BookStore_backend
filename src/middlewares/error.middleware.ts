import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api.error';

export default function handleError(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }
  console.error(err);
  return res.status(500).json({ message: 'Непредвиденная ошибка.' });
}
