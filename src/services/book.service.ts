import { IBook } from '../interfaces/IBook';
import { ApiError } from '../exceptions/api.error';
import BookRepository from '../repositories/book.repository';
import UserModel from '../models/User';
import BookDto from '../dtos/book-dto';

class BookService {
  async create(book: IBook): Promise<IBook> {
    const newBook = await BookRepository.create(book);
    if (!newBook) {
      throw ApiError.BadRequest('Ошибка при создании книги.');
    }
    await UserModel.updateOne({ _id: book.seller }, { $push: { books: newBook._id } });
    const bookDto = new BookDto(newBook);
    return bookDto;
  }

  async getAll(): Promise<BookDto[]> {
    const books = await BookRepository.getAll();
    if (!books) {
      throw ApiError.NotFound('Список книг пуст.');
    }
    const booksDto = BookDto.fromArray(books);
    return booksDto;
  }

  async getById(id: string): Promise<IBook | null> {
    const book = await BookRepository.findById(id);
    if (!book) {
      throw ApiError.NotFound(`Книга с id: ${id} не найдена.`);
    }
    const bookDto = new BookDto(book);
    return bookDto;
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
    const bookDto = new BookDto(newBook);
    return bookDto;
  }

  async delete(bookId: string): Promise<void> {
    const existBook = await BookRepository.findById(bookId);
    if (!existBook) {
      throw ApiError.NotFound(`Книга с id: ${bookId} не найдена.`);
    }
    await BookRepository.deleteById(bookId);
    await UserModel.updateMany({ books: bookId }, { $pull: { bookId } });
  }
}

export default new BookService();
