import { Request, Response } from 'express';
import * as userServices from '../services/user.services';

export const registerUserController = async (req: Request, res: Response) => {
  const user = req.body;
  userServices.registerUser(user, res);
};

export const loginUserController = async (req: Request, res: Response) => {
  const user = req.body;
  userServices.loginUser(user, res);
};
