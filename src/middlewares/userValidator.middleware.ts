import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const getRegistrationValidation = () => [
  body('username')
    .notEmpty()
    .withMessage('Имя пользователя обязательно')
    .isLength({ min: 4, max: 16 })
    .withMessage(
      'Имя пользователя должно быть не менее 4 символов и не более 16.',
    ),
  body('email')
    .isEmail()
    .withMessage(
      'Пожалуйста, предоставьте действительный адрес электронной почты.',
    ),
  body('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('Пароль должен содержать не менее 6 символов и не более 16.'),
];

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { getRegistrationValidation, validateRequest };
