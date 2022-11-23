import { Request, Response } from 'express';
import HttpException from '../interfaces/HttpException';
import UserService from '../services/UserService';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await UserService.login({ email, password });

    res.status(200).json({ token });
  }

  static async loginVal(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(401, 'Need pass one Token');
    }

    const role = await UserService.loginVal(authorization);

    res.status(200).json(role);
  }
}
