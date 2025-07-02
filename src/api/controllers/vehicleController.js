import { Vehicle } from "../../models/vehicle.js";


export const addNewVehicle = async (req, res) => {
    const { name, type, licensePlate, owner, photo, totalSeats } = req.body;

    try {
        if ( !name || !type || !licensePlate || !owner || !totalSeats ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Create a new vehicle object
        const newVehicle = new Vehicle({
            name,
            type,
            licensePlate,
            owner,
            photo, // Optional field
            totalSeats
        })

        await newVehicle.save();
        console.log("New vehicle added:", newVehicle);
        res.status(201).json({
            message: "Vehicle added successfully",
            vehicleName: newVehicle.name
        });
    } catch (error) {
        
    }
}