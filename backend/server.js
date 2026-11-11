
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/inventorydb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Product Schema
const productSchema = new mongoose.Schema({
    product_id: { type: Number, unique: true },
    product_name: String,
    category: String,
    price: Number,
    quantity: Number
});

const Product = mongoose.model("Product", productSchema);

// 1. ADD PRODUCT
app.post("/add", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.send("Product Added Successfully");
    } catch(err) {
        res.status(400).send("Error Adding Product");
    }
});

// 2. VIEW ALL PRODUCTS
app.get("/view", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch(err) {
        res.status(500).send("Error Fetching Products");
    }
});

// 3. SEARCH BY PRODUCT ID OR NAME
app.get("/search/:key", async (req, res) => {
    try {
        const key = req.params.key;

        const product = await Product.findOne({
            $or: [
                { product_id: Number(key) },
                { product_name: { $regex: key, $options: "i" } }
            ]
        });

        if(product)
            res.json(product);
        else
            res.status(404).send("Product Not Found");
    } catch(err) {
        res.status(500).send("Search Error");
    }
});

// 4. UPDATE PRODUCT
app.put("/update/:id", async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { product_id: Number(req.params.id) },
            {
                category: req.body.category,
                price: req.body.price,
                quantity: req.body.quantity
            },
            { new: true }
        );

        if(product)
            res.send("Product Updated Successfully");
        else
            res.status(404).send("Product Not Found");
    } catch(err) {
        res.status(400).send("Update Error");
    }
});

// 5. DELETE PRODUCT
app.delete("/delete/:id", async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            product_id: Number(req.params.id)
        });

        if(product)
            res.send("Product Deleted Successfully");
        else
            res.status(404).send("Product Not Found");
    } catch(err) {
        res.status(500).send("Delete Error");
    }
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
