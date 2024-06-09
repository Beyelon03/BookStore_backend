import mongoose, { Model, Schema } from 'mongoose';
import { IReview } from '../interfaces/IUser';

export interface IReviewDocument extends IReview, Document {}

const ReviewSchema: Schema<IReviewDocument> = new Schema<IReviewDocument>({
  book: {
    type: Schema.Types.Mixed,
    ref: 'Book',
    required: true,
  },
  commenter: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const ReviewModel: Model<IReviewDocument> = mongoose.model<IReviewDocument>(
  'Review',
  ReviewSchema,
  'reviews',
);

export default ReviewModel;
