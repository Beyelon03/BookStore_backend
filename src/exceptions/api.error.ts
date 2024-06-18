export class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован.');
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message: string = 'Ресурс не найден.') {
    return new ApiError(404, message);
  }

  static InternalServerError(message: string = 'Внутренняя ошибка сервера.') {
    return new ApiError(500, message);
  }

  static Forbidden(message: string = 'Доступ запрещён.') {
    return new ApiError(403, message);
  }

  static Conflict(message: string = 'Конфликт.') {
    return new ApiError(409, message);
  }

  static ValidationFailed(errors: any[] = []) {
    return new ApiError(422, 'Ошибка валидации.', errors);
  }

  static TooManyRequests(message: string = 'Слишком много запросов.') {
    return new ApiError(429, message);
  }
}
