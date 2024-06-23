import { body } from 'express-validator';

const getRegistrationValidation = () => [
  body('username')
    .notEmpty()
    .withMessage('Имя пользователя обязательно')
    .isLength({ min: 4, max: 16 })
    .withMessage('Имя пользователя должно быть не менее 4 символов и не более 16.')
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage('Имя пользователя должно содержать только английские буквы и цифры, и не содержать пробелов'),
  body('email').isEmail().withMessage('Пожалуйста, предоставьте действительный адрес электронной почты.'),
  body('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('Пароль должен содержать не менее 6 символов и не более 16.'),
];
export default getRegistrationValidation;
