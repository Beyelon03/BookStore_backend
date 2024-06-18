import { IUser } from '../interfaces/IUser';

class UserDto {
  email: string;
  id: string;
  username: string;

  constructor(model: IUser) {
    this.email = model.email;
    this.username = model.username;
    this.id = model._id.toString(); // Преобразуем ObjectId в строку
  }
}

export default UserDto;