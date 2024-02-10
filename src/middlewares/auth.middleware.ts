import { Request, Response, NextFunction } from 'express';
import { database } from '../data/database';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authenticateUser = (
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

  const userExists = checkIfUserExists(userId);

  if (!userExists) {
    return res.status(403).json({ error: 'Forbidden - User does not exist' });
  }

  req.userId = userId;

  next();
};

const checkIfUserExists = (userId: string): boolean => {
  const userExists = database.users.some(user => user.id.includes(userId));
  return userExists;
};
