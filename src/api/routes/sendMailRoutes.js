import express from 'express';
import { sendOTPMail, sendTestMail } from '../controllers/sendMailController.js';
import otpMiddleware from '../middleware/otpMiddleware.js';

const sendMailRouter = express.Router();

sendMailRouter.post('/test', sendTestMail); // this is for testing purposes only
sendMailRouter.post('/signup-otp', otpMiddleware, sendOTPMail); // this is not used now

export default sendMailRouter;