import { Schema, model } from 'mongoose';
export interface IUser {
  _id: String;
  email?: String;
  password?: String;
  role?: String;
}

const userSchema = new Schema({
  email: String,
  password: String,
  role: String,
});

export const User = model<IUser>('User', userSchema);
