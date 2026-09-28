import { Router } from "express";
import { getServerHealth } from "../controllers/healthController.js";
//import { validateBody, validateParams } from '../middleware/validate.js';
//import { createCustomObjectSchema } from '../schemas/issueSchemas.js';

export const healthRouter = Router();

healthRouter.get("/", getServerHealth)

//customRouter.post('/', validateBody(createCustomObjectSchema), <controller here>)