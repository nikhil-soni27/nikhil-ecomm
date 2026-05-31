import React, { useState, useEffect } from "react";
import { Search, ChevronLeft } from "lucide-react";
import type { Product } from "@/app/App";
import { ProductCard } from "@/app/components/ProductCard";
import { api } from "@/app/utils/api";

interface SearchPageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  products: Product[];
  onProductClick: (product: Product) => void;
  onBackClick: () => void;
}

export function SearchPage({
  searchQuery,
  onSearchChange,
  products,
  onProductClick,
  onBackClick,
}: SearchPageProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<Product[]>(products);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [recentSearches] = useState(["Pottery", "Leather goods", "Candles"]);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setSearchResults(products);
  }, [products]);

  useEffect(() => {
    if (!localQuery.trim()) {
      setSearchResults(products);
      setSearchError(null);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);

      try {
        const results = await api.searchProducts(localQuery.trim(), {
          signal: controller.signal,
        });
        setSearchResults(results);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("Search API error:", err);
        setSearchError("Unable to load search results. Showing local matches.");
        setSearchResults(
          products.filter(
            (product) =>
              product.name.toLowerCase().includes(localQuery.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(localQuery.toLowerCase()) ||
              product.category
                .toLowerCase()
                .includes(localQuery.toLowerCase()) ||
              product.materials.some((m) =>
                m.toLowerCase().includes(localQuery.toLowerCase()),
              ),
          ),
        );
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [localQuery, products]);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
    onSearchChange(query);
  };

  // Use debounced search results from the API, fall back locally when needed
  const filteredProducts = searchResults;

  // Get popular searches/categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-[#FAF3E8] py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="flex items-center space-x-2 mb-8 text-[#3A5A40] hover:text-[#D4703B] transition-colors duration-300"
        >
          <ChevronLeft size={20} />
          <span className="font-['Josefin_Sans'] text-sm">Back to Home</span>
        </button>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search
              size={24}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#C77956]"
            />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for handcrafted treasures..."
              className="w-full pl-16 pr-6 py-5 rounded-[30px] border border-[#A8927B]/20 focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20 focus:outline-none font-['Josefin_Sans'] text-lg bg-white shadow-[0_24px_60px_rgba(71,56,38,0.08)]"
              autoFocus
            />
          </div>

          {/* Recent Searches */}
          {!localQuery && (
            <div className="mt-6">
              <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70 mb-3">
                Recent searches
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="bg-white text-[#3A5A40] px-4 py-2 rounded-full font-['Josefin_Sans'] text-sm hover:bg-[#FAF7F2] transition-colors duration-300 ring-1 ring-[#A8927B]/15"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {localQuery ? (
          <div>
            <div className="mb-8">
              <h2 className="font-['Amatic_SC'] text-5xl font-bold text-[#3A5A40] mb-2">
                Search Results
              </h2>
              <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                {isSearching
                  ? "Searching for craftsmanship..."
                  : `Found ${filteredProducts.length} ${filteredProducts.length === 1 ? "item" : "items"} for "${localQuery}"`}
              </p>
              {searchError && (
                <p className="mt-3 text-sm text-[#D4703B]/90">{searchError}</p>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onProductClick}
                    onArtisanClick={() => {}}
                    onAddToCart={() => {}}
                    isInWishlist={false}
                    onToggleWishlist={() => {}}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/95 rounded-[28px] border border-[#A8927B]/10 shadow-[0_20px_60px_rgba(71,56,38,0.08)]">
                <Search
                  size={64}
                  className="mx-auto text-[#C77956] mb-4 opacity-80"
                />
                <h3 className="font-['Amatic_SC'] text-4xl font-bold text-[#3A5A40] mb-2">
                  No results found
                </h3>
                <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70 mb-6">
                  Try searching with different keywords
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="font-['Josefin_Sans'] text-sm text-[#3A5A40]">
                    Suggestions:
                  </span>
                  {categories.slice(0, 4).map((category) => (
                    <button
                      key={category}
                      onClick={() => handleSearch(category)}
                      className="bg-[#C77956] text-[#FFF8E7] px-4 py-2 rounded-full font-['Josefin_Sans'] text-sm hover:bg-[#A05B45] transition-colors duration-300 ring-1 ring-[#A8927B]/15"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Popular Categories */
          <div>
            <h2 className="font-['Amatic_SC'] text-5xl font-bold text-[#3A5A40] mb-8 text-center">
              Browse by Category
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const categoryProducts = products.filter(
                  (p) => p.category === category,
                );
                return (
                  <button
                    key={category}
                    onClick={() => handleSearch(category)}
                    className="group bg-white/95 p-6 rounded-[28px] border border-[#A8927B]/10 shadow-[0_24px_80px_rgba(71,56,38,0.08)] hover:shadow-[0_28px_90px_rgba(71,56,38,0.12)] transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="w-full h-48 bg-[#F4ACB7]/20 rounded-[24px] mb-4 overflow-hidden">
                      <img
                        src={categoryProducts[0]?.image}
                        alt={category}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-['Amatic_SC'] text-3xl font-bold text-[#3A5A40] mb-1">
                      {category}
                    </h3>
                    <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                      {categoryProducts.length} items
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
