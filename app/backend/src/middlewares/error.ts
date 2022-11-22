import { NextFunction, Request, Response } from 'express';
import HttpException from '../interfaces/HttpException';

const error = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpException;

  return res.status(status || 500).json({ message } || 'Error Server');
};

export default error;
