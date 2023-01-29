import { NextFunction, Request, Response } from 'express';
import { UnauthenticatedError } from './globalErrorHandler';
// import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { RequestCustom } from '../requestCustom';

const userModel = new User();

interface TokenInterface {
  username: string;
  id: number;
}

const authenticationMiddleware = async (req: RequestCustom, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new UnauthenticatedError('Invalid authorization'));
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret') as TokenInterface;
    const { username, id } = decoded;
    const user = await userModel.login(username);
    if (user.id === id && user.username === username) {
      req.user = {
        id,
        username,
        role: user.role,
      };
      next();
    } else {
      next(new UnauthenticatedError('Invalid user'));
    }
  } catch (error) {
    if (error instanceof Error) {
      next(new UnauthenticatedError('Invalid user'));
    }
  }
};

export default authenticationMiddleware;
