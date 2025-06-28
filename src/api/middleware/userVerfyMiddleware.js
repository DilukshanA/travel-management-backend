import { User } from "../../models/user.js";

// this middleware checks if the user is already verified - to prevent re-verification
const checkUserAlreadyVerified = async (req, res, next) => {
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

export default checkUserAlreadyVerified;