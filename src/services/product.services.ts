import { Response } from 'express';
import { ProductModel } from '../models/product.model';

export const getProducts = async (res: Response) => {
  try {
    const products = await ProductModel.find();

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

export const getProduct = async (productId, res) => {
  try {
    const product = await ProductModel.findById(productId);

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
