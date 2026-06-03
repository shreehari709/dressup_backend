import express from "express";
import { placeOrderRazorpay, getOrder, verifyPayment} from "../controllers/orderController.js";

const Orderrouter = express.Router();
Orderrouter.post("/razorpay", placeOrderRazorpay);
Orderrouter.post("/verifyPayment", verifyPayment);
Orderrouter.get("/MyOrders/:userId", getOrder);


Orderrouter.get("/test", (req,res)=>{
   res.json({message:"Order route working"});
});

export default Orderrouter;