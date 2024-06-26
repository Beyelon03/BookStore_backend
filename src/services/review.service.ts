import { IReview } from '../interfaces/IReview';
import { ApiError } from '../exceptions/api.error';
import ReviewRepository from '../repositories/review.repository';
import User from '../models/User';
import ReviewDto from '../dtos/review-dto';

class ReviewService {
  async create(reviewDto: Partial<IReview>): Promise<ReviewDto> {
    try {
      const review = await ReviewRepository.create(reviewDto);
      if (!review) {
        throw ApiError.BadRequest('Ошибка при создании комментария.');
      }

      const user = await User.findById(reviewDto.commenter);
      if (!user) {
        throw ApiError.NotFound('Пользователь не найден.');
      }

      user.comments?.push(review._id!);
      await user.save();

      return new ReviewDto(review);
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при создании комментария.');
    }
  }

  async getAll(): Promise<ReviewDto[]> {
    try {
      const reviews = await ReviewRepository.getAll();
      if (!reviews || reviews.length === 0) {
        throw ApiError.NotFound('Комментарии не найдены.');
      }

      return reviews.map((review) => new ReviewDto(review));
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при получении комментариев.');
    }
  }

  async getById(reviewId: string): Promise<ReviewDto> {
    try {
      const review = await ReviewRepository.findById(reviewId);
      if (!review) {
        throw ApiError.NotFound(`Комментарий с id: ${reviewId} не найден.`);
      }

      return new ReviewDto(review);
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при получении комментария.');
    }
  }

  async update(reviewId: string, newReview: IReview): Promise<ReviewDto> {
    try {
      const review = await ReviewRepository.updateById(reviewId, newReview);
      if (!review) {
        throw ApiError.BadRequest('Ошибка при обновлении комментария.');
      }

      return new ReviewDto(review);
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при обновлении комментария.');
    }
  }

  async delete(reviewId: string): Promise<void> {
    try {
      const existingReview = await ReviewRepository.findById(reviewId);
      if (!existingReview) {
        throw ApiError.NotFound(`Комментарий с id: ${reviewId} не найден.`);
      }

      const user = await User.findById(existingReview.commenter);
      if (user) {
        user.comments = user.comments?.filter((commentId) => commentId.toString() !== reviewId);
        await user.save();
      }

      await ReviewRepository.deleteById(reviewId);
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при удалении комментария.');
    }
  }

  async getReviewsByUser(userId: string): Promise<ReviewDto[]> {
    try {
      const reviews = await ReviewRepository.findByUser(userId);
      if (!reviews || reviews.length === 0) {
        throw ApiError.NotFound(`Отзывы пользователя с id: ${userId} не найдены.`);
      }

      return reviews.map((review) => new ReviewDto(review));
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при получении отзывов пользователя.');
    }
  }

  async deleteAllByUser(userId: string): Promise<void> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
      }

      const reviewIds = user.comments || [];
      await ReviewRepository.deleteMany({ _id: { $in: reviewIds } });

      user.comments = [];
      await user.save();
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при удалении комментариев пользователя.');
    }
  }
}

export default new ReviewService();
