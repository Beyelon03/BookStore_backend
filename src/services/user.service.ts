import { IUser } from '../interfaces/IUser';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUserService {
  registration(user: IUser): Promise<IUser>;

  login(
    email: string,
    password: string,
  ): Promise<{
    token: string;
    user: { id: string; username: string; email: string };
  }>;

  getAll(): Promise<IUser[]>;

  getById(id: string): Promise<IUser | null>;

  update(userId: string, user: Partial<IUser>): Promise<IUser | null>;

  delete(userId: string): any;
}

const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret-key';

class UserService implements IUserService {
  async registration(user: IUser): Promise<IUser> {
    const existingUser = await User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });
    if (existingUser) {
      throw new Error('Пользователь с таким именем или email уже существует.');
    }

    const hashedPassword = await bcrypt.hash(user.password, 7);
    return await User.create({ ...user, password: hashedPassword });
  }

  async login(
    username: string,
    password: string,
  ): Promise<{
    token: string;
    user: { id: string; username: string; email: string };
  }> {
    const user = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });
    if (!user) {
      throw new Error('Пользователь с таким именем не найден.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Данные для авторизации введены не верно.');
    }

    const userDto = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: '24h',
      },
    );

    return { token: token, user: userDto };
  }

  async getAll(): Promise<IUser[]> {
    const users = await User.find();
    return users;
  }

  async getById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user;
  }

  async update(userId: string, user: Partial<IUser>): Promise<IUser | null> {
    const newUser = await User.findByIdAndUpdate(userId, user, { new: true });
    return newUser;
  }

  async delete(userId: string): Promise<void> {
    const deletedUser = await User.findByIdAndDelete(userId);
  }
}

export default new UserService();
