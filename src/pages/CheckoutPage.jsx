import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";


export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
 const {currentUser} = useAuth();
  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-10 bg-white rounded-3xl shadow-2xl p-10 text-center">
        <h2 className="text-2xl font-bold text-indigo-950">
          Sepetiniz boş!
        </h2>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !form.name ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.postal ||
      !form.cardNumber ||
      !form.expiry ||
      !form.cvv
    ) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    setError("");
    setLoading(true);
    await addDoc(collection(db, "orders"),{
        userId: currentUser.uid,
        items: cartItems,
        total: total,
        date: new Date().toISOString(),
        status: "completed",
        shippingAddress: form,
      })
      clearCart();
      navigate("/success");

  };

  return (
    <div className="max-w-6xl mx-auto my-10 bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT - FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Checkout
          </h2>

          {/* Customer Info */}
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="space-y-4">
            <input
              name="address"
              placeholder="Address"
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                placeholder="City"
                className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
              />
              <input
                name="postal"
                placeholder="Postal Code"
                className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold text-gray-700">
              Payment Details
            </h3>
            <input
              name="cardNumber"
              placeholder="Card Number"
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="expiry"
                placeholder="MM/YY"
                className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
              />
              <input
                name="cvv"
                placeholder="CVV"
                className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all"
          >
            {loading ? "Processing..." : "Complete Payment"}
          </button>
        </form>

        {/* RIGHT - SUMMARY */}
        <div className="bg-gray-50 p-6 rounded-2xl h-fit space-y-6">
          <h3 className="text-xl font-bold text-gray-800">
            Order Summary
          </h3>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center"
              >
                <span className="text-gray-700">
                  {item.title} x{item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "Free" : `$${shipping}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
