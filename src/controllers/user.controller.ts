import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { ApiError } from '../exceptions/api.error';

class UserController {
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userData = await UserService.getById(userId);
      if (!userData) {
        return next(ApiError.NotFound());
      }
      res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await UserService.update(userId, req.body);
      if (!user) {
        return next(ApiError.NotFound());
      }
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      await UserService.delete(userId);
      res.status(200).json({ message: `Пользователь удалён.` });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
