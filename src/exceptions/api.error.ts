export class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(message: string = 'Unauthorized: Пользователь не авторизован.') {
    return new ApiError(401, message);
  }

  static BadRequest(message: string = 'Bad Request: Некорректный запрос.', errors: any[] = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message: string = 'Not Found: Запрашиваемый ресурс не найден.') {
    return new ApiError(404, message);
  }

  static InternalServerError(message: string = 'Internal Server Error: Внутренняя ошибка сервера.') {
    return new ApiError(500, message);
  }

  static Forbidden(message: string = 'Forbidden: Доступ запрещён.') {
    return new ApiError(403, message);
  }

  static Conflict(message: string = 'Conflict: Конфликт.') {
    return new ApiError(409, message);
  }

  static ValidationFailed(errors: any[] = []) {
    return new ApiError(422, 'Validation Failed: Ошибка валидации.', errors);
  }

  static TooManyRequests(message: string = 'Too Many Requests: Слишком много запросов.') {
    return new ApiError(429, message);
  }
}
