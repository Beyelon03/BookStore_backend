import FavoritesService from '../services/favorites.service';
import { NextFunction, Request, Response } from 'express';

class FavoritesController {
  async addToFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { bookId } = req.body;
      const updatedUser = await FavoritesService.addToFavorites(userId, bookId);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async removeFromFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { bookId } = req.body;
      const updatedUser = await FavoritesService.removeFromFavorites(userId, bookId);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async getAllFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const favorites = await FavoritesService.getAllFavorites(userId);
      res.json(favorites);
    } catch (error) {
      next(error);
    }
  }
}

export default new FavoritesController();
