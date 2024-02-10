import express, { Request, Response } from 'express';
import { getProduct, getProducts } from '../services/product.services';

const router = express.Router();

router.get('/', (req: Request, res: Response) => getProducts(req, res));

router.get('/:productId', (req: Request, res: Response) =>
  getProduct(req, res)
);

export default router;
