import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const {wishlist, toggleWishlist} = useWishlist()
  const isInWishlist = wishlist[product.id]

  return (
    // 1. DOKUNUŞ: h-full ve flex flex-col ekledik.
    <div key={product.id} className=" relative group bg-white rounded-xl overflow-hidden transition hover:shadow-lg flex flex-col h-full border border-gray-100">

      <Link to={`/product/${product.id}`} >
      <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden relative p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transition duration-300 group-hover:scale-105 mx-auto"
        />
      </div>

      {/* 2. DOKUNUŞ: flex-1 ekledik. Yazı kısa olsa da alanı doldurur. */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-medium line-clamp-2 text-gray-700 min-h-10">
          {product.title}
        </h3>

        <p className="mt-4 mb-2 text-lg font-bold text-gray-900">
          ${product.price}
        </p>
        

      </div>

      </Link>
        {/* 3. DOKUNUŞ: mt-auto ile butonu en alta ittik */}
        <button 
            onClick={() => addToCart({ ...product, quantity: 1 })}
            className="mt-auto w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 active:scale-95 shadow-md hover:shadow-indigo-200 pt-4 cursor-pointer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Sepete Ekle
        </button>
        <div className="absolute top-3 right-3">
        <button onClick={() => toggleWishlist(product)}>
  <Heart
    className={`transition duration-200 ${
      isInWishlist
        ? "text-red-500 fill-red-500"
        : "text-gray-400 hover:text-red-400"
    }`}
  />
</button>
        </div>
    </div>
  );
  
}