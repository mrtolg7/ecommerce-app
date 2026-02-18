import React from "react";
import ReactDOM from "react-dom/client" 
import "./index.css"
import App from "./app/App"
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./utils/AuthContext";

import Cart from "./components/Cart";
import { ProductProvider } from "./ProductContext";

ReactDOM.createRoot(document.getElementById("root")).render(

        <AuthProvider>
            <CartProvider>
                <ProductProvider>
                    <App />
                </ProductProvider>
            </CartProvider>
        </AuthProvider>
)