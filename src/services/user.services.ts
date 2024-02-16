import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { IUser, UserModel } from '../models/user.model';

export const registerUser = async (user: IUser, res: Response) => {
  try {
    const { email, password, role } = user;
    console.log(user);
    if (!(email && password && role)) {
      res.status(400).send('All inputs are required');
    }

    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send('User already exists. Please login.');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: role || 'user',
    });

    await newUser.save();

    return res.status(201).json({
      status: 'created',
      data: { user: newUser },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error' + error.message,
    });
  }
};

export const loginUser = async (user: IUser, res: Response) => {
  try {
    const { email, password } = user;

    if (!(email && password)) {
      res.status(400).send('All inputs are required');
    }

    const existingUser = await UserModel.findOne({ email });

    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      const token = jwt.sign(
        {
          id: existingUser._id,
          email,
          role: existingUser.role,
        },
        process.env.TOKEN_KEY!,
        {
          expiresIn: '2h',
        }
      );

      return res.status(200).json({
        token,
      });
    }

    res.status(400).send('Invalid Credentials');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
