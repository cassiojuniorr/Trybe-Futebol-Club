import jwt = require('jsonwebtoken');
import HttpException from '../interfaces/HttpException';

require('dotenv/config');

const secret: jwt.Secret = process.env.JWT_SECRET as string;

const createToken = (data: string) => {
  const token = jwt.sign({ data }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token: string) => {
  try {
    const result = jwt.verify(token, secret);

    return result;
  } catch (_err) {
    throw new HttpException(401, 'Token expired or invalid');
  }
};

export = {
  createToken,
  validateToken,
};
