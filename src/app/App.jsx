import React, { useEffect } from "react";
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
import WishlistPage from "../pages/WishlistPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProtectedRoute from "../context/ProtectedRoute";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import SuccessPage from "../pages/successPage"

export default function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="product/:id" element={<ProductDetail />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="about" element={<About />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
                        <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        <Route path="order-history" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
                        <Route path="success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}