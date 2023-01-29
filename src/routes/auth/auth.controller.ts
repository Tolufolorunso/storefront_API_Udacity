import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/User';
import { BadRequest, UnauthenticatedError } from '../../middleware/globalErrorHandler';
import bcrypt from 'bcryptjs';
// import { createJWT } from '../../utils/jwt';
import jwt from 'jsonwebtoken';
import { jwtExpiresIn, jwtSecret } from '../../utils/env';

const userDB = new User();

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const username = req.body.username as unknown as string;
  const firstname = req.body.firstname as unknown as string;
  const lastname = req.body.lastname as unknown as string;
  const role = req.body.role as unknown as string;
  const password = req.body.password as unknown as string;

  console.log(req.body);

  if (!username || !firstname || !lastname || !password) {
    return next(new BadRequest(`All fields required`));
  }
  try {
    // const user = {};
    const user = await userDB.register({ username, firstname, lastname, password, role });
    res.status(201).json({
      status: true,
      message: 'Registered successfully',
      user,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const username = req.body.username as unknown as string;
  const password = req.body.password as unknown as string;

  if (!username || !password) {
    return next(new BadRequest('All fields required'));
  }

  try {
    const user = await userDB.login(username);
    if (!user) {
      return next(new UnauthenticatedError('Invalid credential'));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(new UnauthenticatedError('Invalid credential'));
    }

    const usernameJwt = user.username as unknown as string;
    const idJwt = user.id as unknown as number;
    const JWT_SECRET = jwtSecret as unknown as string;
    const JWT_EXPIRES_IN = jwtExpiresIn as unknown as string;

    const token = jwt.sign({ username: usernameJwt, id: idJwt }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const userData = { ...user, password: undefined };

    res.status(200).json({
      status: true,
      message: 'Login successfully',
      user: userData,
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new Error(error.message));
    }
  }
};

export { registerUser, login };
