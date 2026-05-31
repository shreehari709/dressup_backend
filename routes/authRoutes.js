import express from "express";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/authController.js";

import { isAuthenticated } from "../middlewares/authMiddleware.js";

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.post("/logout", logout);

// Protected Route
authRoute.get("/me", isAuthenticated, getMe);

export default authRoute;