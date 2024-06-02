import { IUser } from '../interfaces/IUser';

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
    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<IUser[]> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  async update(userId: string, user: Partial<IUser>): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  async delete(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default new UserService();
