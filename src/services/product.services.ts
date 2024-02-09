import { Request, Response } from 'express';
import { Product } from '../models/product.model';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: 'success',
      data: { products },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
