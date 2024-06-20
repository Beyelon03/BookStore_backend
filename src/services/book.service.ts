import { IBook } from '../interfaces/IBook';
import User from '../models/User';
import { ApiError } from '../exceptions/api.error';
import BookRepository from '../repositories/book.repository';

class BookService {
  async create(book: IBook): Promise<IBook> {
    const newBook = await BookRepository.create({ ...book });
    await User.updateMany(
      { _id: { $in: book.seller } },
      { $push: { books: newBook._id } }
    );
    if (!newBook) {
      throw ApiError.BadRequest('Ошибка при создании книги.');
    }
    return newBook;
  }

  async getAll(): Promise<IBook[]> {
    const books = await BookRepository.getAll();
    if (!books) {
      throw ApiError.NotFound('Список книг пуст.');
    }
    return books;
  }

  async getById(id: string): Promise<IBook | null> {
    const book = await BookRepository.findById(id);
    if (!book) {
      throw ApiError.NotFound(`Книга с id: ${id} не найдена.`);
    }
    return book;
  }

  async update(bookId: string, book: Partial<IBook>): Promise<IBook | null> {
    const existBook = await BookRepository.findById(bookId);
    if (!existBook) {
      throw ApiError.NotFound(`Книга с id: ${bookId} не найдена.`);
    }
    const newBook = await BookRepository.updateById(bookId, book);
    if (!newBook) {
      throw ApiError.BadRequest(`Книга не обновлена.`);
    }
    return newBook;
  }

  async delete(bookId: string): Promise<void> {
    const existBook = await BookRepository.findById(bookId);
    if (!existBook) {
      throw ApiError.NotFound(`Книга с id: ${bookId} не найдена.`);
    }
    const deletedBook = await BookRepository.deleteById(bookId);
  }
}

export default new BookService();
