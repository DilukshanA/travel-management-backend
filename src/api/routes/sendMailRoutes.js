import express from 'express';
import { sendOTPMail, sendTestMail } from '../controllers/sendMailController.js';

const sendMailRouter = express.Router();

sendMailRouter.post('/test', sendTestMail);
sendMailRouter.post('/signup-otp', sendOTPMail);

export default sendMailRouter;