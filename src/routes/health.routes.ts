import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.route('').get((req: Request, res: Response) => {
  const serverStatus = 'Server is up and running!';
  const dbStatus =
    mongoose.connection.readyState === 1
      ? 'MongoDB is connected'
      : 'MongoDB connection is not established';

  res.json({
    serverStatus,
    dbStatus,
  });
});

export default router;
