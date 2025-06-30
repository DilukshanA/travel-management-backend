{/* This file not used currently because this code copy to middleware that signupWithEmailPassword.js*/}

import { User } from '../../models/user.js';

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

// sign in with email and password
export const loginWithEmailPassword = async (req, res) => {
    const authHeader = req.headers.authorization;
}