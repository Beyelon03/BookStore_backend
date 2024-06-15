import { IReview } from '../interfaces/IUser';
import Review from '../models/Review';

class ReviewService {
  async create(reviewDto: IReview): Promise<IReview | null> {
    const review = await Review.create({ reviewDto });
    if (!review) {
      throw Error('Ошибка при создании комментария.');
    }
    return review;
  }

  async getAll(): Promise<IReview[] | null> {
    const reviews = await Review.find();
    if (!reviews) {
      throw Error('Ошибка при получении комментариев.');
    }
    return reviews;
  }

  async getById(reviewId: string): Promise<IReview | null> {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw Error('Ошибка при получении комментария.');
    }
    return review;
  }

  async update(reviewId: string, newReview: IReview): Promise<IReview | null> {
    const review = await Review.findByIdAndUpdate(reviewId, newReview, {
      new: true,
    });
    if (!review) {
      throw Error('Ошибка при обновлении комментария.');
    }
    return review;
  }

  async delete(reviewId: string): Promise<void> {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      throw Error('Ошибка при удалении комментария.');
    }
  }
}

export default new ReviewService();
