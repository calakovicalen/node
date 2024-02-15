// product.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  title: String,
  description: String,
  price: Number,
});

export const ProductModel = model<IProduct>('Product', productSchema);
