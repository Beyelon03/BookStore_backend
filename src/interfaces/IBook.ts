// Интерфейс для отзыва о книге
import { IUser } from './IUser';

export interface IReview {
  commenter: IUser['_id']; // ID пользователя, оставившего отзыв
  comment: string; // Текст отзыва
  rating: 1 | 2 | 3 | 4 | 5; // Оценка книги (от 1 до 5)
  date: Date; // Дата отзыва
}

// Интерфейс для книги
export interface IBook {
  _id: string; // ID книги (генерируется MongoDB)
  title: string; // Название книги
  author: string[]; // Авторы книги (массив строк)
  description: string; // Описание книги
  price: number; // Цена книги
  categories: string[]; // Категории книги
  isbn: string; // ISBN книги
  publicationDate: Date; // Дата публикации книги
  publisher: string[]; // Издатели книги (массив строк)
  language: string; // Язык книги
  format: string; // Формат книги (мягкая обложка, твердый переплет и т.д.)
  pageCount: number; // Количество страниц
  type: string; // Тип книги (бумажная, электронная и т.д.)
  ageRating: string; // Рекомендации по возрасту читателей
  averageRating?: number; // Средний рейтинг книги (вычислен на основе отзывов)
  addedAt: Date; // Дата добавления книги
  coverImage: string; // Ссылка на изображение обложки книги
  stock: number; // Наличие книги на складе
  seller: IUser['_id'][]; // Пользователи, продающие книгу (массив пользователей)
  rating?: number; // Рейтинг книги (опционально)
  reviews?: IReview[]; // Массив отзывов о книге (опционально)
}

export interface IBookDocument extends IBook, Document {}