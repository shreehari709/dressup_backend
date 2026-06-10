import express from "express";
import  adminAuth   from "../middlewares/adminAuth.js";
import { adminLogin, dashboardStats,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";

const Adminrouter = express.Router();

Adminrouter.post(
  "/login",
  adminLogin
);

Adminrouter.get(
  "/stats",
  adminAuth,
  dashboardStats
);

Adminrouter.get(
  "/orders",
  adminAuth,
  getAllOrders
);

Adminrouter.post("/update-status", adminAuth, updateOrderStatus);

export default Adminrouter;