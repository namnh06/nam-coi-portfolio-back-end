import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Request, Response, NextFunction } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];
  interface Token {
    userId: string;
  }

  let decodedToken: Token | undefined;
  try {
    const decodedToken = jwt.verify(token, 'axon.active');
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.userId = decodedToken.userId;
  req.isAuth = true;

  return next();
};
export default auth;
