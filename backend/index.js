import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import emailRoutes from './router/emailRoutes.js';

const PORT = 5000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/email-scheduler', emailRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => `Server is running on ${PORT}`);
