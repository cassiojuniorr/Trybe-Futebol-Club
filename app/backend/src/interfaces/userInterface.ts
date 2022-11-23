interface ILogin {
  email: string,
  password: string
}

interface IUser {
  username: string
  role: string,
  email: string,
  password: string,
}

export { ILogin, IUser };
