import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {
  const { cart, removeFromCart,increaseQuantity,decreaseQuantity } = useCart(); // removeFromCart'ı da çekiyoruz
  const items = Object.values(cart);
  console.log(cart)
  const {currentUser} = useAuth()
  const navigate = useNavigate()
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  console.log(items)

  const handleCheckout = () => {
  if (!currentUser) {
    navigate("/auth", {
      state: { from: "/checkout" }
    });
  } else {
    navigate("/checkout");
  }
};

  
  if (items.length === 0) return (<div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto my-10"><h1 className="text-center font-bold text-indigo-950 text-4xl">Sepetinize ürün ekleyiniz</h1></div>); // Sepet boşsa hiç gözükmesin

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto my-10">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Alışveriş Sepetim</h2>
          <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold">
            {items.length} Farklı Ürün
          </span>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
              {/* Ürün Resmi */}
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 p-2">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              {/* Ürün Detayları */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">Birim Fiyat: ${item.price}</p>
                
                {/* Adet Kontrolü - Şimdilik sadece gösteriyoruz */}
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-sm font-medium text-gray-600">Adet:</span>
                  <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1 font-bold text-indigo-600">
                    {item.quantity}
                  </div>
                </div>
              </div>

              {/* Fiyat ve Silme */}
              <div className="text-right flex flex-col items-center gap-3">
                <span className="text-xl font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <div className="flex items-center border rounded-lg overflow-hidden">
              <button onClick={() => decreaseQuantity(item.id)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200">
                -
              </button>
              <span className="px-6 py-2">{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200">
                +
              </button>
            </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  title="Ürünü Kaldır"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Alt Toplam ve Ödeme Alanı */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-gray-500 text-sm">Toplam Tutar</p>
              <p className="text-4xl font-extrabold text-gray-900">${totalPrice.toFixed(2)}</p>
            </div>
            <button type="button" onClick={handleCheckout} className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-indigo-200 active:scale-95">
              Ödemeye Geç
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}