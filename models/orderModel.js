import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {

      razorpayOrderId: String,
  razorpayPaymentId: String,

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
      orderStatus: {
  type: String,
  enum: [
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ],
  default: "Processing",
},

    date: {
      type: Date,
      default: Date.now,
    },
     estimatedDelivery: {
    type: Date,
  },
  },
  { minimize: false }
);

const orderModel = mongoose.model(
  "Order",
  orderSchema
);

export default orderModel;