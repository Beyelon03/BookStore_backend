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
  book: ObjectId; // ID книги
  quantity: number; // Количество книг
}

export interface IOrder {
  orderId: string; // ID заказа
  items: IOrderItem[]; // Элементы заказа
  totalAmount: number; // Общая сумма заказа
  orderDate: Date; // Дата заказа
}

export interface IUser {
  email: string; // Email пользователя
  password: string; // Хэшированный пароль пользователя
  _id: ObjectId; // ID пользователя (генерируется MongoDB)
  username: string; // Никнейм пользователя
  role: UserRoles; // Роль пользователя: администратор, пользователь, продавец
  name: string; // Имя пользователя
  address: IAddress; // Адрес пользователя
  phoneNumber: string; // Номер телефона пользователя
  birthDate: Date; // Дата рождения пользователя
  createdAt: Date; // Дата создания записи о пользователе
  orders: IOrder[]; // Массив заказов пользователя
  favorites: ObjectId[]; // Массив ID избранных книг пользователя
  cart: IOrderItem[]; // Корзина пользователя
  comments: ObjectId[]; // Комментарии пользователя
  books: ObjectId[]; // Массив ID книг пользователя которые на продаже
}
