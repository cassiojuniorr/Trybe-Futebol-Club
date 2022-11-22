import HttpException from '../interfaces/HttpException';
import ILogin from '../interfaces/userInterface';
import UserModel from '../database/models/UserModel';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('../utils/jwt.util');

export default class UserService {
  static async login(login: ILogin): Promise<string> {
    const { email, password } = login;
    const user = await UserModel.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new HttpException(401, 'invalid fields');
    }

    const token: string = jwt.createToken(email);

    return token;
  }
}
