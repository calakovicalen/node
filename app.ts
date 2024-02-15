import express from 'express';
import cartRoutes from './src/routes/cart.routes';
import userRoutes from './src/routes/user.routes';
import productRoutes from './src/routes/product.routes';
import {
  authenticateUser,
  verifyToken,
} from './src/middlewares/auth.middleware';
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-mongodb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();

dotenv.config();

app.use(express.json());
const port = 3000;

app.use('/auth', userRoutes);

app.use(authenticateUser);
app.use('/products', verifyToken, productRoutes);
app.use('/profile/cart', verifyToken, cartRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
