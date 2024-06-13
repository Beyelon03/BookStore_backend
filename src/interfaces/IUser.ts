import { IBook } from './IBook';

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

// Интерфейс для refresh токена
export interface IRefreshToken {
  token?: string;
  expires?: Date;
}

// Интерфейс для элемента заказа
export interface IOrderItem {
  book?: IBook['_id']; // ID книги
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
  commenter?: IUser['_id']; // ID пользователя, оставившего отзыв
  book?: IBook['_id']; // ID книги, к которой относится отзыв
  comment?: string; // Текст отзыва
  rating?: 1 | 2 | 3 | 4 | 5; // Оценка книги (от 1 до 5)
  date?: Date; // Дата отзыва
}

// Интерфейс пользователя
export interface IUser {
  _id: string; // ID пользователя (генерируется MongoDB)
  username: string; // Никнейм пользователя
  email: string; // Email пользователя
  password: string; // Хэшированный пароль пользователя
  name?: string; // Имя пользователя
  role?: UserRoles; // Роль пользователя: администратор, пользователь, продавец

  address?: IAddress; // Адрес пользователя
  phoneNumber?: string; // Номер телефона пользователя
  birthDate?: Date; // Дата рождения пользователя
  createdAt?: Date; // Дата создания записи о пользователе

  refreshTokens?: IRefreshToken[]; // Массив refresh токенов пользователя
  orders?: IOrder[]; // Массив заказов пользователя
  favorites?: string[]; // Массив ID избранных книг пользователя
  cart?: IOrderItem[]; // Корзина пользователя

  comments?: IReview[]; // Комментарии пользователя
  books?: IBook['_id'][]; // Массив ID книг пользователя
}