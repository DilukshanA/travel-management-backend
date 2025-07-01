import express from 'express';
import { getUserData, updateUserData } from '../controllers/userController.js';
import authenticateJwt from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/get-user-data', authenticateJwt, getUserData);
userRouter.put('/update-user-data', authenticateJwt, updateUserData);

export default userRouter;