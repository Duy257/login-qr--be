import { Router } from "express";
import DirectorController from "../controller/director";

export const DirectorRoute = Router();

DirectorRoute.get("/", DirectorController.find);
// DirectorRoute.post("/", DirectorController.create);
