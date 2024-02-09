import mongoose, { Document } from 'mongoose';
import { IProduct } from './product.model';

export interface CartItem {
  product: IProduct['_id'];
  count: number;
}

export interface Cart extends Document {
  _id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItem[];
}

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      count: { type: Number, required: true },
    },
  ],
});

export const CartModel = mongoose.model<Cart>('Cart', cartSchema);
