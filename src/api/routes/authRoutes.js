import express from 'express';
//import { signupWithEmailPassword } from '../controllers/authController.js';
import verifyToken from '../middleware/verifyAuthToken.js';
import { signupWithEmailPassword } from '../middleware/signupWithEmailPassword.js';
import otpMiddleware from '../middleware/handleOtp.js';
import { sendOTPMail } from '../controllers/sendMailController.js';

const authRouter = express.Router();

authRouter.post('/signup', verifyToken, signupWithEmailPassword, otpMiddleware, sendOTPMail);

export default authRouter;