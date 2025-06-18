import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        verified: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ['user', 'driver', 'assistant', 'admin'],
            default: 'user',
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema);