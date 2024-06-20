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
}

export default UserDto;