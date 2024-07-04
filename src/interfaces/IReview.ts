import { ObjectId } from 'mongoose';

export interface IReview {
  _id: ObjectId;
  commenter: ObjectId;
  book: ObjectId;
  comment: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: Date;
}
