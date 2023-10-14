import BruteForceSchema from 'express-brute-mongoose/dist/schema';
import mongoose from 'mongoose';

export default mongoose.model(
  'bruteforce',
  new mongoose.Schema(BruteForceSchema),
);
