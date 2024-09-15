import { Router } from "express";
import { auth } from "../middleware/auth";
import { adminPermission } from "../middleware/admin-permission";
import { AuthRoute } from "./auth-route";
import { UserRoute } from "./user-route";
import { MovieRoute } from "./movie-route";
import { CastRoute } from "./cast-route";
import { DirectorRoute } from "./director-route";

export const routes = Router();

routes.use("/auth", AuthRoute);
routes.use("/user", auth, UserRoute);
routes.use("/movie", MovieRoute);
routes.use("/cast", auth, adminPermission, CastRoute);
routes.use("/directors", auth, adminPermission, DirectorRoute);
