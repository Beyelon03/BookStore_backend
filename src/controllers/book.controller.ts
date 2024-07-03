import { NextFunction, Request, Response } from 'express';
import BookService from '../services/book.service';
import { ApiError } from '../exceptions/api.error';
import BookDto from '../dtos/book-dto';

class BookController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response<BookDto> | void> {
    try {
      const bookData = await BookService.create(req.body);
      return res.status(201).json(bookData);
    } catch (error) {
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response<BookDto> | void> {
    try {
      const { bookId } = req.params;
      const bookData = await BookService.getById(bookId);
      if (!bookData) {
        throw ApiError.NotFound();
      }
      return res.status(200).json(bookData);
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<BookDto[]> | void> {
    try {
      const books = await BookService.getAll();
      return res.status(200).json(books);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response<BookDto> | void> {
    try {
      const { bookId } = req.params;
      const book = await BookService.update(bookId, req.body);
      if (!book) {
        throw ApiError.NotFound();
      }
      return res.status(200).json(book);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response<{ message: string }> | void> {
    try {
      const { bookId } = req.params;
      await BookService.delete(bookId);
      return res.status(200).json({ message: `Книга удалена.` });
    } catch (error) {
      return next(error);
    }
  }
}

export default new BookController();
