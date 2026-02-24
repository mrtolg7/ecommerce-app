import { useContext, createContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

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
    toast.success("Ürün sepete eklendi!");
  };

  const removeFromCart = (productId) => {
    const id = Number(productId); // tip güvenliği

    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[id];
      return newCart;
    });
    toast.success("Ürün sepetten kaldırıldı!");
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
        if(existingItem.quantity === 1) {
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

  console.log("🛒 Sepet Güncellendi:", cart);

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
