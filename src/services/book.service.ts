import { IBook } from '../interfaces/IBook';
import { ApiError } from '../exceptions/api.error';
import BookRepository from '../repositories/book.repository';
import UserModel from '../models/User';
import BookDto from '../dtos/book-dto';

class BookService {
  async create(book: IBook): Promise<BookDto> {
    const newBook = await BookRepository.create(book);
    if (!newBook) {
      throw new ApiError(400, 'Ошибка при создании книги.');
    }
    await UserModel.updateOne({ _id: book.seller }, { $push: { books: newBook._id } });
    return new BookDto(newBook);
  }

  async getAll(): Promise<BookDto[]> {
    const books = await BookRepository.getAll();
    if (!books || books.length === 0) {
      throw new ApiError(404, 'Список книг пуст.');
    }
    return BookDto.fromArray(books);
  }

  async getById(id: string): Promise<BookDto> {
    const book = await BookRepository.findById(id);
    if (!book) {
      throw new ApiError(404, `Книга с id: ${id} не найдена.`);
    }
    return new BookDto(book);
  }

  async update(bookId: string, book: Partial<IBook>): Promise<BookDto> {
    const existBook = await BookRepository.findById(bookId);
    if (!existBook) {
      throw new ApiError(404, `Книга с id: ${bookId} не найдена.`);
    }
    const updatedBook = await BookRepository.updateById(bookId, book);
    if (!updatedBook) {
      throw new ApiError(400, 'Книга не обновлена.');
    }
    return new BookDto(updatedBook);
  }

  async delete(bookId: string): Promise<void> {
    const existBook = await BookRepository.findById(bookId);
    if (!existBook) {
      throw new ApiError(404, `Книга с id: ${bookId} не найдена.`);
    }
    await BookRepository.deleteById(bookId);
    await UserModel.updateMany({ books: bookId }, { $pull: { books: bookId } });
  }
}

export default new BookService();
