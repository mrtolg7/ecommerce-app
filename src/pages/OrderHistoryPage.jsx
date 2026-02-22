import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { db } from "../services/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

export default function OrderHistoryPage() {
    const { currentUser } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid))
            const snapshot = await getDocs(q)
            const orderData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setOrders(orderData)
            setLoading(false)
        }
        fetchOrders()
    }, [currentUser])

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
    )

    if (orders.length === 0) return (
        <div className="flex items-center justify-center bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-4 sm:mx-auto my-10 p-8">
            <h1 className="font-bold text-indigo-950 text-2xl sm:text-4xl text-center">Henüz siparişiniz yok!</h1>
        </div>
    )

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-4 sm:mx-auto my-10">
            <div className="p-4 sm:p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Sipariş Geçmişim</h2>
                    <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold">
                        {orders.length} Sipariş
                    </span>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-gray-100 rounded-2xl p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                            {/* Sipariş Başlığı */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                                <div>
                                    <p className="text-sm text-gray-400">Sipariş #{order.id.slice(0, 8)}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                                        {order.status}
                                    </span>
                                    <span className="text-lg sm:text-xl font-bold text-gray-900">${order.total?.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Siparişteki Ürünler */}
                            <div className="space-y-3">
                                {order.items?.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex-shrink-0 p-1">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800 text-sm line-clamp-1">{item.title}</p>
                                            <p className="text-gray-400 text-xs">x{item.quantity} · ${item.price}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-700">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
