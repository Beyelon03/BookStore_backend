import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { IUser } from '../interfaces/IUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUserController {
  registration(req: Request, res: Response): Promise<void>;

  login(req: Request, res: Response): Promise<void>;

  getById(req: Request, res: Response): Promise<void>;

  getAll(req: Request, res: Response): Promise<void>;

  update(req: Request, res: Response): Promise<void>;

  delete(req: Request, res: Response): Promise<void>;
}

class UserController implements IUserController {
  async registration(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async login(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented.');
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