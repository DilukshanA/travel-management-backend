import express from 'express';
import { sendTestMail } from '../controllers/sendMailController.js';

const sendMailRouter = express.Router();

sendMailRouter.post('/test', sendTestMail); // this is for testing purposes only

export default sendMailRouter;