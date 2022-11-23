import jwt = require('../utils/jwt.util');
import ILogin from '../interfaces/userInterface';
import UserModel from '../database/models/UserModel';
import HttpException from '../interfaces/HttpException';

export default class UserService {
  static async login(login: ILogin): Promise<string | undefined> {
    const { email, password } = login;
    const user = await UserModel.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new HttpException(401, 'invalid fields');
    }

    if (!email || !password) {
      throw new HttpException(400, 'All fields must be filled');
    }

    const token = jwt.createToken(email);

    return token;
  }
}
