import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

await connectDB();

app.get('/', (req, res) => {
    res.send(`Server is running on http://localhost:${PORT}`);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})