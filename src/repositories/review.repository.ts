import { IReview } from '../interfaces/IReview';
import Review from '../models/Review';
import { Model } from 'mongoose';

class ReviewRepository {
  private readonly reviewModel: Model<IReview>;

  constructor(model: Model<IReview>) {
    this.reviewModel = model;
  }

  async create(review: Partial<IReview>): Promise<IReview> {
    return this.reviewModel.create(review);
  }

  async deleteMany(filter: any): Promise<void> {
    await this.reviewModel.deleteMany(filter);
  }

  async getAll(): Promise<IReview[]> {
    return this.reviewModel.find().exec();
  }

  async findById(id: string): Promise<IReview | null> {
    return this.reviewModel.findById(id).exec();
  }

  async updateById(reviewId: string, review: Partial<IReview>): Promise<IReview | null> {
    return this.reviewModel.findByIdAndUpdate(reviewId, review, { new: true }).exec();
  }

  async deleteById(reviewId: string): Promise<void> {
    await this.reviewModel.findByIdAndDelete(reviewId).exec();
  }
}

export default new ReviewRepository(Review);
