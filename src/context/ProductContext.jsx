import { useContext, createContext, useState, useEffect } from "react";
import { getProducts } from "../services/productService";
const ProductContext = createContext()

export const ProductProvider = ({children}) => {

    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data)
            setLoading(false)
        })
    }, [])

    const values = {
        products,
        isLoading
    }

    return(
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    )
}

export const getProductsObj = () => useContext(ProductContext)