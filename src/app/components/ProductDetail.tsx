import React, { useState } from "react";
import {
  Heart,
  ShoppingBag,
  Star,
  MessageCircle,
  MapPin,
  Truck,
  Package,
  ChevronLeft,
  ChevronDown,
  Leaf,
  Award,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import type { Product } from "@/app/App";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, customization?: any) => void;
  onArtisanClick: (artisanId: string) => void;
  onBackClick: () => void;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
}

export function ProductDetail({
  product,
  onAddToCart,
  onArtisanClick,
  onBackClick,
  isInWishlist,
  onToggleWishlist,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [customization, setCustomization] = useState({
    size: "50ml",
  });
  const [showIngredients, setShowIngredients] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, product.customizable ? customization : undefined);
  };

  // Sample reviews with skincare context
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "Jan 28, 2026",
      comment:
        "This product has transformed my skin! The natural ingredients are so gentle and effective. My skin feels nourished and hydrated.",
      verified: true,
      skinType: "Dry Skin",
      image: "https://i.pravatar.cc/150?img=25",
    },
    {
      id: 2,
      author: "Jessica L.",
      rating: 5,
      date: "Jan 22, 2026",
      comment:
        "Love that this is 100% natural! No harsh chemicals, just pure goodness. My sensitive skin loves it.",
      verified: true,
      skinType: "Sensitive Skin",
      image: "https://i.pravatar.cc/150?img=33",
    },
  ];

  // Simulated full ingredients list
  const fullIngredients = [
    "Aloe Barbadensis Leaf Juice*",
    "Cocos Nucifera (Coconut) Oil*",
    "Butyrospermum Parkii (Shea) Butter*",
    "Glycerin (Vegetable)",
    "Simmondsia Chinensis (Jojoba) Seed Oil*",
    "Tocopherol (Vitamin E)",
    "Lavandula Angustifolia (Lavender) Oil*",
    "Rosmarinus Officinalis (Rosemary) Leaf Extract*",
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="flex items-center space-x-2 mb-8 text-[#A8927B] hover:text-[#9CAF88] transition-colors duration-350"
        >
          <ChevronLeft size={20} />
          <span className="font-['Lora'] text-sm">Back to Shop</span>
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div
              className="bg-white rounded-xl overflow-hidden mb-4"
              style={{
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 sm:gap-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 min-w-0 rounded-lg overflow-hidden transition-all duration-350 ${
                    selectedImage === index
                      ? "ring-2 ring-[#9CAF88]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    boxShadow:
                      selectedImage === index
                        ? "0 4px 12px rgba(156, 175, 136, 0.3)"
                        : "none",
                  }}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-16 sm:h-20 md:h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Natural Badge */}
            <div className="flex items-center space-x-2">
              <span className="bg-[#9CAF88] text-[#FAF7F2] px-3 py-1 rounded-full font-['Lora'] text-xs font-medium">
                100% Natural
              </span>
              <span className="bg-[#9CAF88] text-[#FAF7F2] px-3 py-1 rounded-full font-['Lora'] text-xs font-medium">
                Organic
              </span>
              <span className="bg-[#9CAF88] text-[#FAF7F2] px-3 py-1 rounded-full font-['Lora'] text-xs font-medium">
                Vegan
              </span>
            </div>

            {/* Title and Wishlist */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-semibold text-[#A8927B] leading-tight mb-2">
                  {product.name}
                </h1>
                <button
                  onClick={() => onArtisanClick(product.artisan.id)}
                  className="flex items-center space-x-2 group"
                >
                  <ImageWithFallback
                    src={product.artisan.avatar}
                    alt={product.artisan.name}
                    className="w-7 h-7 rounded-full"
                  />
                  <span className="font-['Lora'] text-sm text-[#9CAF88] group-hover:text-[#C77956] transition-colors">
                    By {product.artisan.name}
                  </span>
                </button>
              </div>

              <button
                onClick={onToggleWishlist}
                className="w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#FAF7F2] transition-colors duration-350"
              >
                <Heart
                  size={22}
                  className={
                    isInWishlist
                      ? "fill-[#C77956] text-[#C77956]"
                      : "text-[#A8927B]"
                  }
                />
              </button>
            </div>

            {/* Price and Stock */}
            <div className="flex items-center justify-between">
              <p className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-semibold text-[#C77956]">
                ${product.price.toFixed(2)}
              </p>
              {product.inStock <= 3 && (
                <div className="bg-[#C77956] px-4 py-2 rounded-lg shadow-sm">
                  <p className="font-['Lora'] text-sm font-medium text-[#FAF7F2]">
                    Only {product.inStock} left
                  </p>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "text-[#9CAF88] fill-current"
                        : "text-[#A8927B]/20"
                    }`}
                  />
                ))}
              </div>
              <span className="font-['Lora'] text-sm text-[#A8927B]">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <div className="bg-white/50 p-6 rounded-lg border border-[#A8927B]/10">
              <p className="font-['Lora'] text-base text-[#A8927B] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Benefits */}
            <div>
              <h3 className="font-['Lora'] text-lg font-semibold text-[#A8927B] mb-3">
                Key Benefits
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Hydrates", "Soothes", "Nourishes", "Protects"].map(
                  (benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[#9CAF88]/10 rounded-full flex items-center justify-center">
                        <Leaf
                          className="w-4 h-4 text-[#9CAF88]"
                          strokeWidth={2}
                        />
                      </div>
                      <span className="font-['Lora'] text-xs sm:text-sm text-[#A8927B]">
                        {benefit}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Size Selector */}
            {product.customizable && (
              <div>
                <h3 className="font-['Lora'] text-base font-semibold text-[#A8927B] mb-3">
                  Size
                </h3>
                <div className="flex gap-3">
                  {["30ml", "50ml", "100ml"].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setCustomization({ ...customization, size })
                      }
                      className={`px-6 py-3 rounded-lg font-['Lora'] text-sm font-medium transition-all duration-350 ${
                        customization.size === size
                          ? "bg-[#9CAF88] text-[#FAF7F2] shadow-md"
                          : "bg-white text-[#A8927B] hover:bg-[#9CAF88]/10 border border-[#A8927B]/20"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients Accordion */}
            <div className="border border-[#A8927B]/20 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowIngredients(!showIngredients)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-[#FAF7F2] transition-colors"
              >
                <span className="font-['Lora'] text-base font-semibold text-[#A8927B]">
                  Full Ingredient List
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#A8927B] transition-transform ${
                    showIngredients ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showIngredients && (
                <div className="p-4 bg-white border-t border-[#A8927B]/20">
                  <p className="font-['Lora'] text-sm text-[#A8927B] mb-3">
                    {fullIngredients.join(", ")}
                  </p>
                  <p className="font-['Lora'] text-xs text-[#A8927B]/60">
                    *Certified Organic Ingredient
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#A8927B]/10">
                    <p className="font-['Lora'] text-xs font-semibold text-[#9CAF88] mb-1">
                      Free from:
                    </p>
                    <p className="font-['Lora'] text-xs text-[#A8927B]/70">
                      Parabens • Sulfates • Synthetic Fragrances • Phthalates •
                      Mineral Oils
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* How to Use Accordion */}
            <div className="border border-[#A8927B]/20 rounded-lg overflow-hidden">
              <button
                onClick={() => setShowHowToUse(!showHowToUse)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-[#FAF7F2] transition-colors"
              >
                <span className="font-['Lora'] text-base font-semibold text-[#A8927B]">
                  How to Use
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#A8927B] transition-transform ${
                    showHowToUse ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showHowToUse && (
                <div className="p-4 bg-white border-t border-[#A8927B]/20">
                  <ol className="space-y-2">
                    <li className="font-['Lora'] text-sm text-[#A8927B] flex">
                      <span className="font-semibold mr-2">1.</span>
                      <span>Cleanse your face with warm water</span>
                    </li>
                    <li className="font-['Lora'] text-sm text-[#A8927B] flex">
                      <span className="font-semibold mr-2">2.</span>
                      <span>Apply a small amount to fingertips</span>
                    </li>
                    <li className="font-['Lora'] text-sm text-[#A8927B] flex">
                      <span className="font-semibold mr-2">3.</span>
                      <span>Gently massage into skin in circular motions</span>
                    </li>
                    <li className="font-['Lora'] text-sm text-[#A8927B] flex">
                      <span className="font-semibold mr-2">4.</span>
                      <span>Use morning and evening for best results</span>
                    </li>
                  </ol>
                </div>
              )}
            </div>

            {/* Sustainability Section */}
            <div className="bg-[#9CAF88]/10 p-5 rounded-lg border border-[#9CAF88]/20">
              <div className="flex items-center space-x-2 mb-3">
                <Leaf className="w-5 h-5 text-[#9CAF88]" strokeWidth={2} />
                <h3 className="font-['Lora'] text-base font-semibold text-[#9CAF88]">
                  Our Commitment
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="font-['Lora'] text-sm text-[#A8927B] flex items-center">
                  <span className="text-[#9CAF88] mr-2">•</span>
                  Recyclable glass packaging
                </li>
                <li className="font-['Lora'] text-sm text-[#A8927B] flex items-center">
                  <span className="text-[#9CAF88] mr-2">•</span>
                  Carbon-neutral shipping
                </li>
                <li className="font-['Lora'] text-sm text-[#A8927B] flex items-center">
                  <span className="text-[#9CAF88] mr-2">•</span>
                  Ethically sourced ingredients
                </li>
                <li className="font-['Lora'] text-sm text-[#A8927B] flex items-center">
                  <span className="text-[#9CAF88] mr-2">•</span>
                  Never tested on animals
                </li>
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center space-x-6 pt-2">
              <div className="flex items-center space-x-2">
                <Truck className="text-[#9CAF88] w-5 h-5" />
                <span className="font-['Lora'] text-sm text-[#A8927B]">
                  Free shipping over $50
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="text-[#9CAF88] w-5 h-5" />
                <span className="font-['Lora'] text-sm text-[#A8927B]">
                  Ships in 2-3 days
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#9CAF88] text-[#FAF7F2] px-8 py-4 rounded-lg font-['Lora'] text-base font-medium hover:bg-[#C77956] transition-all duration-350 flex items-center justify-center space-x-3"
              style={{
                boxShadow: "0 4px 16px rgba(156, 175, 136, 0.3)",
              }}
            >
              <ShoppingBag size={20} />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#A8927B]">
              Customer Reviews
            </h2>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-[#9CAF88] fill-current" />
              <span className="font-['Lora'] text-lg text-[#A8927B]">
                {product.rating} out of 5
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg border border-[#A8927B]/10"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-start space-x-4">
                  <ImageWithFallback
                    src={review.image}
                    alt={review.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-['Lora'] font-semibold text-[#A8927B]">
                          {review.author}
                        </h4>
                        <span className="bg-[#9CAF88]/10 text-[#9CAF88] px-2 py-0.5 rounded text-xs font-['Lora']">
                          {review.skinType}
                        </span>
                      </div>
                      {review.verified && (
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-[#9CAF88]" />
                          <span className="text-xs font-['Lora'] text-[#9CAF88]">
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < review.rating
                                ? "text-[#9CAF88] fill-current"
                                : "text-[#A8927B]/20"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-['Lora'] text-xs text-[#A8927B]/60">
                        {review.date}
                      </span>
                    </div>
                    <p className="font-['Lora'] text-sm text-[#A8927B]/80 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
