import { IAddress, IOrderItem, IUser, UserRoles } from '../interfaces/IUser';
import { ObjectId } from 'mongoose';

class UserDto {
  email: string;
  _id: ObjectId;
  username: string;
  role: UserRoles;
  name: string;
  address: IAddress;
  phoneNumber: string;
  birthDate: Date;
  createdAt: Date;
  orders: Array<{
    items: Array<IOrderItem>;
    orderDate: Date;
    orderId: string;
    totalAmount: number;
  }>;
  favorites: ObjectId[];
  cart: Array<{ book: ObjectId; quantity: number }>;
  comments: ObjectId[];
  books: ObjectId[];

  constructor(model: IUser) {
    this.email = model.email;
    this.username = model.username;
    this._id = model._id;
    this.role = model.role;
    this.name = model.name;
    this.address = model.address;
    this.phoneNumber = model.phoneNumber;
    this.birthDate = model.birthDate;
    this.createdAt = model.createdAt;
    this.orders = model.orders.map((order) => ({
      orderId: order.orderId,
      items: order.items,
      totalAmount: order.totalAmount,
      orderDate: order.orderDate,
    }));
    this.favorites = model.favorites.map((fav) => fav);
    this.cart = model.cart.map((cartItem) => ({
      book: cartItem.book,
      quantity: cartItem.quantity,
    }));
    this.comments = model.comments.map((comment) => comment);
    this.books = model.books.map((book) => book);
  }

  static fromArray(models: IUser[]): UserDto[] {
    return models.map((model) => new UserDto(model));
  }
}

export default UserDto;
