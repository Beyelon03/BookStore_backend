import { Request, Response } from 'express';
import { IBook } from '../interfaces/IBook';
import BookService from '../services/book.service';

class BookController {
  async create(
    req: Request,
    res: Response,
  ): Promise<Response<IBook | null>> {
    try {
      const bookData: IBook = await BookService.create(req.body);
      return res.status(201).json(bookData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла ошибка при создании книги.' });
      }
    }
  }

  async getById(req: Request, res: Response): Promise<Response<IBook | null>> {
    try {
      const { id } = req.params;
      const bookData = await BookService.getById(id);
      return res.status(201).json(bookData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла ошибка при получении книги.' });
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<Response<IBook[] | null>> {
    try {
      const books = await BookService.getAll();
      return res.status(201).json(books);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла ошибка при получении книг.' });
      }
    }
  }

  async update(req: Request, res: Response): Promise<Response<IBook | null>> {
    try {
      const { id } = req.params;
      const book: IBook | null = await BookService.update(id, req.body);
      return res.status(201).json(book);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла ошибка при обновлении книги.' });
      }
    }
  }

  async delete(
    req: Request,
    res: Response,
  ): Promise<
    Response<{
      message: string;
    } | null>
  > {
    try {
      const { id } = req.params;
      await BookService.delete(id);
      return res
        .status(201)
        .json({ message: `Книга с id: ${id} удалена.` });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(400)
          .json({ message: 'Произошла ошибка при удалении книги.' });
      }
    }
  }
}

export default new BookController();
