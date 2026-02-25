import { useContext, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const WishContext = createContext()
import { useAuth } from "./AuthContext"

export const WishProvider = ({ children }) => {
    const { currentUser } = useAuth()
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist")
        return saved ? JSON.parse(saved) : {}
    })


    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }, [wishlist])

    const toggleWishlist = (product) => {
        if (!product || !product.id) return

        if (!currentUser) {
            toast.error("Please login first!")
            return
        }
        const id = product.id
        const isRemoving = !!wishlist[id]
        setWishlist((prevList) => {
            const existingWish = prevList[id]

            if (existingWish) {
                const updated = { ...prevList }
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
        if (isRemoving) {
            toast.success("Removed from wishlist!")
        } else {
            toast.success("Added to wishlist!")
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