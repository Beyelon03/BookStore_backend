import { IUser } from '../interfaces/IUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';

export const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret-key';

const generateAccessToken = (user: IUser) => {
  const payload: Partial<IUser> = {
    _id: user._id,
    role: user.role,
    username: user.username,
    email: user.email,
  };
  if (!JWT_SECRET) {
    throw new Error('Ошибка, отсутсвует JWT_SECRET');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

class UserService {
  async registration(user: IUser): Promise<IUser> {
    const existingUserByEmail = await UserRepository.findOneByEmail(user.email);
    const existingUserByUsername = await UserRepository.findOneByUsername(
      user.username,
    );
    if (existingUserByEmail || existingUserByUsername) {
      throw new Error('Пользователь с таким именем или email уже существует.');
    }

    const hashedPassword = await bcrypt.hash(user.password, 7);
    return await UserRepository.create({ ...user, password: hashedPassword });
  }

  async login(
    usernameOrEmail: string,
    password: string,
  ): Promise<{
    token: string;
  }> {
    const user =
      (await UserRepository.findOneByUsername(usernameOrEmail)) ||
      (await UserRepository.findOneByEmail(usernameOrEmail));
    if (!user) {
      throw new Error(`Пользователь с именем или email ${usernameOrEmail} не найден.`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Введен не верный пароль.');
    }

    const token = generateAccessToken(user);
    return { token };
  }

  async getAll(): Promise<IUser[]> {
    const users = await UserRepository.findAll();
    if (!users) {
      throw new Error('Список пользователей пуст.');
    }
    return users;
  }

  async getById(userId: string): Promise<IUser | null> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error(`Пользователь с id: ${userId} не найден.`);
    }
    return user;
  }

  async update(userId: string, user: Partial<IUser>): Promise<IUser | null> {
    const existingUserById = await UserRepository.findById(userId);
    if (!existingUserById) {
      throw new Error(`Пользователь с id: ${userId} не найден.`);
    }
    return await UserRepository.updateById(userId, user);
  }

  async delete(userId: string): Promise<void> {
    const existingUserById = await UserRepository.findById(userId);
    if (!existingUserById) {
      throw new Error(`Пользователь с id: ${userId} не найден.`);
    }
    await UserRepository.deleteById(userId);
  }
}

export default new UserService();
