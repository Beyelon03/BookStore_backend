import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { ApiError } from '../exceptions/api.error';

class UserController {
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userData = await UserService.getById(id);
      if (!userData) {
        return next(ApiError.NotFound(`Пользователь с id: ${id} не найден.`));
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
      const { id } = req.params;
      const user = await UserService.update(id, req.body);
      if (!user) {
        return next(ApiError.NotFound(`Пользователь с id: ${id} не найден.`));
      }
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await UserService.delete(id);
      res.status(200).json({ message: `Пользователь с id: ${id} удалён.` });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
