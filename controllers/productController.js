import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const listProducts = (req, res) => {
    res.status(200).json({ message: 'List of products' });
}


const addProduct = async (req, res) => {
    try {
        const { name, description, price, ProductType } = req.body;
        const image = req.files['image'][0].path; // Access the uploaded image path
        // Here you would typically save the product to the database
        const images = [image]; // Store the image path in an array if you want to support multiple images
        let imageUrls = await Promise.all(images.map(async (image) => {
            let result = await cloudinary.uploader.upload(image.path);
            return result.secure_url; // Return the secure URL of the uploaded image
        }));

        const newProduct = {
            name,
            description,
            price : Number(price), // Convert price to a number
            ProductType,
            images: imageUrls // Store the array of image URLs in the product document
        };
        const newProductDoc = new Product(newProduct);
        await newProductDoc.save(); // Save the product document to the database
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product' });
    }
}

const updateProduct = (req, res) => {
    res.status(200).json({ message: 'Product updated successfully' });
}

const deleteProduct = (req, res) => {
    res.status(200).json({ message: 'Product deleted successfully' });
}


export { listProducts, addProduct, updateProduct, deleteProduct };  