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
  try {
    const productId = req.params.productId;
    const product = database.products.find(product => product.id === productId);

    if (product) {
      return res.status(200).json({
        status: 'success',
        data: { product },
      });
    } else {
      throw new Error('Product not found.');
    }
  } catch (error) {
    console.error('Error getting product:', error.message);
    res.status(404).json({
      status: 'fail',
      message: error.message || 'Product not found.',
    });
  }
};
