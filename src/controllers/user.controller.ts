import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/user.service';
import { ApiError } from '../exceptions/api.error';

class UserController {
  async registration(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password, username } = req.body;
      const userData = await UserService.registration(email, password, username);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(201).json(userData);
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

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<{ token: string }> | void> {
    try {
      const { username, password } = req.body;
      const token = await UserService.login(username, password);
      return res.status(200).json({ token });
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

  async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<{ token: string }> | void> {
    try {
      const { username, password } = req.body;
      const token = await UserService.logout(username, password);
      return res.status(200).json({ token });
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

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<{ token: string }> | void> {
    try {
      const { username, password } = req.body;
      const token = await UserService.refresh(username, password);
      return res.status(200).json({ token });
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
  ): Promise<Response<IUser> | void> {
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

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]> | void> {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
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

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser> | void> {
    try {
      const { id } = req.params;
      const user: IUser | null = await UserService.update(id, req.body);
      if (!user) {
        next(new ApiError(404, `Пользователь с id: ${id} не найден.`));
        return;
      }
      return res.status(200).json(user);
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

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
