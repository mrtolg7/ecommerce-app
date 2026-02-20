import { useSearchParams } from "react-router-dom";
import { getProductsObj } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const searchTerm = searchParams.get("q")
    const {searchProducts} = getProductsObj()
    const results = searchProducts(searchTerm)

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {results.length > 0 ? <h1 className="text-3xl font-bold text-gray-800 mb-10">Search Results for "{searchTerm}"</h1> : <h1 className="text-3xl font-bold text-gray-800 mb-10">No Results Found for "{searchTerm}"</h1>}
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default SearchPage