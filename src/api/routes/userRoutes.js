import express from 'express';
import { getUserData } from '../controllers/userController.js';
import authenticateJwt from '../middleware/auth/authenticateJwt.js';

const userRouter = express.Router();

userRouter.get('/get-user-data', authenticateJwt, getUserData);

export default userRouter;