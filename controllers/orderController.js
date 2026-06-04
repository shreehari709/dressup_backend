import orderModel from "../models/orderModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { sendOrderEmails } from "../services/emailService.js";

export const placeOrderRazorpay = async (req, res) => {
  try {
    //console.log("BODY RECEIVED:");
    //console.log(req.body);

    const {
      amount,
      items,
      address,
      email,
      userId,
    } = req.body;

    if (!amount || !items || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret:
        process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder =
      await razorpayInstance.orders.create(
        options
      );

    const savedOrder =
      await orderModel.create({
        userId: userId || null,
        email: email || "",

        razorpayOrderId:
          razorpayOrder.id,

        amount,

        items,

        address,

        payment: false,

        date: Date.now(),
      });

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      dbOrderId: savedOrder._id,
    });
  } catch (error) {
    console.log("RAZORPAY ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment verification failed",
      });
    }

    const updatedOrder =
      await orderModel.findOneAndUpdate(
        {
          razorpayOrderId:
            razorpay_order_id,
        },
        {
          razorpayPaymentId:
            razorpay_payment_id,

          payment: true,
        },
        {
          new: true,
        }
      );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log("Before sending emails");

await sendOrderEmails(updatedOrder);

console.log("After sending emails");

    res.json({
      success: true,
      message:
        "Payment verified successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrder = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;

    const orders =
      await orderModel
        .find({
          userId,
          payment: true,
        })
        .sort({
          date: -1,
        });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};