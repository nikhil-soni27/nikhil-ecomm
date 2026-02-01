import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft } from 'lucide-react';
import type { Product } from '@/app/App';
import { ProductCard } from '@/app/components/ProductCard';

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
  onBackClick
}: SearchPageProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [recentSearches] = useState(['Pottery', 'Leather goods', 'Candles']);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
    onSearchChange(query);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(localQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(localQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(localQuery.toLowerCase()) ||
    product.materials.some(m => m.toLowerCase().includes(localQuery.toLowerCase()))
  );

  // Get popular searches/categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-8">
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
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#D4703B]"
            />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for handcrafted treasures..."
              className="w-full pl-16 pr-6 py-5 rounded-2xl border-3 border-[#D4703B] focus:border-[#3A5A40] focus:outline-none font-['Josefin_Sans'] text-lg bg-white shadow-xl"
              style={{
                border: '4px solid #D4703B',
                borderRadius: '30px 10px 30px 10px'
              }}
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
                    className="bg-white text-[#3A5A40] px-4 py-2 rounded-full font-['Josefin_Sans'] text-sm hover:bg-[#F4ACB7]/30 transition-colors duration-300"
                    style={{
                      border: '2px solid #3A5A40/20',
                      borderRadius: '20px 5px 20px 5px'
                    }}
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
                Found {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} for "{localQuery}"
              </p>
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
              <div className="text-center py-20">
                <Search size={64} className="mx-auto text-[#D4703B] mb-4 opacity-50" />
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
                      className="bg-[#D4703B] text-[#FFF8E7] px-4 py-2 rounded-full font-['Josefin_Sans'] text-sm hover:bg-[#3A5A40] transition-colors duration-300"
                      style={{ borderRadius: '20px 5px 20px 5px' }}
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
                const categoryProducts = products.filter(p => p.category === category);
                return (
                  <button
                    key={category}
                    onClick={() => handleSearch(category)}
                    className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{
                      border: '3px solid #3A5A40',
                      borderRadius: '20px 5px 20px 5px'
                    }}
                  >
                    <div className="w-full h-48 bg-[#F4ACB7]/20 rounded-xl mb-4 overflow-hidden"
                         style={{ borderRadius: '15px 5px 15px 5px' }}>
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
