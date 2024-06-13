import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/user.service';
import { ApiError } from '../exceptions/api.error';

class UserController {
  async registration(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userData: IUser = await UserService.registration(req.body);
      res.status(201).json(userData);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при регистрации.'));
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await UserService.login(username, password);
      res.status(200).json(token);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при авторизации.'));
      }
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const userData = await UserService.getById(id);
      if (!userData) {
        next(new ApiError(404, `Пользователь с id: ${id} не найден.`));
        return;
      }
      res.status(200).json(userData);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при получении пользователя.'));
      }
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при получении пользователей.'));
      }
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user: IUser | null = await UserService.update(id, req.body);
      if (!user) {
        next(new ApiError(404, `Пользователь с id: ${id} не найден.`));
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при обновлении пользователя.'));
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await UserService.delete(id);
      res.status(200).json({ message: `Пользователь с id: ${id} удалён.` });
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при удалении пользователя.'));
      }
    }
  }
}

export default new UserController();
