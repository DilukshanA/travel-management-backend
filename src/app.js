import express from 'express';
import cors from 'cors';
import authRouter from './api/routes/authRoutes.js';
import sendMailRouter from './api/routes/sendMailRoutes.js';
import cookieParser from 'cookie-parser';
import userRouter from './api/routes/userRoutes.js';
import ridesRouter from './api/routes/ridesRoutes.js';

const app = express();

const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`Server is running on http://localhost:${PORT}`);
})

app.use('/api/auth', authRouter);
app.use('/api/sendMail', sendMailRouter);
app.use('/api', userRouter);
app.use('/api', ridesRouter);

export default app;