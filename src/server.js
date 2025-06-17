import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import authRouter from './api/routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

await connectDB();

app.get('/', (req, res) => {
    res.send(`Server is running on http://localhost:${PORT}`);
})

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})