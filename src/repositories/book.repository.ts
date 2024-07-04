import { IBook } from '../interfaces/IBook';
import Book from '../models/Book';
import { ObjectId } from 'mongoose';

class BookRepository {
  async create(book: Partial<IBook>): Promise<IBook> {
    return Book.create(book);
  }

  async getAll(): Promise<IBook[]> {
    return Book.find().exec();
  }

  async findById(id: ObjectId): Promise<IBook | null> {
    return Book.findById(id).exec();
  }

  async updateById(bookId: string, book: Partial<IBook>): Promise<IBook | null> {
    return Book.findByIdAndUpdate(bookId, book, { new: true }).exec();
  }

  async deleteById(bookId: string): Promise<void> {
    await Book.findByIdAndDelete(bookId).exec();
  }
}

export default new BookRepository();
