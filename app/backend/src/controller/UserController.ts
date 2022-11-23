import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { type, message, status } = await UserService.login({ email, password });
    if (type) {
      return res.status(status).json({ message });
    }

    res.status(status).json({ token: message });
  }

  static async loginVal(req: Request, res: Response) {
    const { authorization } = req.headers;

    const { type, message, status } = await UserService.loginVal(authorization as string);
    if (type) {
      return res.status(status).json({ message });
    }

    res.status(status).json({ role: message });
  }
}
