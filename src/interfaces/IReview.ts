import { ObjectId } from 'mongoose';

export interface IReview {
  _id: ObjectId;
  commenter: ObjectId; // ID пользователя, оставившего отзыв
  book: ObjectId; // ID книги, к которой относится отзыв
  comment: string; // Текст отзыва
  rating: 1 | 2 | 3 | 4 | 5; // Оценка книги (от 1 до 5)
  date: Date; // Дата отзыва
}
