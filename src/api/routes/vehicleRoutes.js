import express from 'express';
import { addNewVehicle, getAllVehicles, getVehicleById } from '../controllers/vehicleController.js';

const vehicleRouter = express.Router();

vehicleRouter.post('/add-vehicle', addNewVehicle);
vehicleRouter.get('/all-vehicles', getAllVehicles);
vehicleRouter.get('/vehicle/:id', getVehicleById);

export default vehicleRouter;