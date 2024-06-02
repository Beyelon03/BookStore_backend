import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/user.service';

export interface IUserController {
  registration(req: Request, res: Response): Promise<Response>;

  login(req: Request, res: Response): Promise<Response | undefined>;

  getById(req: Request, res: Response): Promise<void>;

  getAll(req: Request, res: Response): Promise<void>;

  update(req: Request, res: Response): Promise<void>;

  delete(req: Request, res: Response): Promise<void>;
}

class UserController implements IUserController {
  async registration(req: Request, res: Response): Promise<Response> {
    try {
      const userData: IUser = await UserService.registration(req.body);
      return res.status(201).json(userData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: 'Произошла неизвестная ошибка.' });
      }
    }
  }

  async login(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { username, password } = req.body;
      const userData = await UserService.login(username, password);
      return res.status(201).json(userData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: 'Произошла неизвестная ошибка.' });
      }
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getAll(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default new UserController();
