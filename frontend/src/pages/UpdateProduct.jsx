
import React, { useState } from "react";
import { Link } from "react-router-dom";

function UpdateProduct() {

    const [product, setProduct] = useState({
        product_id: "",
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

    const updateProduct = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                "http://localhost:5000/update/" + product.product_id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        category: product.category,
                        price: Number(product.price),
                        quantity: Number(product.quantity)
                    })
                }
            );

            alert(await res.text());
        } catch (err) {
            alert("Server Error");
        }
    };

    return (
        <div className="container">

            <h2>Update Product</h2>

            <form onSubmit={updateProduct}>

                <input
                    type="number"
                    name="product_id"
                    placeholder="Product ID"
                    value={product.product_id}
                    onChange={handleChange}
                    required
                />

                <input
                    name="category"
                    placeholder="New Category"
                    value={product.category}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="New Price"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="New Quantity"
                    min="0"
                    value={product.quantity}
                    onChange={handleChange}
                    required
                />

                <br />

                <button type="submit">Update Product</button>

            </form>

            <br />
            <Link to="/">Back to Home</Link>

        </div>
    );
}

export default UpdateProduct;
