import { NextFunction, Request, Response } from 'express';
import { IBook } from '../interfaces/IBook';
import BookService from '../services/book.service';
import { ApiError } from '../exceptions/api.error';
import BookDto from '../dtos/book-dto';

class BookController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response<BookDto> | void> {
    try {
      const bookData = await BookService.create(req.body);
      return res.status(201).json(bookData);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response<BookDto> | void> {
    try {
      const { id } = req.params;
      const bookData = await BookService.getById(id);
      if (!bookData) {
        throw ApiError.NotFound(`Книга с id: ${id} не найдена.`);
      }
      return res.status(200).json(bookData);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<BookDto[]> | void> {
    try {
      const books = await BookService.getAll();
      return res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response<BookDto> | void> {
    try {
      const { id } = req.params;
      const book: IBook | null = await BookService.update(id, req.body);
      if (!book) {
        throw ApiError.NotFound(`Книга с id: ${id} не найдена.`);
      }
      return res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response<{ message: string }> | void> {
    try {
      const { id } = req.params;
      await BookService.delete(id);
      return res.status(200).json({ message: `Книга с id: ${id} удалена.` });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
