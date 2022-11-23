import jwt = require('jsonwebtoken');
import IReturn from '../interfaces/returnInterface';
// import HttpException from '../interfaces/HttpException';

require('dotenv/config');

const secret: jwt.Secret = process.env.JWT_SECRET as string;

const createToken = (id: number) => {
  const token = jwt.sign({ data: { id } }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token: string): IReturn => {
  try {
    const result = jwt.decode(token) as jwt.JwtPayload;

    return { type: null, message: result.data.id, status: 0 };
  } catch (_err) {
    // throw new HttpException(401, 'Token must be a valid token');
    return { type: 'TokenErro', message: 'Token must be a valid token', status: 401 };
  }
};

export = {
  createToken,
  validateToken,
};
