import { User } from '../../models/user.js';
import { sendOtpMailService } from '../../services/sendOtpMailService.js';
import { generateJwtToken } from '../../utils/jwt.js';

// sign in with email and password
// this will give a cookie with JWT token if user exists in MongoDB
export const loginWithEmailPassword = async (req, res) => {

    const { uid, email } = req.user;

    try {
        // check user is exists in mongoDB
        const user = await User.findOne({ uid, email } )

        if(!user) {
            return res.status(404).json({
                message: "User not found, please sign up first"
            })
        }

        // create JWT token
        const token = generateJwtToken({
            uid: user.uid,
            email: user.email,
        })

        // set cookie with JWT token
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return res.status(200).json({
            message: "User logged in successfully!",
            role: user.role,
            user,
        })
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// sign in or sign up with Google
export const signInWithGoogle = async (req, res) => {
    
    try {
        const { uid, email, name } = req.user;

        // check if the user already exists in mongoDB
        const user = await User.findOne({ uid, email });

        // if not user exists, create a new user
        // this will be used to create a new user in MongoDB
        // for new user or lazy sync with mongoDB when server error occurs
        if (!user) {
            const newUser = new User({
                uid,
                email,
                firstName: name?.split(" ")[0] || "",
                lastName: name?.split(" ")[1] || "",
                verified: true, // Google sign-in users are considered verified
                role: "Passenger" // default role, can be changed later
            })
            await newUser.save();

            // create JWT token
            const token = generateJwtToken({
                uid: newUser.uid,
                email: newUser.email,
            })

            // set cookie with JWT token
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })

            return res.status(200).json({
                message: "User registered successfully!",
                role: newUser.role,
                isNewUser: true, // for new user frontend navigation
                name: newUser.firstName
            })
        } else {
            // if user exists, sign in the user
            // create JWT token
            const token = generateJwtToken({
                uid: user.uid,
                email: user.email,
            })

            // set cookie with JWT token
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            return res.status(201).json({
                message: "User sign in successfully!",
                role: user.role,
                isNewUser: false, // for new user frontend navigation
                name: user.firstName
            })
        }
    } catch (error) {
        console.error("Error signing up with Google:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// This controller is signup controller that used to send OTP mail for signup
export const sendOtpMailSignUpController = async (req, res) => {
    try {
        const { email, otp, name } = req.body;

        const messageId = await sendOtpMailService(email, otp, name);

        res.status(201).json({
            message: "Your OTP has been sent successfully!",
            info: messageId
        })
    } catch (error) {
        console.error("Error sending OTP mail:", error);
        return res.status(500).json({
            message: "Failed to send OTP",
            error: error.message,
        })
    }
}

// sign out user
export const logoutUser = async (req, res) => {
    try {
        // clear cookie
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        return res.status(200).json({
            message: "User logged out successfully!",
            isLoggedOut: true
        })
    } catch (error) {
        console.error("Error logging out user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// this signupWithEmailPassword middleware not used currently
export const signupWithEmailPassword = async (req, res) => {
    try {
        const { uid, firstName, lastName, email, role } = req.body;

        const checkUserExists = await User.findOne( { uid } );
        if (!checkUserExists) {
            const newUser = new User({
                uid,
                firstName,
                lastName,
                email,
                role
            })
            await newUser.save();
            return res.status(201).json({
                message: "User registered successfully!",
                role: newUser.role,
            })
        } else {
            return res.status(400).json({
                message: "User already exists",
                role: checkUserExists.role,
            })
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}