import express from 'express';
import userRoutes from './src/routes/user.routes';
import productRoutes from './src/routes/product.routes';

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB conneceted');
});

app.use(express.json());
const port = 3000;

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
