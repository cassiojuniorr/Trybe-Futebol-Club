import jwt = require('../utils/jwt.util');
import { ILogin, IUser } from '../interfaces/userInterface';
import UserModel from '../database/models/UserModel';
import HttpException from '../interfaces/HttpException';

export default class UserService {
  static async login(login: ILogin): Promise<string | undefined> {
    const { email, password } = login;
    const user = await UserModel.findOne({ where: { email } }) as unknown as IUser;

    if (!user) {
      throw new HttpException(401, 'User not Found');
    }

    if (!email || !password) {
      throw new HttpException(400, 'All fields must be filled');
    }

    if (user.email !== email || user.password !== password) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = jwt.createToken(email);

    return token;
  }

  static async loginVal(token: string): Promise<object> {
    const email = jwt.validateToken(token);
    const { role } = await UserModel.findOne({ where: { email } }) as unknown as IUser;

    return { role };
  }
}
