import { Otp } from "../../models/otp.js";
import { User } from "../../models/user.js";
import generateOTP from "../../utils/otp.js";

// this will call generteOtp and store the otp in the database and work as middleware
export const otpGenerateAndStoreDb = async (req, res, next) => {

    const { email } = req.body;
    const otp = generateOTP();

    if (!email) {
        return res.status(400).json({
            message: "User email is required"
        });
    }

    console.log("email and otp", email, otp);

    try {
        // Check if OTP already exists for an email
        const existingEmailForOtp = await Otp.findOne({ email: email});
        if (existingEmailForOtp) {
            // if otp already exists for the email, update it
            existingEmailForOtp.otp = otp;
            existingEmailForOtp.createdAt = Date.now();
            await existingEmailForOtp.save();
        } else {
            await Otp.create({
                email: email,
                otp: otp,
                createdAt: Date.now()
            })
        }

        req.body.otp = otp; // make available to next controller
        next();
        
    } catch (error) {
        return res.status(500).json({
            message: "Failed to generate OTP",
            error: error.message,
        });
    }
}

// this middleware checks if the user is already verified - to prevent re-verification
export const checkUserAlreadyVerified = async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: "User not found. Please sign up first."
            })
        }
        if(user.verified) {
            return res.status(403).json({
                message : "User already verified. Please login."
            })
        }
        if(!user.verified) {
            next(); // proceed to the next middleware or controller
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }

}