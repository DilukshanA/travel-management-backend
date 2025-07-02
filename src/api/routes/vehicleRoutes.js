import express from 'express';
import { addNewVehicle } from '../controllers/vehicleController.js';

const vehicleRouter = express.Router();

vehicleRouter.post('/add-vehicle', addNewVehicle);

export default vehicleRouter;