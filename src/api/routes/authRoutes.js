import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { signupWithEmailPassword } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', verifyToken, signupWithEmailPassword);

export default authRouter;