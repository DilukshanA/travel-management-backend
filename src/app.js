import express from 'express';
import cors from 'cors';
import authRouter from './api/routes/authRoutes.js';
import sendMailRouter from './api/routes/sendMailRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`Server is running on http://localhost:${PORT}`);
})

app.use('/api/auth', authRouter);
app.use('/api/sendMail', sendMailRouter);

export default app;