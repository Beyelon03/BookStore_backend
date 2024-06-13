class UserCreateDTO {
  username: string;
  email: string;
  password: string;

  constructor(user: UserCreateDTO) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  }
}

export default UserCreateDTO;
