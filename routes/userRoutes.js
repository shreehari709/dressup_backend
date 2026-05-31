import express from "express";

import {loginUser, registerUser} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post('/login', loginUser);

userRoutes.post('/register', registerUser);

export default userRoutes;
