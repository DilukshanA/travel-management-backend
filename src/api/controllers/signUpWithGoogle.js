import admin from "../../config/firebase.js";
import { User } from "../../models/user.js";

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
        //this will be used to create a new user in MongoDB
        // for new user or lazy sync with mongoDB when server error occurs
        if (!user) {
            const newUser = new User({
                uid,
                email,
                firstName: name?.split(" ")[0] || "",
                lastName: name?.split(" ")[1] || "",
                verified: true, // Google sign-in users are considered verified
                role: "user" // default role, can be changed later
            })
            await newUser.save();
            return res.status(200).json({
                message: "User registered successfully!",
                role: newUser.role
            })
        } else {
            // if user exists, return the user role
            return res.status(201).json({
                message: "User already exists",
                role: user.role
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