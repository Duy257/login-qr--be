import { Router } from "express";
import { auth } from "../middleware/auth";
import AuthController from "../controller/auth";

export const AuthRoute = Router();

AuthRoute.get("/create-qr-login", AuthController.createQrLogin);
AuthRoute.post("/register", AuthController.register);
AuthRoute.post("/signin", AuthController.login);
AuthRoute.post("/login-with-qr", AuthController.loginWithQr);
AuthRoute.post("/refresh", AuthController.loginWithToken);
AuthRoute.post("/confirm-login-qr", auth, AuthController.confirmLoginQr);
