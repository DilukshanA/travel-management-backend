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

// update user data
const updateUserData = async (req, res) => {
    try {
        const userUid = req.user.uid; // get user uid from authenticateJWT middleware

        // only allow updating certain fields
        const { firstName, lastName, role } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { uid: userUid },
            { firstName, lastName, role },
            { new: true } // return the updated user
        );
        if( !updatedUser ) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "User updated successfully",
            user:  updatedUser
        })
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            message: "Server error while updating user.",
            error: error.message
        });
    }
}

export { getUserData, updateUserData };