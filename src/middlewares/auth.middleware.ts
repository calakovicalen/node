import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { UserModel } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
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
