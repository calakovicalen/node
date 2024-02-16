import { Request, Response } from 'express';
import * as cartService from '../services/cart.services';

export const getCartController = (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  cartService.getCart(userId, res);
};

export const updateCartController = (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  cartService.updateCart(userId, req.body, res);
};

export const emptyCartController = (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  cartService.emptyCart(userId, res);
};

export const createOrderController = (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  cartService.createOrder(userId, req.body, res);
};
