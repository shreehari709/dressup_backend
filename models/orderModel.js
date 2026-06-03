import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
    },

    payment: {
      type: Boolean,
      default: false,
    },

    address: {
      name: String,
      address: String,
      city: String,
      state: String,
      contact: String,
      pincode: String,
    },

    items: [
      {
        productId: Number,
        name: String,
        image: String,
        size: String,
        qty: Number,
        price: Number,
      },
    ],

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

const orderModel = mongoose.model(
  "Order",
  orderSchema
);

export default orderModel;