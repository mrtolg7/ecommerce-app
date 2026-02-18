
import ReactDOM from "react-dom/client" 
import "./index.css"
import App from "./app/App"
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishProvider } from "./context/WishlistContext";

import { ProductProvider } from "./context/ProductContext";

ReactDOM.createRoot(document.getElementById("root")).render(

        <AuthProvider>
            <CartProvider>
            <WishProvider>
                <ProductProvider>
                    <App />
                </ProductProvider>
            </WishProvider>
            </CartProvider>
        </AuthProvider>
)