import { IUser } from '../interfaces/IUser';
import User from '../models/User';

class UserRepository {
  async findOneByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  async findOneByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username }).exec();
  }

  async create(user: IUser): Promise<IUser> {
    return User.create(user);
  }

  async findAll(): Promise<IUser[]> {
    return User.find().exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  async updateById(userId: string, user: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, user, { new: true }).exec();
  }

  async deleteById(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId).exec();
  }
}

export default new UserRepository();
