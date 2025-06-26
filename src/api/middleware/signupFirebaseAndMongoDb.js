{/* This middleware will call signup with email and password in firebase then store mongo db from doing backend*/}

import admin from "../../config/firebase.js";
import { User } from "../../models/user.js";
import firebaseAuthErrorMap from "../../utils/firebaseAuthErrors.js";
import createSessionCookieWithCustomToken from "../controllers/SessionCookie/createSessionCookie.js";

const signupFirebaseAndMongoDb = async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        
        if ( firstName && lastName && email && password ) {
            //create firebase user if not exists
            const userRecord = await admin.auth().createUser({
                email,
                password
            })



            const userUid = userRecord.uid;



            

            // Check if user already exists in the database
            const checkUserExists = await User.findOne({ uid: userRecord.uid });
            if (!checkUserExists) {
                // create new user in the database
                const newUser = new User({
                    uid: userRecord.uid,
                    firstName,
                    lastName,
                    email,
                    verified: false, // Default to false, will be updated after OTP verification
                    role,
                });

                await newUser.save();




                console.log("User created in Firebase and MongoDB:", userUid);
                await createSessionCookieWithCustomToken(userUid, res);





                res.status(200).json({
                    message: "User registered successfully!",
                    role: newUser.role,
                })
            } else {
                res.status(400).json({
                    message: "User already exists",
                    role: checkUserExists.role,
                });
            }
        } else {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        next();
    } catch (error) {
        console.error("Error creating user:", error);

        if (typeof error.code === "string" && error.code.startsWith("auth/")) {
            // Handle Firebase auth errors
            const firebaseError = firebaseAuthErrorMap[error.code];
            if (firebaseError ) {
                return res.status(firebaseError.status).json({
                    message: firebaseError.message
                });
            }
        }
        // Handle other errors
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export default signupFirebaseAndMongoDb;