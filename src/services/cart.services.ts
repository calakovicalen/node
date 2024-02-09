import { Response } from 'express';
import { Cart, CartItem, CartModel } from '../models/cart.model';
import { Types } from 'mongoose';
import { User } from '../models/user.model';

const doesUserExist = async (userId: string): Promise<boolean> => {
  if (!Types.ObjectId.isValid(userId)) {
    return false;
  }

  const user = await User.findById(userId);
  return !!user;
};

export const getCart = async (
  userId: string,
  cartId: string,
  res: Response
) => {
  try {
    const isUserValid = await doesUserExist(userId);
    console.log(isUserValid);

    let cart: Cart;

    if (Types.ObjectId.isValid(cartId)) {
      cart = await CartModel.findById(cartId);
    }

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
  updatedItems: CartItem[],
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

export const emptyCart = async (cartId: string, res: Response) => {
  try {
    const emptyCart = await CartModel.findByIdAndUpdate(
      cartId,
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

export const createOrder = async (
  userId: string,
  cartId: string,
  body: any,
  res: Response
) => {
  try {
    const cart = await CartModel.findById(cartId);

    if (!cart || cart.isDeleted) {
      return res.status(404).send('Cart not found');
    }

    const order = {
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
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
