import express from 'express';
import { createRide, getAllRides, getRideById } from '../controllers/ridesController.js';

const ridesRouter = express.Router();

ridesRouter.post('/create-ride', createRide);
ridesRouter.get('/get-all-rides', getAllRides);
ridesRouter.get('/get-ride/:id', getRideById);

export default ridesRouter;