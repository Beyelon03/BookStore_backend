import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
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
        next(error);
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const token = await UserService.login(username, password);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const token = await UserService.logout(username, password);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const token = await UserService.refresh(username, password);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userData = await UserService.getById(id);
      if (!userData) {
        next(ApiError.NotFound(`Пользователь с id: ${id} не найден.`));
        return;
      }
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user: IUser | null = await UserService.update(id, req.body);
      if (!user) {
        next(ApiError.NotFound(`Пользователь с id: ${id} не найден.`));
        return;
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await UserService.delete(id);
      res.status(200).json({ message: `Пользователь с id: ${id} удалён.` });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
