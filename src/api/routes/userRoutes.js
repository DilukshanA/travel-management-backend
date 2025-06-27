import express from 'express';
import getUserById from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/user',getUserById);

export default userRouter;