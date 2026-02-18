import { useParams } from "react-router-dom";
import { getProductsObj } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { useState } from "react";


const ProductDetail = () => {
    const {id} = useParams()
    const {products, isLoading} = getProductsObj()
    const selectedProduct = products.find(p => p.id === Number(id))

    console.log(selectedProduct)
    const {addToCart, increaseQuantity} = useCart()
    const [quantity,setQuantity] = useState(1) 
    const decreaseBtn = document.getElementById("decreaseBtn")

    if(isLoading || !selectedProduct) {
        return <h1>Loading...</h1>
    }

    const  increasedQuantity = () => {
        setQuantity(prev => prev + 1)
        decreaseBtn.disabled = false
    }

    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity(prev => prev - 1)
        decreaseBtn.classList.remove()
      } else if(quantity === 1){
        decreaseBtn.disabled = true
      }
    }
  return (
    
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Product Image */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex items-center justify-center">
          <img
            src={selectedProduct.image}
            alt="Product"
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          
          {/* Category */}
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {selectedProduct.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedProduct.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-lg">
              {selectedProduct.rating.rate}
            </div>
            <span className="text-sm text-gray-500">(124 reviews)</span>
          </div>

          {/* Price */}
          <div className="text-2xl font-semibold text-blue-600">
            ${selectedProduct.price}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Quantity + Button */}
          <div className="flex items-center gap-4 mt-4">
            
            {/* Quantity Selector (UI only) */}
            <div className="flex items-center border rounded-lg overflow-hidden detail-quantity">
              <button onClick={() => decreaseQuantity()} className="px-4 py-2 bg-gray-100 hover:bg-gray-200" id="decreaseBtn">
                -
              </button>
              <span className="px-6 py-2">{quantity}</span>
              <button onClick={() => increasedQuantity()} className="px-4 py-2 bg-gray-100 hover:bg-gray-200">
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button onClick={() =>  addToCart({
    id: selectedProduct.id,
    title: selectedProduct.title,
    price: selectedProduct.price,
    image: selectedProduct.image || selectedProduct.images?.[0],
    
  },quantity)} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>

          {/* Extra Info */}
          <div className="border-t pt-6 text-sm text-gray-500 space-y-2">
            <p>✔ Free shipping</p>
            <p>✔ 30-day return policy</p>
            <p>✔ Secure payment</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
