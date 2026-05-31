import express from "express";
import {placeOrder, placeOrderRazorpay} from "../controllers/orderController.js";

const Orderrouter = express.Router();
Orderrouter.post("/placeorder", placeOrder);
Orderrouter.post("/placeorder/razorpay", placeOrderRazorpay);

export default Orderrouter;