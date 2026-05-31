import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    products: { type: Array, required: true },
    productsId: { type: Array, required: true },
    items: { type : Array, required: true },
    contact: { type: Number, required: true },
    pinCode: { type: Number, required: true },
    amount:{ type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    payment: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);