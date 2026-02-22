import { NavLink } from "react-router-dom";

export default function SuccessPage() {
    return (
        <div className="h-92 flex justify-evenly items-center bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto my-10">
      <div className="p-8">
        <div className="flex flex-col gap-5 items-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-950 text-center mb-4">Siparişiniz Başarıyla Oluşturuldu!</h2>
          <div className="flex justify-center items-center gap-4">

          <NavLink to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all p-4">
            Alışverişe Devam Et
          </NavLink>
          <NavLink to="/order-history" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all p-4">
            Siparişlerime Git
          </NavLink>
          </div>
        </div>
        </div>

        
    
    </div>
    )
}