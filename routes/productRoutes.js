import express from "express";
import {listProducts, addProduct, updateProduct, deleteProduct} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
const ProductRouter = express.Router();

ProductRouter.post('/add',upload.fields([{ name: 'image', maxCount: 1 }]  ), addProduct);
ProductRouter.get('/all', listProducts);
ProductRouter.put('/update/:id', upload.single('image'), updateProduct);
ProductRouter.delete('/delete/:id', deleteProduct);

export default ProductRouter;