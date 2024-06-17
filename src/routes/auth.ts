import { Router } from "express";
import { login, register, me, logout } from "../controllers/auth";
import { privateRoute } from "../config/passport";
import { RequestHandler } from "express";
const authRoutes: Router = Router();

authRoutes.post("/signUp", register as RequestHandler);
authRoutes.post("/logIn", login as RequestHandler);
authRoutes.get("/me", privateRoute, me as RequestHandler);
authRoutes.post("/logout", privateRoute, logout as RequestHandler);
export default authRoutes;
