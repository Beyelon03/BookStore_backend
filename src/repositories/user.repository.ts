import { IUser } from '../interfaces/IUser';
import User from '../models/User';
import { Model } from 'mongoose';

class UserRepository {
  private readonly userModel: Model<IUser>;

  constructor(model: Model<IUser>) {
    this.userModel = model;
  }

  async create(user: Partial<IUser>): Promise<IUser> {
    return this.userModel.create(user);
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email });
  }

  async findOneByUsername(username: string): Promise<IUser | null> {
    return this.userModel.findOne({ username });
  }

  async findById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id);
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find();
  }

  async updateById(userId: string, user: Partial<IUser>): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(userId, user, { new: true });
  }

  async deleteById(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId);
  }
}

export default new UserRepository(User);
