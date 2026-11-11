
import React, { useState } from "react";
import { Link } from "react-router-dom";

function SearchProduct() {

    const [key, setKey] = useState("");
    const [product, setProduct] = useState(null);

    const searchProduct = async () => {

        if (!key.trim()) {
            alert("Enter Product ID or Name");
            return;
        }

        try {
            const res = await fetch(
                "http://localhost:5000/search/" +
                encodeURIComponent(key)
            );

            if (res.ok) {
                const data = await res.json();
                setProduct(data);
            } else {
                setProduct(null);
                alert("Product Not Found");
            }
        } catch (err) {
            alert("Server Error");
        }
    };

    return (
        <div className="container">

            <h2>Search Product</h2>

            <input
                placeholder="Enter Product ID or Name"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />

            <button onClick={searchProduct}>Search</button>

            {product && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                {product.quantity > 0
                                    ? "In Stock"
                                    : "Out of Stock"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}

            <br />
            <Link to="/">Back to Home</Link>

        </div>
    );
}

export default SearchProduct;
