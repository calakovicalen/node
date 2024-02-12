import { Response } from 'express';
import { ICart, ICartItem, CartModel } from '../models/cart.model';

export const getCart = async (userId: string, res: Response) => {
  try {
    let cart: ICart;

    cart = await CartModel.findOne({ userId });
    console.log(cart);
    if (!cart) {
      const newCart = new CartModel({
        userId: userId,
        isDeleted: false,
        items: [],
      });

      await newCart.save();

      return res.status(201).json({
        status: 'created',
        data: { cart: newCart },
      });
    }

    res.status(200).json({
      status: 'success',
      data: { cart },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error' + error.message,
    });
  }
};

export const updateCart = async (
  cartId: string,
  updatedItems: ICartItem[],
  res: Response
) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      cartId,
      { items: updatedItems },
      { new: true }
    );

    if (updatedCart) {
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
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const emptyCart = async (userId: string, res: Response) => {
  try {
    const emptyCart = await CartModel.findByIdAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );

    if (emptyCart) {
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
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const createOrder = async (userId: string, body: any, res: Response) => {
  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart || cart.isDeleted) {
      return res.status(404).send('Cart not found');
    }

    const order = {
      userId,
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
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
