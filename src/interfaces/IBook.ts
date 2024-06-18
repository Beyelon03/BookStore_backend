import { ObjectId } from 'mongoose';

export interface IBook {
  _id?: string; // ID книги (генерируется MongoDB)
  title?: string; // Название книги
  author?: string[]; // Авторы книги (массив строк)
  description?: string; // Описание книги
  price?: number; // Цена книги
  categories?: string[]; // Категории книги
  isbn?: string; // ISBN книги
  publicationDate?: Date; // Дата публикации книги
  publisher?: string[]; // Издатели книги (массив строк)
  language?: string; // Язык книги
  format?: string; // Формат книги (мягкая обложка, твердый переплет и т.д.)
  pageCount?: number; // Количество страниц
  type?: string; // Тип книги (бумажная, электронная и т.д.)
  ageRating?: string; // Рекомендации по возрасту читателей
  averageRating?: number; // Средний рейтинг книги (вычислен на основе отзывов)
  addedAt?: Date; // Дата добавления книги
  coverImage?: string; // Ссылка на изображение обложки книги
  stock?: number; // Наличие книги на складе
  seller?: ObjectId[]; // Пользователи, продающие книгу (массив пользователей)
  rating?: number; // Рейтинг книги (опционально)
}