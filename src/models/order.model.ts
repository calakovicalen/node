import { CartItem } from './cart.model';
import { Schema, model, Types } from 'mongoose';

type ORDER_STATUS = 'created' | 'completed';

export interface Order {
  _id: string;
  userId: string;
  cartId: string;
  items: CartItem[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const orderSchema = new Schema({
  userId: String,
  cartId: String,
  items: Types.Array<CartItem>,
  payment: {
    type: String,
    address: String,
    creditCard: String,
  },
  delivery: {
    type: String,
    address: String,
  },
  comments: String,
  status: String,
  total: Number,
});

const Order = model<Order>('Order', orderSchema);
