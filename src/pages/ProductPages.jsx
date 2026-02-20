import { useState, useMemo } from "react";
import { getProductsObj } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { X, SlidersHorizontal, ShoppingBag } from "lucide-react";

function ProductPages() {

    const { products, isLoading } = getProductsObj()
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [maxPrice, setMaxPrice] = useState(1000)

    // Dinamik kategori listesi
    const categories = useMemo(() => {
        const cats = [...new Set(products.map(p => p.category))]
        return ["all", ...cats]
    }, [products])

    // Kategori etiketleri
    const categoryLabels = {
        "all": "All",
        "electronics": "Electronics",
        "jewelery": "Jewelery",
        "men's clothing": "Men",
        "women's clothing": "Women"
    }

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading products...</p>
                </div>
            </div>
        )
    }

    const filteredProducts = products.filter((product) => {
        const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
        const priceMatch = product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });

    const hasActiveFilters = selectedCategory !== "all" || maxPrice < 1000;

    const clearAllFilters = () => {
        setSelectedCategory("all")
        setMaxPrice(1000)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-indigo-600">{filteredProducts.length}</span> of {products.length} products
                </p>
            </div>

            {/* Active Filter Badges */}
            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-sm text-gray-500 mr-1">Active filters:</span>
                    {selectedCategory !== "all" && (
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition"
                        >
                            {categoryLabels[selectedCategory] || selectedCategory}
                            <X size={14} />
                        </button>
                    )}
                    {maxPrice < 1000 && (
                        <button
                            onClick={() => setMaxPrice(1000)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition"
                        >
                            Max ${maxPrice}
                            <X size={14} />
                        </button>
                    )}
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-red-500 hover:text-red-700 font-medium ml-2 transition"
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Main Layout: Sidebar + Grid */}
            <div className="flex gap-8">

                {/* Sidebar */}
                <aside className="w-64 shrink-0 hidden md:block">
                    <div className="sticky top-24 space-y-8">

                        {/* Categories */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <SlidersHorizontal size={16} />
                                Categories
                            </h3>
                            <div className="flex flex-col gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-left
                                            ${selectedCategory === cat
                                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                                : "bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                                            }`}
                                    >
                                        {categoryLabels[cat] || cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                                Price Range
                            </h3>
                            <div className="space-y-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full accent-indigo-600 cursor-pointer"
                                />
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">$0</span>
                                    <span className="text-lg font-bold text-indigo-600">${maxPrice}</span>
                                    <span className="text-gray-400">$1000</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </aside>

                {/* Products Grid */}
                <div className="flex-1">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <ShoppingBag size={64} className="text-gray-300 mb-4" />
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
                            <p className="text-gray-400 mb-6">Try adjusting your filters to find what you're looking for.</p>
                            <button
                                onClick={clearAllFilters}
                                className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ProductPages