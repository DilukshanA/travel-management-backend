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

// get all rides
export const getAllRides = async (req, res) => {
    try {
        const rides = await Ride.find()
            .populate('drivers', 'firstName lastName email') // Adjust fields as needed for drivers
            .populate('assistants', 'firstName lastName email')
            .populate('passengers', 'firstName lastName email')
            // .populate('vehicles', 'vehicleName vehicleType vehicleNumber');

        return res.status(200).json({
            message: "Rides fetched successfully",
            rides: rides
        })
    } catch (error) {
        console.error("Error fetching rides:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
        return;
    }
}

export const getRideById = async (req, res) => {
    try {
        
        const { id } = req.params;
        console.log("Ride ID:", id);

        const ride = await Ride.findById(id)
            .populate('drivers', 'firstName lastName email') // Adjust fields as needed for drivers
            .populate('assistants', 'firstName lastName email') // Adjust fields as needed for assistants
            .populate('passengers', 'firstName lastName email') // Adjust fields as needed for passengers
            // .populate('vehicles', 'vehicleName vehicleType vehicleNumber');
        
        if (!ride) {
            return res.status(404).json({
                message: "Ride not found"
            })
        }
        return res.status(200).json({
            message: "Ride fetched successfully",
            ride: ride
        })
        
    } catch (error) {
        console.error("Error fetching ride:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
        return;
    }
}