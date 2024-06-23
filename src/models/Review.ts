// models/Review.ts
import mongoose, { Model, Schema } from 'mongoose';
import { IReview } from '../interfaces/IReview';

const ReviewSchema: Schema<IReview> = new Schema<IReview>({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  commenter: {
    type: Schema.Types.ObjectId,
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

const ReviewModel: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema, 'reviews');

export default ReviewModel;
