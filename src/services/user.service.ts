import { IUser } from '../interfaces/IUser';
import UserModel from '../models/User';
import User from '../models/User';
import bcrypt from 'bcrypt';

interface IUserService {
  registration(user: IUser): Promise<IUser>;

  login(email: string, password: string): Promise<string>;

  getAll(): Promise<IUser[]>;

  getById(id: string): Promise<IUser>;

  update(userId: string, user: Partial<IUser>): Promise<IUser>;

  delete(userId: string): Promise<void>;
}

class UserService implements IUserService {
  async registration(user: IUser): Promise<IUser> {
    const existingUser = await UserModel.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });
    if (existingUser) {
      throw new Error('Пользователь с таким именем или email уже существует');
    }

    const hashedPassword = await bcrypt.hash(user.password, 7);
    return await User.create({ ...user, password: hashedPassword });
  }

  async login(email: string, password: string): Promise<string> {
    throw new Error('Fix');
  }

  async getAll(): Promise<IUser[]> {
    throw new Error('Fix');
  }

  async getById(id: string): Promise<IUser> {
    throw new Error('Fix');
  }

  async update(userId: string, user: Partial<IUser>): Promise<IUser> {
    throw new Error('Fix');
  }

  async delete(userId: string): Promise<void> {
    throw new Error('Fix');
  }
}

export default new UserService();
