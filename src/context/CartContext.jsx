import { useContext, createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : {}
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    // 🔒 Güvenlik kontrolü
    if (!product || !product.id) return;

    const id = Number(product.id); // tip normalize
    const qty = Number(quantity)

    setCart((prevCart) => {
      const existingItem = prevCart[id];

      if (existingItem) {
        return {
          ...prevCart,
          [id]: {
            ...existingItem,
            quantity: existingItem.quantity + qty,
          },
        };
      }

      // 🎯 Cart item formatını biz belirliyoruz
      return {
        ...prevCart,
        [id]: {
          id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: qty,
        },
      };
    });
    toast.success("Product added to cart!");
  };

  const removeFromCart = (productId) => {
    const id = Number(productId); // tip güvenliği

    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[id];
      return newCart;
    });
    toast.success("Product removed from cart!");
  };

  const increaseQuantity = (id) => {

    setCart((prevCart) => {
      const existingItem = prevCart[id];

      if (!existingItem) return prevCart

      if (existingItem) {
        return {
          ...prevCart,
          [id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };

      }
    })

  }

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const existingItem = prevCart[id]
      if (!existingItem) return prevCart

      if (existingItem) {
        if (existingItem.quantity === 1) {
          removeFromCart(id)
          return prevCart
        }
        return {
          ...prevCart,
          [id]: {
            ...existingItem,
            quantity: existingItem.quantity - 1
          }
        }
      }
    })
  }

  const clearCart = () => {
    setCart((prevCart) => {
      return {}
    })
  }

  const values = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  };


  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
