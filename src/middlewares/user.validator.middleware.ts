import { body } from 'express-validator';

export const getRegistrationValidation = () => [
  body('username')
    .notEmpty()
    .withMessage('Имя пользователя обязательно')
    .isLength({ min: 4, max: 16 })
    .withMessage('Имя пользователя должно быть не менее 4 символов и не более 16.')
    .matches(/^[A-Za-z0-9_.-]+$/)
    .withMessage(
      'Имя пользователя должно содержать только английские буквы, цифры, символы "-", "_" и ".", и не содержать пробелов',
    ),
  body('email').isEmail().withMessage('Пожалуйста, предоставьте действительный адрес электронной почты.'),
  body('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('Пароль должен содержать не менее 6 символов и не более 16.'),
];

export const updateUserValidation = () => [
  body('username')
    .optional()
    .isLength({ min: 4, max: 16 })
    .withMessage('Имя пользователя должно быть не менее 4 символов и не более 16.')
    .matches(/^[A-Za-z0-9_.-]+$/)
    .withMessage(
      'Имя пользователя должно содержать только английские буквы, цифры, символы "-", "_" и ".", и не содержать пробелов',
    ),
  body('email').optional().isEmail().withMessage('Пожалуйста, предоставьте действительный адрес электронной почты.'),
  body('password')
    .optional()
    .isLength({ min: 6, max: 16 })
    .withMessage('Пароль должен содержать не менее 6 символов и не более 16.'),
  body('name').optional().isString().withMessage('Имя должно быть строкой.'),
  body('address.country').optional().isString().withMessage('Страна должна быть строкой.'),
  body('address.city').optional().isString().withMessage('Город должен быть строкой.'),
  body('address.street').optional().isString().withMessage('Улица должна быть строкой.'),
  body('address.zipCode').optional().isString().withMessage('Почтовый индекс должен быть строкой.'),
  body('phoneNumber').optional().isString().withMessage('Номер телефона должен быть строкой.'),
  body('birthDate').optional().isISO8601().toDate().withMessage('Дата рождения должна быть в формате ISO8601.'),
];
