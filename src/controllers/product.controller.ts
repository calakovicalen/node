import { Request, Response } from 'express';
import * as productService from '../services/product.services';

export const getProductController = (req: Request, res: Response) => {
  productService.getProduct(req.params.productId, res);
};

export const getProductsController = (res: Response) => {
  productService.getProducts(res);
};
