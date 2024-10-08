import { Router } from "express";
import { auth } from "../middleware/auth";
import { adminPermission } from "../middleware/admin-permission";
import { AuthRoute } from "./auth-route";
import { UserRoute } from "./user-route";

export const routes = Router();

routes.use("/auth", AuthRoute);
routes.use("/user", auth, UserRoute);
