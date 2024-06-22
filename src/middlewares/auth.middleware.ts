import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/api.error';
import TokenService from '../services/token.service';
import { IUser, UserRoles } from '../interfaces/IUser';

function authorize(requiredRole?: UserRoles) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      return next();
    }

    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }

      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }

      const userData = TokenService.validateAccessToken(accessToken) as IUser;
      if (!userData) {
        return next(ApiError.UnauthorizedError());
      }

      if (requiredRole && userData.role !== requiredRole) {
        return next(ApiError.UnauthorizedError());
      }

      req.user = userData;
      next();
    } catch (error) {
      return next(ApiError.UnauthorizedError());
    }
  };
}

export default authorize;

export const authAdminMiddleware = authorize(UserRoles.admin);
export const authUserMiddleware = authorize(UserRoles.user);
export const authSellerMiddleware = authorize(UserRoles.seller);
