import { Request, Response } from 'express';
import { IReview } from '../interfaces/IUser';
import ReviewService from '../services/review.service';

class ReviewController {
  async create(req: Request, res: Response): Promise<Response<IReview> | null> {
    try {
      const review = await ReviewService.create(req.body);
      return res.status(201).json(review);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'Произошла ошибка при создании комментария.' });
      }
    }
  }

  async getAll(
    req: Request,
    res: Response,
  ): Promise<Response<IReview[] | null>> {
    try {
      const reviews = await ReviewService.getAll();
      return res.status(200).json(reviews);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'Произошла ошибка при получении комментариев.' });
      }
    }
  }

  async getById(
    req: Request,
    res: Response,
  ): Promise<Response<IReview | null>> {
    try {
      const reviews = await ReviewService.getAll();
      return res.status(200).json(reviews);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'Произошла ошибка при получении комментария.' });
      }
    }
  }

  async update(req: Request, res: Response): Promise<Response<IReview | null>> {
    try {
      const { id } = req.params;
      const review = await ReviewService.update(id, req.body);
      return res.status(201).json(review);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: 'Ошибка при обновлении комментария.' });
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
      const delReview = await ReviewService.delete(id);
      return res
        .status(200)
        .json({ message: `Пользователь с ID: ${id} удалён.` });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: '' });
      }
    }
  }
}

export default new ReviewController();
