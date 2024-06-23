import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { ApiError } from '../exceptions/api.error';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username } = req.body;
      const userData = await UserService.registration(email, password, username);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(201).json(userData);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(200).json(token);
    } catch (error) {
      return next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      return next(error);
    }
  }

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
