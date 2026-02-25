import { lazy , Suspense} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import ProtectedRoute from "../context/ProtectedRoute";
import Cart from "../components/Cart";

const About = lazy (() => import( "../pages/About"));
const Blog = lazy (() => import( "../pages/Blog"));
const ProductDetail = lazy (() => import( "../pages/ProductDetail"));
const AuthPage = lazy (() => import( "../pages/AuthPage"));
const WishlistPage = lazy (() => import( "../pages/WishlistPage"));
const CheckoutPage = lazy (() => import( "../pages/CheckoutPage"));
const SearchPage = lazy (() => import( "../pages/SearchPage"));
const ProfilePage = lazy (() => import( "../pages/ProfilePage"));
const OrderHistoryPage = lazy (() => import( "../pages/OrderHistoryPage"));
const SuccessPage = lazy (() => import( "../pages/successPage"));
const NotFoundPage = lazy (() => import( "../pages/NotFoundPage"));

export default function App() {


    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div></div>}>
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
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )

}