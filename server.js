import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cloudinaryConfig from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
//import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();

await connectDB(); // Call the connectDB function to establish the database connection
cloudinaryConfig(); // Call the cloudinaryConfig function to set up Cloudinary configuration
const app = express();




const PORT = process.env.PORT || 5000;
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());
app.use(cookieParser());

//end points
app.use('/auth', userRoutes); // Use the user routes for handling user-related endpoints

app.use('/api/products', productRoutes); // Use the product routes for handling product-related endpoints

//app.use('/api/auth', authRoutes);

app.use('/order', orderRoutes)

app.get("/", (req, res) => {
  res.send("Server Running");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
