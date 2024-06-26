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
      const newReviewDto = new ReviewDto(review);
      return newReviewDto;
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при создании комментария.');
    }
  }

  async getAll(): Promise<IReview[]> {
    try {
      const reviews = await ReviewRepository.getAll();
      if (!reviews) {
        throw ApiError.NotFound('Комментарии не найдены.');
      }
      const newReviewDto = ReviewDto.fromArray(reviews);
      return newReviewDto;
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при получении комментариев.');
    }
  }

  async getById(reviewId: string): Promise<IReview> {
    try {
      const review = await ReviewRepository.findById(reviewId);
      if (!review) {
        throw ApiError.NotFound(`Комментарий с id: ${reviewId} не найден.`);
      }
      const newReviewDto = new ReviewDto(review);
      return newReviewDto;
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при получении комментария.');
    }
  }

  async update(reviewId: string, newReview: IReview): Promise<IReview> {
    try {
      const review = await ReviewRepository.updateById(reviewId, newReview);
      if (!review) {
        throw ApiError.BadRequest('Ошибка при обновлении комментария.');
      }
      const newReviewDto = new ReviewDto(review);
      return newReviewDto;
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

  async deleteAllByUser(userId: string): Promise<void> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw ApiError.NotFound(`Пользователь с id: ${userId} не найден.`);
      }

      const reviewIds = user.comments || [];
      for (const reviewId of reviewIds) {
        await ReviewRepository.deleteById(reviewId.toString());
      }

      user.comments = [];
      await user.save();
    } catch (error) {
      throw ApiError.InternalServerError('Ошибка при удалении комментариев пользователя.');
    }
  }
}

export default new ReviewService();
