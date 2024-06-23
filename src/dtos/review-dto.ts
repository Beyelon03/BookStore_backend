import { ObjectId } from 'mongoose';
import { IReview } from '../interfaces/IReview';

class ReviewDto {
  _id: ObjectId;
  commenter: ObjectId;
  book: ObjectId;
  comment: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: Date;

  constructor(model: ReviewDto) {
    this._id = model._id;
    this.commenter = model.commenter;
    this.book = model.book;
    this.comment = model.comment;
    this.rating = model.rating;
    this.date = model.date;
  }

  static fromArray(models: IReview[]): ReviewDto[] {
    return models.map((model) => new ReviewDto(model));
  }
}

export default ReviewDto;
