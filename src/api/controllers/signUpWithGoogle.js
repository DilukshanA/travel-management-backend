import admin from "../../config/firebase.js";
import { User } from "../../models/user.js";
import { generateJwtToken } from "../../utils/jwt.js";

const signUpWithGoogle = async (req, res) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "Unauthorized: No token provided"
        })
    }

    const  idToken = authHeader.split("Bearer ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        const { uid, email, name } = decodedToken;

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
                isNewUser: true // for new user frontend navigation
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
                isNewUser: false // for new user frontend navigation
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

export default signUpWithGoogle