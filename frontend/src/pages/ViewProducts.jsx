
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ViewProducts() {

    const [products, setProducts] = useState([]);

    const viewProducts = async () => {
        try {
            const res = await fetch("http://localhost:5000/view");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            alert("Error Fetching Products");
        }
    };

    useEffect(() => {
        viewProducts();
    }, []);

    return (
        <div className="container">

            <h2>View Products</h2>

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
                    {products.map((p) => (
                        <tr key={p._id}>
                            <td>{p.product_id}</td>
                            <td>{p.product_name}</td>
                            <td>{p.category}</td>
                            <td>{p.price}</td>
                            <td>{p.quantity}</td>
                            <td>
                                {p.quantity > 0
                                    ? "In Stock"
                                    : "Out of Stock"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />

            <button onClick={viewProducts}>Refresh</button>

            <br />
            <Link to="/">Back to Home</Link>

        </div>
    );
}

export default ViewProducts;
