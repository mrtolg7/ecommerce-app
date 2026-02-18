import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
export default function WishlistPage() { 
    const {wishlist}= useWishlist()
    const {addToCart} = useCart()
    const wishlistItems = Object.values(wishlist)
  
    if (wishlistItems.length === 0) return (<div className="w-3x1 h-20 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto my-10 flex items-center justify-center"><h1 className="text-center font-bold text-indigo-950 text-4xl">İstek listeniz boş!</h1></div>); // Sepet boşsa hiç gözükmesin

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto my-10">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">İstek Listem</h2>
          <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold">
            {wishlistItems.length} Farklı Ürün
          </span>
        </div>

        <div className="space-y-6">
          {wishlistItems.map((wishItems) => (
            <div key={wishItems.id} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
              {/* Ürün Resmi */}
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 p-2">
                <img src={wishItems.image} alt={wishItems.title} className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              {/* Ürün Detayları */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">{wishItems.title}</h3>
                <p className="text-gray-500 text-sm mt-1">Birim Fiyat: ${wishItems.price}</p>
              </div>
              <div>
              <button 
            onClick={() => addToCart({ ...wishItems, quantity: 1 })}
            className="mt-auto w-40 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 active:scale-95 shadow-md hover:shadow-indigo-200 pt-4 cursor-pointer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Sepete Ekle
              </button>
              </div>
            </div>
            ))}
        </div>
    </div>
    
    </div>
        )
 }
