import { IReview } from '../interfaces/IUser';
import Review from '../models/Review';

class ReviewRepository {
  async create(review: Partial<IReview>): Promise<IReview> {
    return Review.create(review);
  }

  async getAll(): Promise<IReview[]> {
    return Review.find().exec();
  }

  async findById(id: string): Promise<IReview | null> {
    return Review.findById(id).exec();
  }

  async find(criteria: { book: string }): Promise<IReview[]> {
    return Review.find(criteria).exec();
  }

  async updateById(reviewId: string, review: Partial<IReview>): Promise<IReview | null> {
    return Review.findByIdAndUpdate(reviewId, review, { new: true }).exec();
  }

  async deleteById(reviewId: string): Promise<void> {
    await Review.findByIdAndDelete(reviewId).exec();
  }
}

export default new ReviewRepository();
