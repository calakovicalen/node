import express, { Request, Response } from 'express';
import {
  getProductController,
  getProductsController,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', (res: Response) => getProductsController(res));

router.get('/:productId', (req: Request, res: Response) =>
  getProductController(req, res)
);

export default router;
