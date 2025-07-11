import { Vehicle } from "../../models/vehicle.js";


export const addNewVehicle = async (req, res) => {
    const { vehicleName, vehicleType, vehicleNumber, ownerName, ownerPhone, vehiclePhoto, status, totalSeats } = req.body;

    try {
        if ( !vehicleName || !vehicleType || !vehicleNumber || !ownerName  || !ownerPhone || !totalSeats ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // find if vehicle with the same number already exists
        const existingVehicle = await Vehicle.findOne({ vehicleNumber });
        if (existingVehicle) {
            return res.status(400).json({
                message: `Vehicle with number ${vehicleNumber} already exists!`
            });
        }

        // Create a new vehicle object
        const newVehicle = new Vehicle({
            vehicleName,
            vehicleType,
            vehicleNumber,
            ownerName,
            ownerPhone,
            vehiclePhoto, // Optional field
            status,
            totalSeats
        })

        await newVehicle.save();
        console.log("New vehicle added:", newVehicle);
        res.status(201).json({
            message: "Vehicle added successfully",
            vehicleName: newVehicle.name
        });
    } catch (error) {
        console.error("Error adding new vehicle:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}