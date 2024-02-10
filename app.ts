import express from 'express';
import userRoutes from './src/routes/user.routes';
import productRoutes from './src/routes/product.routes';
import { authenticateUser } from './src/middlewares/auth.middleware';

const app = express();
app.use(express.json());
app.use(authenticateUser);

const port = 3000;

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
