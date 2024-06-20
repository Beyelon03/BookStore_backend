import mongoose, { Schema } from 'mongoose';
import { IUser, UserRoles } from '../interfaces/IUser';

const UserSchema: Schema<IUser> = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
    enum: UserRoles,
    default: UserRoles.user
  },
  address: {
    type: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      street: {
        type: String,
      },
      zipCode: {
        type: String,
      },
    },
    _id: false,
  },
  phoneNumber: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  orders: [
    {
      orderId: {
        type: String,
      },
      items: [
        {
          book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
          },
          quantity: {
            type: Number,
          },
        },
      ],
      totalAmount: {
        type: Number,
      },
      orderDate: {
        type: Date,
      },
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  cart: [
    {
      book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
      quantity: {
        type: Number,
      },
    },
  ],
  comments: [
    {
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
        min: 1,
        max: 5,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

const UserModel = mongoose.model<IUser>('User', UserSchema, 'users');

export default UserModel;
