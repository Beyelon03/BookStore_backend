import { IBook } from '../interfaces/IBook';
import Book from '../models/Book';
import { Model } from 'mongoose';

class BookRepository {
  private readonly bookModel: Model<IBook>;

  constructor(model: Model<IBook>) {
    this.bookModel = model;
  }

  async create(book: Partial<IBook>): Promise<IBook> {
    return this.bookModel.create(book);
  }

  async getAll(): Promise<IBook[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string): Promise<IBook | null> {
    return this.bookModel.findById(id).exec();
  }

  async updateById(bookId: string, book: Partial<IBook>): Promise<IBook | null> {
    return this.bookModel.findByIdAndUpdate(bookId, book, { new: true }).exec();
  }

  async deleteById(bookId: string): Promise<void> {
    await this.bookModel.findByIdAndDelete(bookId).exec();
  }
}

export default new BookRepository(Book);
