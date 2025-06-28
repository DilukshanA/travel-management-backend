import { User } from "../../models/user.js";

const getUserData = async (req, res) => {
    try {
        const uid = req.user.uid; // get user from authenticateJWT middleware
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User retrieved successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export { getUserData };