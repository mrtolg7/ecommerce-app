import { useContext, createContext,useEffect,useState } from "react";
import toast from "react-hot-toast";
const WishContext = createContext()

export const WishProvider = ({children}) => {
    const [wishlist, setWishlist] = useState({})

    const toggleWishlist = (product) => {
        if(!product || !product.id)  return
        
        
        const id = product.id
        const isRemoving = !!wishlist[id]
        setWishlist((prevList) => {
            const existingWish = prevList[id]
        
            if(existingWish) {
                const updated = {...prevList}
                delete updated[id]
                return updated
                
            }

            return {
                ...prevList,
                [id]: {
                    id,
                    title: product.title,
                    price: product.price,
                    image: product.image
                }
            }
        })
        if(isRemoving) {
            toast.success("İstek listenizden kaldırıldı!")
        } else {
            toast.success("İstek listenize eklendi!")
        }
    }

    const clearWishlist = () => {
        setWishlist((prevList) => {
            return {}
        })
    }

      return (
    <WishContext.Provider value={{ wishlist, toggleWishlist, clearWishlist }}>
      {children}
    </WishContext.Provider>
  );
}

export const useWishlist = () => {
    return useContext(WishContext)
}