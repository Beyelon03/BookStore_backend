import { IReview } from '../interfaces/IReview';
import { ApiError } from '../exceptions/api.error';
import ReviewRepository from '../repositories/review.repository';
import User from '../models/User';
import ReviewDto from '../dtos/review-dto';

class ReviewService {
  async create(reviewDto: Partial<IReview>): Promise<ReviewDto> {
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
  }

  async getAll(): Promise<ReviewDto[]> {
    const reviews = await ReviewRepository.getAll();
    if (!reviews || reviews.length === 0) {
      throw ApiError.NotFound();
    }

    return reviews.map((review) => new ReviewDto(review));
  }

  async getById(reviewId: string): Promise<ReviewDto> {
    const review = await ReviewRepository.findById(reviewId);
    if (!review) {
      throw ApiError.NotFound();
    }

    return new ReviewDto(review);
  }

  async update(reviewId: string, newReview: IReview): Promise<ReviewDto> {
    const review = await ReviewRepository.updateById(reviewId, newReview);
    if (!review) {
      throw ApiError.BadRequest();
    }

    return new ReviewDto(review);
  }

  async delete(reviewId: string): Promise<void> {
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
  }

  async deleteAllByUser(userId: string): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound();
    }

    const reviewIds = user.comments || [];
    await ReviewRepository.deleteMany({ _id: { $in: reviewIds } });

    user.comments = [];
    await user.save();
  }
}

export default new ReviewService();
