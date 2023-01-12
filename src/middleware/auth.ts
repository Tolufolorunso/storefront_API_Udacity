import { NextFunction, Request, Response } from 'express';
import { CustomError } from './globalErrorHandler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

interface TokenInterface {
  username: string;
  id: number;
}

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // console.log(req.headers.authorization)

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new CustomError(StatusCodes.UNAUTHORIZED, 'Invalid authorization'));
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret') as TokenInterface;
    const { username, id } = decoded;
    console.log(username, id);
    // req.user = { username, id };
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(37, error);
      next(new CustomError(401, 'Invalid user'));
    }
  }
};

export default authenticationMiddleware;
