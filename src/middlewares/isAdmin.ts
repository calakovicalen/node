import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.user;

  if (currentUser.role !== 'admin') {
    return res.status(401).send('Only admins can delete cart');
  }
  next();
};
