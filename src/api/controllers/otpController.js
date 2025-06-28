import { Otp } from "../../models/otp.js";
import { User } from "../../models/user.js";

const userOtpVerifySignup = async (req, res) => {

    const { email, otp } = req.body;

    try {
        const record = await Otp.findOne( { email });

        if(!record) {
            return res.status(404).json({
                message: "OTP not found or Expires. Please request a new OTP."
            })
        } else if (record.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP. Please try again."
            })
        } else if (record.otp === otp) {

            // OTP is valid, proceed with user verification
            await User.findOneAndUpdate(
                { email },
                { verified: true }
            )

            // delete the OTP record after successful verification
            await Otp.findOneAndDelete( { email });

            return res.status(200).json({
                message: "OTP verified successfully.",
                email: email
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export { userOtpVerifySignup };