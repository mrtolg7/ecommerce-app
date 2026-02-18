import { useContext, createContext,useEffect,useState } from "react";

const WishContext = createContext()

export const WishProvider = ({children}) => {
    const [wishlist, setWishlist] = useState({})

    const toggleWishlist = (product) => {
        if(!product || !product.id)  return
        
        
        const id = product.id
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


    }
      return (
    <WishContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishContext.Provider>
  );
}

export const useWishlist = () => {
    return useContext(WishContext)
}