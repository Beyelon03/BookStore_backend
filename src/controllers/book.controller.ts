import { NextFunction, Request, Response } from 'express';
import { IBook } from '../interfaces/IBook';
import BookService from '../services/book.service';
import { ApiError } from '../exceptions/api.error';

class BookController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IBook> | void> {
    try {
      const bookData: IBook = await BookService.create(req.body);
      return res.status(201).json(bookData);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при создании книги.'));
      }
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IBook> | void> {
    try {
      const { id } = req.params;
      const bookData = await BookService.getById(id);
      if (!bookData) {
        next(new ApiError(404, `Книга с id: ${id} не найдена.`));
        return;
      }
      return res.status(200).json(bookData);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при получении книги.'));
      }
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IBook[]> | void> {
    try {
      const books = await BookService.getAll();
      return res.status(200).json(books);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при получении книг.'));
      }
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IBook> | void> {
    try {
      const { id } = req.params;
      const book: IBook | null = await BookService.update(id, req.body);
      if (!book) {
        next(new ApiError(404, `Книга с id: ${id} не найдена.`));
        return;
      }
      return res.status(200).json(book);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при обновлении книги.'));
      }
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<{ message: string }> | void> {
    try {
      const { id } = req.params;
      await BookService.delete(id);
      return res.status(200).json({ message: `Книга с id: ${id} удалена.` });
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при удалении книги.'));
      }
    }
  }
}

export default new BookController();
