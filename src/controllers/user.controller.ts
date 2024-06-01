import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.create(req.body);
      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UserController();
