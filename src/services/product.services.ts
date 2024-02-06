import { Request, Response } from 'express';
import { database } from '../data/database';

export const getProducts = (req: Request, res: Response) => {
  const products = database.products;

  res.status(200).json({
    status: 'success',
    data: { products },
  });
};

export const getProduct = (req: Request, res: Response) => {
  const productId = req.params.productId;
  const product = database.products.find(product => product.id === productId);

  if (product) {
    return res.status(200).json({
      status: 'success',
      data: { product },
    });
  } else {
    return res.status(404).json({
      status: 'fail',
      message: 'Product not found.',
    });
  }
};
