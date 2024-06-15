import { NextFunction, Request, Response } from 'express';
import { IReview } from '../interfaces/IUser';
import ReviewService from '../services/review.service';
import { ApiError } from '../exceptions/api.error';

class ReviewController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IReview> | void> {
    try {
      const review = await ReviewService.create(req.body);
      return res.status(201).json(review);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при создании комментария.'));
      }
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IReview[]> | void> {
    try {
      const reviews = await ReviewService.getAll();
      return res.status(200).json(reviews);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при получении комментариев.'));
      }
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IReview> | void> {
    try {
      const { id } = req.params;
      const review = await ReviewService.getById(id);
      return res.status(200).json(review);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при получении комментария.'));
      }
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IReview> | void> {
    try {
      const { id } = req.params;
      const review = await ReviewService.update(id, req.body);
      return res.status(201).json(review);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при обновлении комментария.'));
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
      const delReview = await ReviewService.delete(id);
      return res
        .status(200)
        .json({ message: `Пользователь с ID: ${id} удалён.` });
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else if (error instanceof Error) {
        next(new ApiError(400, error.message));
      } else {
        next(new ApiError(400, 'Произошла ошибка при удалении комментария.'));
      }
    }
  }
}

export default new ReviewController();
