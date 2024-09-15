import { Router } from "express";
import CastController from "../controller/cast";

export const CastRoute = Router();

CastRoute.get("/", CastController.find);
CastRoute.post("/", CastController.create);
