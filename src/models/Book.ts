import mongoose, { Schema } from 'mongoose';
import { IBookDocument } from '../interfaces/IBook';

const BookSchema: Schema<IBookDocument> = new Schema<IBookDocument>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  publisher: {
    type: [String],
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  ageRating: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  coverImage: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  seller: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  rating: {
    type: Number,
  },
  reviews: [
    {
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
        required: true,
      },
    },
  ],
});

const BookModel = mongoose.model<IBookDocument>('Book', BookSchema);

export default BookModel;
