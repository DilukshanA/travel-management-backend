import express from 'express';
import { sendOTPMail, sendTestMail } from '../controllers/sendMailController.js';
import otpMiddleware from '../middleware/handleOtp.js';

const sendMailRouter = express.Router();

sendMailRouter.post('/test', sendTestMail);
sendMailRouter.post('/signup-otp', otpMiddleware, sendOTPMail);

export default sendMailRouter;