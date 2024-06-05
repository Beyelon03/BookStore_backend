import { IUser } from '../interfaces/IUser';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUserService {
  registration(user: IUser): Promise<IUser>;

  login(email: string, password: string): Promise<{token: string}>;

  getAll(): Promise<IUser[]>;

  getById(id: string): Promise<IUser | null>;

  update(userId: string, user: Partial<IUser>): Promise<IUser | null>;

  delete(userId: string): Promise<void>;
}

export const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret-key';

const generateAccessToken = (user: IUser) => {
  const payload = {
    id: user._id,
    role: user.role,
    username: user.username,
    email: user.email,
  };
  if (!JWT_SECRET) {
    throw new Error('Ошибка, отсутсвует JWT_SECRET');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

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

  async login(username: string, password: string): Promise<{token: string}> {
    const user = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });
    if (!user) {
      throw new Error(`Пользователь с именем ${username} не найден.`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Введен не верный пароль.');
    }

    const token = generateAccessToken(user);
    return { token };
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


