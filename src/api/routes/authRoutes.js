import express from 'express';
//import { signupWithEmailPassword } from '../controllers/authController.js';
// import verifyToken from '../middleware/verifyAuthToken.js';
// import { signupWithEmailPassword } from '../middleware/signupWithEmailPassword.js';

import { userOtpVerifySignup } from '../controllers/otpController.js';
import { checkUserAlreadyVerified, otpGenerateAndStoreDb } from '../middleware/otpMiddleware.js';


import { protectedTest } from '../controllers/test/protected.js';

import verifyFirebaseIdToken from '../middleware/TokenVerify.js';
import { loginWithEmailPassword, logoutUser, sendOtpMailSignUpController, signInWithGoogle } from '../controllers/authController.js';
import { authenticateJwt, signupFirebaseAndMongoDb } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

// authRouter.post('/signup', verifyToken, signupWithEmailPassword, otpMiddleware, sendOTPMail);
authRouter.post('/signup', signupFirebaseAndMongoDb, otpGenerateAndStoreDb, sendOtpMailSignUpController);
authRouter.post('/signup-otp-verify', checkUserAlreadyVerified, userOtpVerifySignup);
authRouter.post('/signup-resend-otp', checkUserAlreadyVerified, otpGenerateAndStoreDb, sendOtpMailSignUpController);
authRouter.post('/signIn-with-google', verifyFirebaseIdToken, signInWithGoogle);
authRouter.post('/login', verifyFirebaseIdToken, loginWithEmailPassword);
authRouter.post('/logout', logoutUser)
// test route to check JWT authentication
authRouter.get('/test/protected', authenticateJwt, protectedTest);

export default authRouter;