import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { User, Menu, X } from "lucide-react"

export default function Header() {

  const { cart, clearCart } = useCart();

  const { currentUser, logout } = useAuth()

  const { clearWishlist } = useWishlist()

  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    clearCart()
    clearWishlist()
    navigate("/")
    setMenuOpen(false)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const totalItems = Object.values(cart).reduce((acc, item) => acc + Number(item.quantity), 0);

  return (
    <header className="w-full bg-indigo-900 border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center max-md:justify-between max-xl:justify-between justify-between">

        <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
          HookStore.
        </Link>
        <div className="flex flex-row gap-2 text-indigo-900 w-200 max-md:hidden max-xl:w-115 max-2xl:w-160">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" className="px-4 py-2 rounded-lg w-full  bg-gray-200" />
          <button onClick={() => { navigate(`/search?q=${searchTerm}`); setSearchTerm(""); }} className="px-4 py-2 rounded-lg text-white">Search</button>
        </div>

        <nav className="flex flex-row gap-10 text-white font-semibold items-center">
          <NavLink to="/" className="max-xl:hidden">
            Products
          </NavLink>
          <NavLink to="blog" className="max-xl:hidden">
            Blog
          </NavLink>
          <NavLink to="about" className="max-xl:hidden">
            About Us
          </NavLink>


          {!currentUser ? (
            <NavLink to="/auth" className="max-xl:hidden">Login</NavLink>
          ) : (
            <div className="relative max-xl:hidden">

              {/* ICON */}
              <div className="cursor-pointer hover:text-indigo-300 transition" onClick={() => setDropdownOpen(!isDropdownOpen)}>
                <User />
              </div>

              {/* DROPDOWN */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white text-gray-800 rounded-xl shadow-lg py-2 z-[60]">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b truncate">
                    {currentUser.email}
                  </div>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    to="/wishlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Wishlist
                  </NavLink> 
                  <NavLink
                    to="/order-history"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Order History
                  </NavLink>

                  <button
                    onClick={() => { handleLogout(); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}


          <NavLink to="cart">
            <div className="relative cursor-pointer ml-5">


              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-red-500 transition">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>


              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </NavLink>
          <button onClick={() => setMenuOpen(!isMenuOpen)} className="xl:hidden text-white mr-0">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

      </div>

      <div className={`xl:hidden bg-indigo-900 text-white overflow-hidden transition-all duration-350 md:flex md:flex-col md:items-center
  ${isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}`}>
        <NavLink to="/" className="block px-4 py-2 hover:bg-indigo-800" onClick={closeMenu}>
          Products
        </NavLink>
        <NavLink to="/blog" className="block px-4 py-2 hover:bg-indigo-800" onClick={closeMenu}>
          Blog
        </NavLink>
        <NavLink to="/about" className="block px-4 py-2 hover:bg-indigo-800" onClick={closeMenu}>
          About Us
        </NavLink>
        {!currentUser ? (
          <NavLink to="/auth" className="block px-4 py-2 hover:bg-indigo-800" onClick={closeMenu}>
            Login
          </NavLink>
        ) : (
          <>
            <NavLink to="/profile" className="block px-4 py-2 hover:bg-indigo-800" onClick={closeMenu}>
              Profile
            </NavLink>
            <NavLink to="/wishlist" className="block px-4 py-2 hover:bg-indigo-800" onClick={closeMenu}>
              Wishlist
            </NavLink>
            <NavLink to="/order-history" className="block px-4 py-2 hover:bg-indigo-800" onClick={closeMenu}>
              Order History
            </NavLink>
            <button
              onClick={handleLogout}
              className=" block px-4 py-2 hover:bg-indigo-800 text-red-500"
            >
              Logout
            </button>
          </>
        )}
      </div>

    </header>
  );
}