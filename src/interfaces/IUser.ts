import { ObjectId } from 'mongoose';

export interface IAddress {
  country: string;
  city: string;
  street: string;
  zipCode: string;
}

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}

export interface IOrderItem {
  book: ObjectId;
  quantity: number;
}

export interface IOrder {
  orderId: string;
  items: IOrderItem[];
  totalAmount: number;
  orderDate: Date;
}

export interface IUser {
  email: string;
  password: string;
  _id: ObjectId;
  username: string;
  role: UserRoles;
  name: string;
  address: IAddress;
  phoneNumber: string;
  birthDate: Date;
  createdAt: Date;
  orders: IOrder[];
  favorites: ObjectId[];
  cart: IOrderItem[];
  comments: ObjectId[];
  books: ObjectId[];
}
