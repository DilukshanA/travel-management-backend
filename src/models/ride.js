import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const rideSchema = new mongoose.Schema(
    {
        rideName: {
            type: String,
            required: true,
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
                type: [Number], // [longitude, latitude]
                required: true
            },
            address: {
                type: String,
                required: true
            }
        },
        distance: {
            type: Number,
        },
        drivers: [{
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'User',
            // required: true
            type: String // temporary solution, should be ObjectId
        }],
        assistants: [{
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'User'
            type: String // temporary solution, should be ObjectId
        }],
        passengers: [{
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'User'
            type: String // temporary solution, should be ObjectId
        }],
        vehicle: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Vehicle',
            // required: true
            type: String // temporary solution, should be ObjectId
        },
        startDateTime: {
            type: Date,
            required: true
        },
        endDateTime: {
            type: Date,
            required: true
        },
        totalSeats: {
            type: Number,
            required: true,
            min: 1 // At least one seat
        },
        availableSeats: {
            type: Number,
            min: 0 // Cannot be negative
        },
        status: {
            type: String,
            enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
            default: 'Scheduled'
        },
    },
    {
        timestamps: true
    }
);

rideSchema.index({ startLocation: "2dsphere" });
rideSchema.index({ endLocation: "2dsphere" });

export const Ride = mongoose.model('Ride', rideSchema);