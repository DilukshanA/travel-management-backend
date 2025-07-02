import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
    {
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        assistant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true // Assistant is optional
        },
        passengers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        startLocation: {
            type: String,
            required: true
        },
        endLocation: {
            type: String,
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
            default: 'Scheduled'
        }
    },
    {
        timestamps: true
    }
)

export const Ride = mongoose.model('Ride', rideSchema);