import orderModel from "../models/orderModel.js";
import jwt from "jsonwebtoken";


const createAdminToken = () => {
  return jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //  console.log("EMAIL:", email);
    // console.log("PASSWORD:", password);
    // console.log(
    //   "ENV EMAIL:",
    //   process.env.ADMIN_EMAIL
    // );

    // console.log(
    //   "ENV PASSWORD:",
    //   process.env.ADMIN_PASSWORD
    // );
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET
      );

      return res.json({
        success: true,
        token,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await orderModel
        .find()
        .sort({ date: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus =
  async (req, res) => {
    try {
      const { orderId, status } =
        req.body;

      await orderModel.findByIdAndUpdate(
        orderId,
        {
          orderStatus: status,
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

export const dashboardStats =
  async (req, res) => {
    try {
      const orders =
        await orderModel.find();

      const revenue =
        orders.reduce(
          (sum, order) =>
            sum + order.amount,
          0
        );

      const totalOrders =
        orders.length;

      const productsSold =
        orders.reduce(
          (sum, order) =>
            sum +
            order.items.reduce(
              (s, item) =>
                s + item.qty,
              0
            ),
          0
        );

      res.json({
        success: true,
        revenue,
        totalOrders,
        productsSold,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };