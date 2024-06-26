import FavoritesService from '../services/favorites.service';
import { NextFunction, Request, Response } from 'express';

class FavoritesController {
  async addToFavorites(req: Request, res: Response, next: NextFunction) {
    const { userId, bookId } = req.body;

    try {
      const updatedUser = await FavoritesService.addToFavorites(userId, bookId);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async removeFromFavorites(req: Request, res: Response, next: NextFunction) {
    const { userId, bookId } = req.body;

    try {
      const updatedUser = await FavoritesService.removeFromFavorites(userId, bookId);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async getAllFavorites(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body;

    try {
      const favorites = await FavoritesService.getAllFavorites(userId);
      res.json(favorites);
    } catch (error) {
      next(error);
    }
  }
}

export default new FavoritesController();
