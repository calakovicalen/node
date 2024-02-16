import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

interface CurrentUser {
  id: string;
  email: string;
  role: string;
}
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user: CurrentUser;
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized - User ID not provided' });
  }

  const userExists = await checkIfUserExists(userId);

  if (!userExists) {
    return res.status(403).json({ error: 'Forbidden - User does not exist' });
  }

  req.userId = userId;

  next();
};

const checkIfUserExists = async (userId: string): Promise<boolean> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    return false;
  }
  return !!user;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Token is required');
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(403).send('Invalid Token');
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as CurrentUser;

    req.user = user;
  } catch (error) {
    return res.status(401).send('Invalid Token');
  }

  return next();
};
