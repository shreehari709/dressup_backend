import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        default:"",
        //required: true,
    },

    pincode:{
        type: Number,
        //required:true,
    },
    cartData: {
        type: Object,
        default: {},
    },
    orders: {
        type: Object,
        default: {},
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {minimize: false});
 
export default mongoose.model("User", userSchema);
