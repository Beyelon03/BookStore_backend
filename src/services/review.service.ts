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
        throw ApiError.BadRequest();
      }

      const user = await User.findById(reviewDto.commenter);
      if (!user) {
        throw ApiError.NotFound();
      }

      user.comments?.push(review._id!);
      await user.save();

      return new ReviewDto(review);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async getAll(): Promise<ReviewDto[]> {
    try {
      const reviews = await ReviewRepository.getAll();
      if (!reviews || reviews.length === 0) {
        throw ApiError.NotFound();
      }

      return reviews.map((review) => new ReviewDto(review));
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async getById(reviewId: string): Promise<ReviewDto> {
    try {
      const review = await ReviewRepository.findById(reviewId);
      if (!review) {
        throw ApiError.NotFound();
      }

      return new ReviewDto(review);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async update(reviewId: string, newReview: IReview): Promise<ReviewDto> {
    try {
      const review = await ReviewRepository.updateById(reviewId, newReview);
      if (!review) {
        throw ApiError.BadRequest();
      }

      return new ReviewDto(review);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async delete(reviewId: string): Promise<void> {
    try {
      const existingReview = await ReviewRepository.findById(reviewId);
      if (!existingReview) {
        throw ApiError.NotFound();
      }

      const user = await User.findById(existingReview.commenter);
      if (user) {
        user.comments = user.comments?.filter((commentId) => commentId.toString() !== reviewId);
        await user.save();
      }

      await ReviewRepository.deleteById(reviewId);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async deleteAllByUser(userId: string): Promise<void> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw ApiError.NotFound();
      }

      const reviewIds = user.comments || [];
      await ReviewRepository.deleteMany({ _id: { $in: reviewIds } });

      user.comments = [];
      await user.save();
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }
}

export default new ReviewService();
