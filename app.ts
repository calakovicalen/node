import express from 'express';
import userRoutes from './src/routes/cart.routes';
import productRoutes from './src/routes/product.routes';
import { authenticateUser } from './src/middlewares/auth.middleware';
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-mongo');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();

dotenv.config();

/* const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
); */

/* mongoose.connect(DB).then(() => {
  console.log('DB conneceted');
}); */

app.use(express.json());
app.use(authenticateUser);
const port = 3000;

app.use('/products', productRoutes);
app.use('/profile/cart', userRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
