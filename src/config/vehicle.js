import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Car', 'Bus', 'Truck', 'Van'],
            required: true
        },
        licensePlate: {
            type: String,
            required: true,
            unique: true
        },
        owner: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: false // Optional field for vehicle photo
        },
        totalSeats: {
            type: Number,
            required: true,
            min: 1 // At least one seat
        }
    }
)

export const vehicle = new mongoose.Schema('Vehicle', vehicleSchema)