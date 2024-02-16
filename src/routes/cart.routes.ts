import express, { Request, Response } from 'express';
import {
  createOrderController,
  emptyCartController,
  getCartController,
  updateCartController,
} from '../controllers/cart.controller';
import { isAdmin } from '../middlewares/isAdmin';

const router = express.Router();

router
  .route('')
  .get((req: Request, res: Response) => getCartController(req, res))
  .put((req: Request, res: Response) => updateCartController(req, res))
  .delete(isAdmin, (req: Request, res: Response) =>
    emptyCartController(req, res)
  );

router.post('/checkout', (req: Request, res: Response) =>
  createOrderController(req, res)
);

export default router;
