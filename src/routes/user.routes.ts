import express, { Request, Response } from 'express';
import {
  createOrderController,
  emptyCartController,
  getCartController,
  updateCartController,
} from '../controllers/user.controller';

const router = express.Router();

router
  .route('/:userId/:cartId')
  .get((req: Request, res: Response) => getCartController(req, res))
  .put((req: Request, res: Response) => updateCartController(req, res))
  .delete((req: Request, res: Response) => emptyCartController(req, res));

router.post('/:userId/:cartId/checkout', (req: Request, res: Response) =>
  createOrderController(req, res)
);

export default router;
