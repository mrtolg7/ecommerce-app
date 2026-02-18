import { useState } from "react";
import { getProductsObj } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function ProductPages() {
    
    const {products , isLoading} = getProductsObj()
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [maxPrice, setMaxPrice] = useState(1000)



    if(isLoading) {
        return <h2>Loading...</h2>
    }

    const filteredProducts = products.filter((product) => {
  const categoryMatch =
    selectedCategory === "all" ||
    product.category === selectedCategory;

  const priceMatch = product.price <= maxPrice;

  return categoryMatch && priceMatch;
});

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

        
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">

                <h1 className="text-3xl font-bold text-gray-800">
                Products
                </h1>


                <div className="flex items-center gap-6">

                    <div className="flex flex-col gap-1 items-center">

                    <input
                            type="range"
                            min="0"
                            max="1000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />

                    <p>Max Price: ${maxPrice}</p>
                    </div>
                    
                    <select
                    className="mt-4 sm:mt-0 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                    <option value="all">All</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men</option>
                    <option value="women's clothing">Women</option>
                    </select>

                </div>

            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </div>

    )
}

export default ProductPages