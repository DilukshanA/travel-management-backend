import express from 'express';
//import { signupWithEmailPassword } from '../controllers/authController.js';
// import verifyToken from '../middleware/verifyAuthToken.js';
// import { signupWithEmailPassword } from '../middleware/signupWithEmailPassword.js';
import otpGenerateAndStoreDb from '../middleware/otpMiddleware.js';
import { sendOTPMail } from '../controllers/sendMailController.js';
import { userOtpVerifySignup } from '../controllers/otpController.js';
import signupFirebaseAndMongoDb from '../middleware/signupFirebaseAndMongoDb.js';
import signUpWithGoogle from '../controllers/signUpWithGoogle.js';
import authenticateJwt from '../middleware/auth/authenticateJwt.js';
import { protectedTest } from '../controllers/test/protected.js';
import checkUserAlreadyVerified from '../middleware/userVerfyMiddleware.js';
import verifyFirebaseIdToken from '../middleware/TokenVerify.js';
import { loginWithEmailPassword } from '../controllers/authController.js';

const authRouter = express.Router();

// authRouter.post('/signup', verifyToken, signupWithEmailPassword, otpMiddleware, sendOTPMail);
authRouter.post('/signup', signupFirebaseAndMongoDb, otpGenerateAndStoreDb, sendOTPMail);
authRouter.post('/signup-otp-verify', checkUserAlreadyVerified, userOtpVerifySignup);
authRouter.post('/signup-resend-otp', checkUserAlreadyVerified, otpGenerateAndStoreDb, sendOTPMail);
authRouter.post('/signup-with-google', signUpWithGoogle);
authRouter.post('/login', verifyFirebaseIdToken, loginWithEmailPassword);
// test route to check JWT authentication
authRouter.get('/test/protected', authenticateJwt, protectedTest);

export default authRouter;