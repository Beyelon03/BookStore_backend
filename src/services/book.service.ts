import { IBook } from '../interfaces/IBook';
import { ApiError } from '../exceptions/api.error';
import BookRepository from '../repositories/book.repository';
import UserModel from '../models/User';
import BookDto from '../dtos/book-dto';

class BookService {
  async create(book: IBook): Promise<BookDto> {
    try {
      const newBook = await BookRepository.create(book);
      if (!newBook) {
        throw ApiError.BadRequest();
      }
      await UserModel.updateOne({ _id: book.seller }, { $push: { books: newBook._id } });
      return new BookDto(newBook);
    } catch (error) {
      throw ApiError.BadRequest();
    }
  }

  async getAll(): Promise<BookDto[] | void> {
    try {
      const books = await BookRepository.getAll();
      if (!books || books.length === 0) {
        throw ApiError.NotFound();
      }
      return BookDto.fromArray(books);
    } catch (error) {
      throw ApiError.BadRequest();
    }
  }

  async getById(id: string): Promise<BookDto | void> {
    try {
      const book = await BookRepository.findById(id);
      if (!book) {
        throw ApiError.NotFound();
      }
      return new BookDto(book);
    } catch (error) {
      throw ApiError.BadRequest();
    }
  }

  async update(bookId: string, book: Partial<IBook>): Promise<BookDto | void> {
    try {
      const existBook = await BookRepository.findById(bookId);
      if (!existBook) {
        throw ApiError.NotFound();
      }
      const updatedBook = await BookRepository.updateById(bookId, book);
      if (!updatedBook) {
        throw ApiError.BadRequest();
      }
      return new BookDto(updatedBook);
    } catch (error) {
      throw ApiError.BadRequest();
    }
  }

  async delete(bookId: string): Promise<void> {
    try {
      const existBook = await BookRepository.findById(bookId);
      if (!existBook) {
        throw ApiError.NotFound();
      }
      await BookRepository.deleteById(bookId);
      await UserModel.updateMany({ books: bookId }, { $pull: { books: bookId } });
    } catch (error) {
      throw ApiError.BadRequest();
    }
  }
}

export default new BookService();
