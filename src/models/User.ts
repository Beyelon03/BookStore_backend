import mongoose, { Schema } from 'mongoose';
import { IUserDocument } from '../interfaces/IUser';

const UserSchema: Schema<IUserDocument> = new Schema<IUserDocument>({
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
    enum: ['admin', 'user', 'seller'],
    default: 'user',
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
  refreshTokens: [
    {
      token: {
        type: String,
      },
      expires: {
        type: Date,
      },
    },
  ],
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
      commenter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: {
        type: String,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      date: {
        type: Date,
      },
    },
  ],
});

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
