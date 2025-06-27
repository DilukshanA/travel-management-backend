import { User } from "../../../models/user.js";

export const protectedTest = async (req, res) => {
    const uid = req.user.uid;
    const user = await User.findOne({uid});
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    return res.status(200).json({
        user
    })
}