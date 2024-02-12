import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';
export interface IUser {
  _id: String;
  email?: String;
  password?: String;
  role?: String;
}

const userSchema = new Schema({
  _id: { type: String, default: () => uuid() },
  email: String,
  password: String,
  role: String,
});

export const UserModel = model<IUser>('User', userSchema);
