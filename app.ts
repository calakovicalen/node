import express from 'express';
import cartRoutes from './src/routes/cart.routes';
import userRoutes from './src/routes/user.routes';
import productRoutes from './src/routes/product.routes';
import healthRoutes from './src/routes/health.routes';
import {
  authenticateUser,
  verifyToken,
} from './src/middlewares/auth.middleware';
import { gracefulShutdown } from './src/helpers/gracefulShutdown';

const winston = require('winston');
const expressWinston = require('express-winston');
const { format } = require('date-fns');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
dotenv.config();

const db_url = process.env.DB_URL;
const db_name = process.env.DB_NAME;
const db_port = process.env.DB_PORT;
const port = process.env.PORT;

mongoose.connect(`mongodb://${db_url}:${db_port}/${db_name}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Winston configuration for application logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

// Middleware for logging incoming requests
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
      winston.format.printf(
        info =>
          `[${format(
            new Date(info.timestamp),
            'EEE, dd MMM yyyy HH:mm:ss'
          )}] ${info.level.toUpperCase()} ${info.message}`
      )
    ),
  })
);

app.use('/auth', userRoutes);
app.use('/health', healthRoutes);
app.use(authenticateUser);
app.use('/products', verifyToken, productRoutes);
app.use('/profile/cart', verifyToken, cartRoutes);

const server = app.listen(port, () => {
  logger.info(`App running on port ${port}`);
});

gracefulShutdown(server);
