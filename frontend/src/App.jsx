
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AddProduct from "./pages/AddProduct";
import ViewProducts from "./pages/ViewProducts";
import SearchProduct from "./pages/SearchProduct";
import UpdateProduct from "./pages/UpdateProduct";
import DeleteProduct from "./pages/DeleteProduct";

function Home() {
    return (
        <div className="container">
            <h2>Product Inventory Management</h2>

            <div className="menu">
                <Link to="/add">Add Product</Link>
                <Link to="/view">View Products</Link>
                <Link to="/search">Search Product</Link>
                <Link to="/update">Update Product</Link>
                <Link to="/delete">Delete Product</Link>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/view" element={<ViewProducts />} />
                <Route path="/search" element={<SearchProduct />} />
                <Route path="/update" element={<UpdateProduct />} />
                <Route path="/delete" element={<DeleteProduct />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
