import { IBook } from '../interfaces/IBook';
import Book from '../models/Book';
import User from '../models/User';

class BookService {
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
    if (!books) {
      throw new Error('Список книг пуст.');
    }
    return books;
  }

  async getById(id: string): Promise<IBook | null> {
    const book = await Book.findById(id);
    if (!book) {
      throw new Error(`Книга с id: ${id} не найдена.`);
    }
    return book;
  }

  async update(bookId: string, book: Partial<IBook>): Promise<IBook | null> {
    const newBook = await Book.findByIdAndUpdate(bookId, book, { new: true });
    if (!newBook) {
      throw new Error(`Книга не обновлена.`);
    }
    return newBook;
  }

  async delete(bookId: string): Promise<void> {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      throw new Error(`Книга не удалена.`);
    }
  }
}

export default new BookService();
