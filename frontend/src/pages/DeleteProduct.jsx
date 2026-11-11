
import React, { useState } from "react";
import { Link } from "react-router-dom";

function DeleteProduct() {

    const [id, setId] = useState("");

    const deleteProduct = async (e) => {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delete?")) {
            return;
        }

        try {
            const res = await fetch(
                "http://localhost:5000/delete/" + id,
                {
                    method: "DELETE"
                }
            );

            alert(await res.text());

            if (res.ok) {
                setId("");
            }
        } catch (err) {
            alert("Server Error");
        }
    };

    return (
        <div className="container">

            <h2>Delete Product</h2>

            <form onSubmit={deleteProduct}>

                <input
                    type="number"
                    placeholder="Enter Product ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />

                <br />

                <button type="submit" className="delete">
                    Delete Product
                </button>

            </form>

            <br />
            <Link to="/">Back to Home</Link>

        </div>
    );
}

export default DeleteProduct;
