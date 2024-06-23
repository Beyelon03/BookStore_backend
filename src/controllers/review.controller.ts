import { NextFunction, Request, Response } from 'express';
import ReviewService from '../services/review.service';
import { ApiError } from '../exceptions/api.error';
import ReviewDto from '../dtos/review-dto';

class ReviewController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response<ReviewDto> | void> {
    try {
      const { book, commenter, comment, rating } = req.body;
      const review = await ReviewService.create({ book, commenter, comment, rating });
      return res.status(201).json(review);
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<ReviewDto[]> | void> {
    try {
      const reviews = await ReviewService.getAll();
      return res.status(200).json(reviews);
    } catch (error) {
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response<ReviewDto> | void> {
    try {
      const { id } = req.params;
      const review = await ReviewService.getById(id);
      if (!review) {
        return next(ApiError.NotFound(`Комментарий с id: ${id} не найден.`));
      }
      return res.status(200).json(review);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response<ReviewDto> | void> {
    try {
      const { id } = req.params;
      const review = await ReviewService.update(id, req.body);
      if (!review) {
        return next(ApiError.NotFound(`Комментарий с id: ${id} не найден.`));
      }
      return res.status(200).json(review);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response<{ message: string }> | void> {
    try {
      const { id } = req.params;
      await ReviewService.delete(id);
      return res.status(200).json({ message: `Комментарий с id: ${id} удалён.` });
    } catch (error) {
      return next(error);
    }
  }
}

export default new ReviewController();
