import { body, param } from 'express-validator';

export const getReviewValidation = () => [
  body('book').notEmpty().withMessage('ID книги обязателен.'),
  body('commenter').notEmpty().withMessage('ID комментатора обязателен.'),
  body('comment').notEmpty().withMessage('Комментарий обязателен.'),
  body('rating')
    .optional()
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Рейтинг должен быть одним из следующих значений: 1, 2, 3, 4, 5.'),
];

export const paramIdValidator = () => [param('id').notEmpty().withMessage('ID обязателен.')];
