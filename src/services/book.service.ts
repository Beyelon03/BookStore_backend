import { IBook } from '../interfaces/IBook';
import { ApiError } from '../exceptions/api.error';
import BookRepository from '../repositories/book.repository';
import UserModel from '../models/User';
import BookDto from '../dtos/book-dto';

class BookService {
  async create(book: IBook): Promise<BookDto> {
    const newBook = await BookRepository.create(book);
    if (!newBook) {
      throw ApiError.BadRequest();
    }
    await UserModel.updateOne({ _id: book.seller }, { $push: { books: newBook._id } });
    return new BookDto(newBook);
  }

  async getAll(): Promise<BookDto[] | void> {
    const books = await BookRepository.getAll();
    if (!books || books.length === 0) {
      throw ApiError.NotFound();
    }
    return BookDto.fromArray(books);
  }

  async getById(id: string): Promise<BookDto | void> {
    const book = await BookRepository.findById(id);
    if (!book) {
      throw ApiError.NotFound();
    }
    return new BookDto(book);
  }

  async update(bookId: string, book: Partial<IBook>): Promise<BookDto | void> {
    const existBook = await BookRepository.findById(bookId);
    if (!existBook) {
      throw ApiError.NotFound();
    }
    const updatedBook = await BookRepository.updateById(bookId, book);
    if (!updatedBook) {
      throw ApiError.BadRequest();
    }
    return new BookDto(updatedBook);
  }

  async delete(bookId: string): Promise<void> {
    const existBook = await BookRepository.findById(bookId);
    if (!existBook) {
      throw ApiError.NotFound();
    }
    await BookRepository.deleteById(bookId);
    await UserModel.updateMany({ books: bookId }, { $pull: { books: bookId } });
  }
}

export default new BookService();
