import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/user.service';

export interface IUserController {
  registration(req: Request, res: Response): Promise<Response<IUser | null>>;

  login(req: Request, res: Response): Promise<Response<string | undefined>>;

  getById(req: Request, res: Response): Promise<Response<IUser | null>>;

  getAll(req: Request, res: Response): Promise<Response<IUser[] | null>>;

  update(req: Request, res: Response): Promise<Response<IUser | null>>;

  delete(
    req: Request,
    res: Response,
  ): Promise<
    Response<{
      message: string;
    } | null>
  >;
}

class UserController implements IUserController {
  async registration(
    req: Request,
    res: Response,
  ): Promise<Response<IUser | null>> {
    try {
      const userData: IUser = await UserService.registration(req.body);
      return res.status(201).json(userData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла неизвестная ошибка.' });
      }
    }
  }

  async login(
    req: Request,
    res: Response,
  ): Promise<Response<string | undefined>> {
    try {
      const { username, password } = req.body;
      const userData = await UserService.login(username, password);
      return res.status(201).json(userData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла неизвестная ошибка.' });
      }
    }
  }

  async getById(req: Request, res: Response): Promise<Response<IUser | null>> {
    try {
      const { id } = req.params;
      const userData = await UserService.getById(id);
      return res.status(201).json(userData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла неизвестная ошибка.' });
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<Response<IUser[] | null>> {
    try {
      const users = await UserService.getAll();
      return res.status(201).json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла неизвестная ошибка.' });
      }
    }
  }

  async update(req: Request, res: Response): Promise<Response<IUser | null>> {
    try {
      const { id } = req.params;
      const user: IUser | null = await UserService.update(id, req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла неизвестная ошибка.' });
      }
    }
  }

  async delete(
    req: Request,
    res: Response,
  ): Promise<
    Response<{
      message: string;
    } | null>
  > {
    try {
      const { id } = req.params;
      await UserService.delete(id);
      return res
        .status(201)
        .json({ message: `Пользователь с id: ${id} удалён.` });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла неизвестная ошибка.' });
      }
    }
  }
}

export default new UserController();
