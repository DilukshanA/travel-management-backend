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
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true
        },
        startLocation: {
            type: {
            type: String,
            enum: ["Point"],
            default: "Point"
            },
            coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
            },
            address: {
            type: String,
            required: true
            }
        },
        endLocation: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        },
        address: {
            type: String,
            required: true
        }
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
        },
        totalSeats: {
            type: Number,
            required: true,
            min: 1 // At least one seat
        },
        availableSeats: {
            type: Number,
            required: true,
            min: 0 // Cannot be negative
        },
    },
    {
        timestamps: true
    }
);

rideSchema.index({ startLocation: "2dsphere" });
rideSchema.index({ endLocation: "2dsphere" });

export const Ride = mongoose.model('Ride', rideSchema);