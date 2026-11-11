
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddProduct() {

    const [product, setProduct] = useState({
        product_id: "",
        product_name: "",
        category: "",
        price: "",
        quantity: ""
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const addProduct = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...product,
                    product_id: Number(product.product_id),
                    price: Number(product.price),
                    quantity: Number(product.quantity)
                })
            });

            alert(await res.text());

            if (res.ok) {
                setProduct({
                    product_id: "",
                    product_name: "",
                    category: "",
                    price: "",
                    quantity: ""
                });
            }
        } catch (err) {
            alert("Server Error");
        }
    };

    return (
        <div className="container">

            <h2>Add Product</h2>

            <form onSubmit={addProduct}>

                <input
                    type="number"
                    name="product_id"
                    placeholder="Product ID"
                    value={product.product_id}
                    onChange={handleChange}
                    required
                />

                <input
                    name="product_name"
                    placeholder="Product Name"
                    value={product.product_name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    min="0"
                    value={product.quantity}
                    onChange={handleChange}
                    required
                />

                <br />

                <button type="submit">Add Product</button>

            </form>

            <br />
            <Link to="/">Back to Home</Link>

        </div>
    );
}

export default AddProduct;
