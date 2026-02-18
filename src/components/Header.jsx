import { useCart } from "../CartContext";
import { Link, NavLink} from "react-router-dom";

export default function Header() {

  const { cart } = useCart(); 


  const totalItems = Object.values(cart).reduce((acc, item) => acc + Number(item.quantity), 0);

  return (
    <header className="bg-indigo-900 border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
          HookStore.
        </Link>

        <nav className="flex flex-row gap-10 text-white font-semibold">
        <NavLink to="/">
          Products
        </NavLink>
        <NavLink to="blog">
          Blog
        </NavLink>
        <NavLink to="about">
          About Us
        </NavLink>
        <NavLink to="/auth">Login</NavLink>

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
        </nav>

      </div>
    </header>
  );
}