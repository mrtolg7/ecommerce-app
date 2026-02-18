import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPages from "../pages/ProductPages";
import Header from "../components/Header";
import Cart from "../components/Cart";
import Home from "../pages/Home";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Layout from "../components/Layout";
import ProductDetail from "../pages/ProductDetail";
import AuthPage from "../pages/AuthPage";
import WishlistPage from "../pages/WIshlistPage";


export default function App() {
    
    
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<ProductDetail/>} />
                <Route path="cart" element={<Cart />} />
                <Route path="about" element={<About />} />
                <Route path="blog" element={<Blog />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
            </Route>
        </Routes>
        </BrowserRouter>
        </>
    )

}