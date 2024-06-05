import { IBook } from '../interfaces/IBook';
import Book from '../models/Book';
import User from '../models/User';

interface IBookService {
  create(book: IBook): Promise<IBook>;

  getAll(): Promise<IBook[]>;

  getById(id: string): Promise<IBook | null>;

  update(bookId: string, user: Partial<IBook>): Promise<IBook | null>;

  delete(bookId: string): Promise<void>;
}

class BookService implements IBookService {
  async create(book: IBook): Promise<IBook> {
    const newBook = await Book.create({ ...book });
    await User.updateMany(
      { _id: { $in: book.seller } },
      { $push: { books: newBook._id } }
    );
    return newBook;
  }

  async getAll(): Promise<IBook[]> {
    const books = await Book.find();
    return books;
  }

  async getById(id: string): Promise<IBook | null> {
    const book = await Book.findById(id);
    return book;
  }

  async update(bookId: string, book: Partial<IBook>): Promise<IBook | null> {
    const newBook = await Book.findByIdAndUpdate(bookId, book, { new: true });
    return newBook;
  }

  async delete(bookId: string): Promise<void> {
    const deletedBook = await Book.findByIdAndDelete(bookId);
  }
}

export default new BookService();
