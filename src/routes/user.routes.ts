import express, { Request, Response } from 'express';
import {
  registerUserController,
  loginUserController,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/register', (req: Request, res: Response) =>
  registerUserController(req, res)
);

router.post('/login', (req: Request, res: Response) =>
  loginUserController(req, res)
);

export default router;
