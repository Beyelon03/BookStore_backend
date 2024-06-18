import { IReview } from '../interfaces/IUser';
import { ApiError } from '../exceptions/api.error';
import ReviewRepository from '../repositories/review.repository';

class ReviewService {
  async create(reviewDto: IReview): Promise<IReview | null> {
    const review = await ReviewRepository.create(reviewDto);
    if (!review) {
      throw ApiError.BadRequest('Ошибка при создании комментария.');
    }
    return review;
  }

  async getAll(): Promise<IReview[] | null> {
    const reviews = await ReviewRepository.getAll();
    if (!reviews) {
      throw ApiError.NotFound('Ошибка при получении комментариев.');
    }
    return reviews;
  }

  async getById(reviewId: string): Promise<IReview | null> {
    const review = await ReviewRepository.findById(reviewId);
    if (!review) {
      throw ApiError.NotFound('Ошибка при получении комментария.');
    }
    return review;
  }

  async update(reviewId: string, newReview: IReview): Promise<IReview | null> {
    const review = await ReviewRepository.updateById(reviewId, newReview);
    if (!review) {
      throw ApiError.BadRequest('Ошибка при обновлении комментария.');
    }
    return review;
  }

  async delete(reviewId: string): Promise<void> {
    const existingReviewById = await ReviewRepository.findById(reviewId);
    if (!existingReviewById) {
      throw ApiError.NotFound(`Комментарий с id: ${reviewId} не найден.`);
    }
    const review = await ReviewRepository.deleteById(reviewId);
  }
}

export default new ReviewService();
