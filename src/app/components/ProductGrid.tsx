import React, { useState } from "react";
import { ProductCard } from "@/app/components/ProductCard";
import { FilterSidebar } from "@/app/components/FilterSidebar";
import type { Product } from "@/app/App";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onArtisanClick: (artisanId: string) => void;
  onAddToCart: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  showFilters?: boolean;
}

export function ProductGrid({
  products,
  onProductClick,
  onArtisanClick,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  showFilters = false,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get unique categories and materials
  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const materials = [
    "all",
    ...Array.from(new Set(products.flatMap((p) => p.materials))),
  ];

  // Filter products
  let filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory)
      return false;
    if (
      selectedMaterial !== "all" &&
      !product.materials.includes(selectedMaterial)
    )
      return false;
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;
    return true;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return 0; // Would use actual date
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full">
      {/* Desktop Filters */}
      {showFilters && (
        <div className="hidden lg:block flex-shrink-0">
          <FilterSidebar
            categories={categories}
            materials={materials}
            selectedCategory={selectedCategory}
            selectedMaterial={selectedMaterial}
            priceRange={priceRange}
            onCategoryChange={setSelectedCategory}
            onMaterialChange={setSelectedMaterial}
            onPriceRangeChange={setPriceRange}
          />
        </div>
      )}

      <div className="flex-1 w-full min-w-0">
        {showFilters && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 sm:gap-0">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-5xl font-semibold text-[#A8927B]">
                Natural Beauty
              </h2>
              <p className="font-['Lora'] text-sm text-[#A8927B]/70 mt-1">
                {filteredProducts.length} natural{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden bg-[#9CAF88] text-[#FAF7F2] px-4 py-2 rounded-lg font-['Lora'] text-sm hover:bg-[#C77956] transition-colors w-full sm:w-auto"
              >
                Filters
              </button>
              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <label className="font-['Lora'] text-sm text-[#A8927B] whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#9CAF88]/30 rounded-lg px-4 py-2 font-['Lora'] text-sm text-[#A8927B] focus:outline-none focus:border-[#9CAF88] flex-1 sm:flex-initial"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-['Cormorant_Garamond'] text-4xl text-[#A8927B] mb-4">
              No products found
            </p>
            <p className="font-['Lora'] text-[#A8927B]/70">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
                onArtisanClick={onArtisanClick}
                onAddToCart={onAddToCart}
                isInWishlist={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}

        {/* Mobile Filter Modal */}
        {showMobileFilters && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#FAF7F2] shadow-2xl z-50 lg:hidden overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#A8927B]">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#9CAF88]/10 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <FilterSidebar
                  categories={categories}
                  materials={materials}
                  selectedCategory={selectedCategory}
                  selectedMaterial={selectedMaterial}
                  priceRange={priceRange}
                  onCategoryChange={setSelectedCategory}
                  onMaterialChange={setSelectedMaterial}
                  onPriceRangeChange={setPriceRange}
                />
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-[#9CAF88] text-[#FAF7F2] px-6 py-3 rounded-lg font-['Lora'] text-sm font-medium hover:bg-[#C77956] transition-colors mt-6"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
