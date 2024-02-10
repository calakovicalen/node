const { v4: uuid } = require('uuid');
import { database } from '../data/database';
import { Response } from 'express';
import { Cart, CartItem } from '../models/cart.model';

export const getCart = (userId: string, cartId: string, res: Response) => {
  try {
    const cart = database.carts.find(cart => cart.id === cartId);
    const user = database.users.find(user => user.id === userId);

    if (!user) {
      throw new Error('User not found.'); // Throw an exception for user not found
    }

    if (!cart) {
      const newCart: Cart = {
        id: uuid(),
        userId: userId,
        isDeleted: false,
        items: [],
      };

      res.status(201).json({
        status: 'created',
        data: { cart: newCart },
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { cart },
      });
    }
  } catch (error) {
    console.error('Error getting cart:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const updateCart = (
  cartId: string,
  updatedItems: CartItem[],
  res: Response
) => {
  try {
    const cartIndex = database.carts.findIndex(cart => cart.id === cartId);

    if (cartIndex !== -1) {
      const updatedCart: Cart = {
        ...database.carts[cartIndex],
        items: updatedItems,
      };

      database.carts[cartIndex] = updatedCart;

      res.status(200).json({
        status: 'success',
        message: 'User cart updated',
        data: { updatedCart },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'User cart not found',
      });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const emptyCart = (cartId: string, res: Response) => {
  try {
    const cartIndex = database.carts.findIndex(cart => cart.id === cartId);

    if (cartIndex !== -1) {
      const emptyCart: Cart = {
        ...database.carts[cartIndex],
        items: [],
      };

      database.carts[cartIndex] = emptyCart;

      res.status(200).json({
        status: 'success',
        message: 'User cart emptied',
        data: { emptyCart },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'User cart not found',
      });
    }
  } catch (error) {
    console.error('Error emptying cart:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const createOrder = (
  userId: string,
  cartId: string,
  body: any,
  res: Response
) => {
  const cart = database.carts.find(cart => cart.id === cartId);

  if (!cart || cart.isDeleted) {
    return res.status(404).send('Cart not found');
  }

  const order = {
    id: `order${database.orders.length + 1}`,
    userId,
    cartId,
    items: cart.items,
    payment: body.payment,
    delivery: body.delivery,
    comments: body.comments || '',
    status: 'created',
    total: cart.items.reduce(
      (total, item) => total + item.product.price * item.count,
      0
    ),
  };

  res.status(201).json({
    status: 'created',
    data: { order },
  });
};
