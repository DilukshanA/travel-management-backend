import { User } from '../../models/user.js';
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
        })
    } catch (error) {
        console.error("Error logging in user:", error);
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