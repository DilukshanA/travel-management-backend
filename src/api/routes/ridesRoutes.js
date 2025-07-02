import express from 'express';
import { createRide } from '../controllers/ridesController.js';

const ridesRouter = express.Router();

ridesRouter.post('/create-ride', createRide);

export default ridesRouter;