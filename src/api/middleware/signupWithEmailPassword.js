import { User } from '../../models/user.js';

export const signupWithEmailPassword = async (req, res, next) => {
    try {
        const { uid, firstName, lastName, email, role } = req.body;

        const checkUserExists = await User.findOne( { uid } );
        if (!checkUserExists) {
            const newUser = new User({
                uid,
                firstName,
                lastName,
                email,
                verified,
                role
            })
            await newUser.save();
            res.status(201).json({
                message: "User registered successfully!",
                role: newUser.role,
            })
        } else {
            res.status(400).json({
                message: "User already exists",
                role: checkUserExists.role,
            })
        }
        next();

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}