import * as bcrypt from 'bcryptjs';
import jwt = require('../utils/jwt.util');
import { ILogin, IUser } from '../interfaces/userInterface';
import UserModel from '../database/models/UserModel';
import IReturn from '../interfaces/returnInterface';
// import HttpException from '../interfaces/HttpException';

export default class UserService {
  static async login(login: ILogin): Promise<IReturn> {
    const { email, password } = login;

    if (!email || !password) {
      // throw new HttpException(400, 'All fields must be filled');
      return { type: 'fields', message: 'All fields must be filled', status: 400 };
    }

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      // throw new HttpException(401, 'User not Found');
      return { type: 'User not Found', message: 'User not Found', status: 401 };
    }

    const resp: IUser = user.dataValues;
    const validation = await bcrypt.compare(password, resp.password);

    if (!validation) {
      // throw new HttpException(401, 'Incorrect email or password');
      return {
        type: 'Incorrect email or password',
        message: 'Incorrect email or password',
        status: 401 };
    }

    const token = jwt.createToken(resp.id as number);

    return { type: null, message: token, status: 200 };
  }

  static async loginVal(token: string): Promise<IReturn> {
    const { type, message, status } = jwt.validateToken(token);
    if (type) {
      return { type, message, status };
    }

    const result = await UserModel.findOne({ where: { id: Number(message) } }) as unknown as IUser;

    return { type: null, message: result.role, status: 200 };
  }
}
