import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        vehicleName: {
            type: String,
            required: true
        },
        vehicleType: {
            type: String,
            enum: ['Car', 'Bus', 'Truck', 'Van'],
            required: true
        },
        vehicleNumber: {
            type: String,
            required: true,
            unique: true
        },
        ownerName: {
            type: String,
            required: true
        },
        ownerPhone: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: false // Optional field for vehicle photo
        },
        status: {
            type: String,
            enum: ['Available', 'Maintenance', 'Unavailable'],
            default: 'Available'
        },
        totalSeats: {
            type: Number,
            required: true,
            min: 1 // At least one seat
        }
    }
)

export const Vehicle = mongoose.model('Vehicle', vehicleSchema)