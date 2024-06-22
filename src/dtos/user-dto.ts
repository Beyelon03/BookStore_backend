import { IUser, UserRoles } from '../interfaces/IUser';

class UserDto {
  email: string;
  id: string;
  username: string;
  role: UserRoles;

  constructor(model: IUser) {
    this.email = model.email;
    this.username = model.username;
    this.id = model._id.toString();
    this.role = model.role;
  }

  static fromArray(models: IUser[]): UserDto[] {
    return models.map((model) => new UserDto(model));
  }
}

export default UserDto;
