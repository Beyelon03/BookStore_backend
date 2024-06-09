import { IReview } from '../interfaces/IUser';
import Review from '../models/Review';

class ReviewService {
  async create(reviewDto: IReview): Promise<IReview | null> {
    const review = await Review.create({ reviewDto });
    return review;
  }

  async getAll(): Promise<IReview[] | null> {
    const reviews = await Review.find();
    return reviews;
  }

  async getById(reviewId: string): Promise<IReview | null> {
    const review = await Review.findById(reviewId);
    return review;
  }

  async update(reviewId: string, newReview: IReview): Promise<IReview | null> {
    const review = await Review.findByIdAndUpdate(reviewId, newReview, {
      new: true,
    });
    return review;
  }

  async delete(reviewId: string): Promise<void> {
    const review = await Review.findByIdAndDelete(reviewId);
  }
}

export default new ReviewService();
