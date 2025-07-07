import { Ride } from "../../models/ride.js";

export const createRide = async (req, res) => {

    try {
        // Transform frontend lat/lng to GeoJSON
        const { rideName,
            startLocation,
            endLocation,
            distance,
            drivers,
            assistants,
            passengers,
            vehicles,
            startDateTime,
            endDateTime,
            totalSeats,
            availableSeats,
            status } = req.body;

            const newRide = new Ride({
                rideName,
                startLocation: {
                    type: "Point",
                    coordinates: [startLocation.lng, startLocation.lat],
                    address: startLocation.address,
                },
                endLocation: {
                    type: "Point",
                    coordinates: [endLocation.lng, endLocation.lat],
                    address: endLocation.address,
                },
                distance,
                drivers,
                assistants,
                passengers,
                vehicles,
                startDateTime,
                endDateTime,
                totalSeats,
                availableSeats,
                status
            })

            await newRide.save();

            return res.status(201).json({
                message: "Ride created successfully",
                ride: newRide
            })
        
    } catch (error) {
        console.error("Error creating ride:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
        return;
    }
}