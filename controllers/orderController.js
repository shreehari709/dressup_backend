import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";


const currency = "INR";


export const placeOrderRazorpay = async (
  req,
  res
) => {
  try {
    console.log("BODY RECEIVED");
    console.log(req.body);

    const {
      amount,
      items,
      address,
    } = req.body;

    const razorpayInstance =
      new Razorpay({
        key_id:
          process.env.RAZORPAY_KEY_ID,

        key_secret:
          process.env.RAZORPAY_KEY_SECRET,
      });

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt:
        "receipt_" + Date.now(),
    };

    const razorpayOrder =
      await razorpayInstance.orders.create(
        options
      );

    await orderModel.create({
      razorpayOrderId:
        razorpayOrder.id,

      amount,

      items,

      address,

      payment: false,
    });

    res.status(200).json({
      success: true,
      order: razorpayOrder,
    });
  } catch (error) {
    console.log(
      "RAZORPAY ERROR:"
    );
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getOrder = async (req, res) => {
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

export const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
    } = req.body;

    await orderModel.findOneAndUpdate(
      {
        razorpayOrderId:
          razorpay_order_id,
      },
      {
        razorpayPaymentId:
          razorpay_payment_id,

        payment: true,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};