import { Request, Response } from 'express';
import * as cartService from '../services/cart.services';

export const getCartController = (req: Request, res: Response) => {
  cartService.getCart(req.params.userId, req.params.cartId, res);
};

export const updateCartController = (req: Request, res: Response) => {
  cartService.updateCart(req.params.cartId, req.body.items, res);
};

export const emptyCartController = (req: Request, res: Response) => {
  cartService.emptyCart(req.params.cartId, res);
};

export const createOrderController = (req: Request, res: Response) => {
  cartService.createOrder(req.params.userId, req.params.cartId, req.body, res);
};
