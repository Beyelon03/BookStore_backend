import { ObjectId } from 'mongoose';

// Интерфейс для адреса пользователя
export interface IAddress {
  country?: string;
  city?: string;
  street?: string;
  zipCode?: string;
}

export enum UserRoles {
  admin = 'admin',
  user = 'user',
  seller = 'seller'
}

// Интерфейс для элемента заказа
export interface IOrderItem {
  book?: ObjectId; // ID книги
  quantity?: number; // Количество книг
}

// Интерфейс для заказа
export interface IOrder {
  orderId?: string; // ID заказа
  items?: IOrderItem[]; // Элементы заказа
  totalAmount?: number; // Общая сумма заказа
  orderDate?: Date; // Дата заказа
}

// Интерфейс для комментария пользователя
export interface IReview {
  commenter?: ObjectId; // ID пользователя, оставившего отзыв
  book?: ObjectId; // ID книги, к которой относится отзыв
  comment?: string; // Текст отзыва
  rating?: 1 | 2 | 3 | 4 | 5; // Оценка книги (от 1 до 5)
  date?: Date; // Дата отзыва
}

// Интерфейс пользователя
export interface IUser {
  email: string; // Email пользователя
  password: string; // Хэшированный пароль пользователя
  _id: ObjectId; // ID пользователя (генерируется MongoDB)
  username: string; // Никнейм пользователя
  role: UserRoles; // Роль пользователя: администратор, пользователь, продавец
  name?: string; // Имя пользователя

  address?: IAddress; // Адрес пользователя
  phoneNumber?: string; // Номер телефона пользователя
  birthDate?: Date; // Дата рождения пользователя
  createdAt?: Date; // Дата создания записи о пользователе

  orders?: IOrder[]; // Массив заказов пользователя
  favorites?: string[]; // Массив ID избранных книг пользователя
  cart?: IOrderItem[]; // Корзина пользователя

  comments?: IReview[]; // Комментарии пользователя
  books?: ObjectId[]; // Массив ID книг пользователя которые на продаже
}