import React, { useState } from "react";
import { Heart, ShoppingBag, Award, Leaf } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import type { Product } from "@/app/App";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onArtisanClick: (artisanId: string) => void;
  onAddToCart: (product: Product) => void;
  isInWishlist: boolean;
  onToggleWishlist: (productId: string) => void;
}

export function ProductCard({
  product,
  onProductClick,
  onArtisanClick,
  onAddToCart,
  isInWishlist,
  onToggleWishlist,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Simulate organic/vegan/cruelty-free badges based on product (all products are natural)
  const badges = ["Organic", "Vegan", "Cruelty-Free"].slice(0, 2);

  return (
    <div
      className="bg-[#FAF7F2] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-350 cursor-pointer relative group"
      style={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badges - Top Left */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
        {badges.map((badge, index) => (
          <span
            key={index}
            className="bg-[#9CAF88] text-[#FAF7F2] px-2.5 py-1 rounded-full font-['Lora'] text-[10px] font-medium shadow-sm"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product.id);
        }}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-[#FAF7F2] transition-colors duration-350"
      >
        <Heart
          size={18}
          className={
            isInWishlist ? "fill-[#C77956] text-[#C77956]" : "text-[#A8927B]"
          }
        />
      </button>

      {/* Product Image */}
      <div
        onClick={() => onProductClick(product)}
        className="relative overflow-hidden bg-[#FAF7F2]"
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Low stock badge */}
        {product.inStock <= 3 && (
          <div className="absolute bottom-3 left-3 bg-[#C77956] text-[#FAF7F2] px-3 py-1.5 rounded-lg shadow-md">
            <p className="font-['Lora'] text-xs font-medium">
              Only {product.inStock} left
            </p>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div onClick={() => onProductClick(product)} className="p-5 space-y-3">
        {/* Category */}
        <p className="font-['Lora'] text-xs text-[#A8927B]/70 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-['Lora'] text-base font-semibold text-[#A8927B] leading-tight">
          {product.name}
        </h3>

        {/* Ingredients/Materials highlight */}
        <p className="font-['Lora'] text-xs text-[#A8927B]/60">
          With {product.materials.slice(0, 2).join(" & ")}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-[#9CAF88] fill-current"
                    : "text-[#A8927B]/20"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" />
              </svg>
            ))}
          </div>
          <span className="font-['Lora'] text-sm text-[#A8927B]/60">
            ({product.reviews})
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#C77956]">
              ${product.price.toFixed(2)}
            </p>
            {product.customizable && (
              <p className="font-['Lora'] text-xs text-[#9CAF88] italic">
                Multiple sizes
              </p>
            )}
          </div>

          {/* Add to Cart - appears on hover for desktop, always visible on mobile */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className={`px-4 py-2.5 rounded-lg font-['Lora'] text-sm font-medium transition-all duration-350 flex items-center space-x-2 bg-[#9CAF88] text-[#FAF7F2] shadow-md md:opacity-0 md:hover:opacity-100`}
          >
            <ShoppingBag size={16} />
            <span>Add to Bag</span>
          </button>
        </div>

        {/* Artisan info */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onArtisanClick(product.artisan.id);
          }}
          className="font-['Lora'] text-xs text-[#A8927B]/60 hover:text-[#9CAF88] transition-colors duration-350 text-left pt-2 border-t border-[#A8927B]/10 w-full flex items-center space-x-2"
        >
          <ImageWithFallback
            src={product.artisan.avatar}
            alt={product.artisan.name}
            className="w-5 h-5 rounded-full"
          />
          <span>By {product.artisan.name}</span>
        </button>
      </div>
    </div>
  );
}
