import orderModel from "../models/orderModel.js";
import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

const currency = 'inr'

export const placeOrder = async (req, res) => {
    try {
        const { user, products, productsId, items, contact, pinCode, amount, address } = req.body;
        const order = new Order({
            user,
            products,
            productsId,
            items,
            contact,
            pinCode,
            amount,
            address,
        });

        const newOrder = new OrderModel(order);
        await newOrder.save();

        await userModel.findByIdAndUpdate(user, {carData:{}})

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to place order", error: error.message });
    }
};

export const placeOrderRazorpay = async (req, res) => {
    try {

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

       const {user, items, amount, address} = req.body
       const orderData = {
        user, items, address, amount, payment:false, date: Date.now()
       }

       const newOrder = new orderModel(orderData)
       await newOrder.save()

       const options = {
        amount: amount*100,
        currency:currency.toUpperCase(),
        receipt: newOrder._id.toString()
       }

       await razorpayInstance.orders.create(options, (error,order)=>{
        if(error){console.log(error)
            return res.json({success:false, message:error})
        }
        res.json({success:true, order})
       } )

    } catch (error) {
        res.status(500).json({ message: "Failed to place order", error: error.message });
    }
};

