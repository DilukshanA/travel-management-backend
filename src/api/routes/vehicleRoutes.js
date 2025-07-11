import express from 'express';
import { addNewVehicle, getAllVehicles } from '../controllers/vehicleController.js';

const vehicleRouter = express.Router();

vehicleRouter.post('/add-vehicle', addNewVehicle);
vehicleRouter.get('/all-vehicles', getAllVehicles);

export default vehicleRouter;