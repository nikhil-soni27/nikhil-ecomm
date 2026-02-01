import React, { useState, useEffect } from "react";
import { Navigation } from "@/app/components/Navigation";
import { Hero } from "@/app/components/Hero";
import { ProductGrid } from "@/app/components/ProductGrid";
import { ProductDetail } from "@/app/components/ProductDetail";
import { ShoppingCart } from "@/app/components/ShoppingCart";
import { Checkout } from "@/app/components/Checkout";
import { AuthModal } from "@/app/components/AuthModal";
import { UserDashboard } from "@/app/components/UserDashboard";
import { ArtisanProfile } from "@/app/components/ArtisanProfile";
import { SearchPage } from "@/app/components/SearchPage";
import { Footer } from "@/app/components/Footer";
import { About } from "@/app/components/About";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Toaster } from "@/app/components/ui/sonner";
import { toast } from "sonner";
import { Heart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  artisan: {
    name: string;
    avatar: string;
    id: string;
  };
  description: string;
  materials: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: number;
  customizable: boolean;
  images: string[];
  location: string;
}

export interface CartItem extends Product {
  quantity: number;
  customization?: {
    text?: string;
    color?: string;
    size?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  isArtisan: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "shop"
    | "shop-all"
    | "about"
    | "product"
    | "checkout"
    | "dashboard"
    | "artisan"
    | "search"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      name: "Handcrafted Ceramic Bowl",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1582140099533-11fe4d348e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBhcnRpc2FufGVufDF8fHx8MTc2OTk0MDA2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      artisan: {
        name: "Sarah Mitchell",
        avatar: "https://i.pravatar.cc/150?img=1",
        id: "artisan-1",
      },
      description:
        "A beautiful handcrafted ceramic bowl, perfect for serving salads or as a decorative piece. Each piece is unique and made with love.",
      materials: ["Ceramic", "Glazed", "Hand-thrown"],
      category: "Pottery",
      rating: 4.8,
      reviews: 24,
      inStock: 3,
      customizable: false,
      images: [
        "https://images.unsplash.com/photo-1582140099533-11fe4d348e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBhcnRpc2FufGVufDF8fHx8MTc2OTk0MDA2MHww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1633738674687-9505aa528801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwaGFuZG1hZGUlMjBtdWd8ZW58MXx8fHwxNzY5OTQwMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "Portland, OR",
    },
    {
      id: "2",
      name: "Leather Journal",
      price: 68.0,
      image:
        "https://images.unsplash.com/photo-1689844495806-321b5adaf5d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMGxlYXRoZXIlMjBnb29kc3xlbnwxfHx8fDE3Njk5MzMwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      artisan: {
        name: "James Cooper",
        avatar: "https://i.pravatar.cc/150?img=12",
        id: "artisan-2",
      },
      description:
        "Handcrafted leather journal with recycled paper. Perfect for journaling, sketching, or note-taking. Can be personalized with initials.",
      materials: ["Full-grain leather", "Recycled paper", "Hand-stitched"],
      category: "Leather Goods",
      rating: 4.9,
      reviews: 42,
      inStock: 8,
      customizable: true,
      images: [
        "https://images.unsplash.com/photo-1689844495806-321b5adaf5d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMGxlYXRoZXIlMjBnb29kc3xlbnwxfHx8fDE3Njk5MzMwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "Austin, TX",
    },
    {
      id: "3",
      name: "Woven Wall Hanging",
      price: 125.0,
      image:
        "https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd2VhdmluZyUyMHRleHRpbGVzfGVufDF8fHx8MTc2OTk0MDA2MXww&ixlib=rb-4.1.0&q=80&w=1080",
      artisan: {
        name: "Emma Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=5",
        id: "artisan-3",
      },
      description:
        "Beautiful macramé wall hanging, hand-woven with natural cotton rope. Adds warmth and texture to any space.",
      materials: ["100% Cotton", "Natural dye", "Hand-woven"],
      category: "Textiles",
      rating: 5.0,
      reviews: 18,
      inStock: 2,
      customizable: true,
      images: [
        "https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd2VhdmluZyUyMHRleHRpbGVzfGVufDF8fHx8MTc2OTk0MDA2MXww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "Santa Fe, NM",
    },
    {
      id: "4",
      name: "Artisan Necklace",
      price: 89.0,
      image:
        "https://images.unsplash.com/photo-1633459653247-c09d20fb22e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBjcmFmdHN8ZW58MXx8fHwxNzY5OTQwMDYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      artisan: {
        name: "Olivia Chen",
        avatar: "https://i.pravatar.cc/150?img=9",
        id: "artisan-4",
      },
      description:
        "Elegant handmade necklace featuring semi-precious stones and sterling silver. Each piece is one-of-a-kind.",
      materials: ["Sterling silver", "Semi-precious stones", "Handcrafted"],
      category: "Jewelry",
      rating: 4.7,
      reviews: 31,
      inStock: 5,
      customizable: false,
      images: [
        "https://images.unsplash.com/photo-1633459653247-c09d20fb22e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBjcmFmdHN8ZW58MXx8fHwxNzY5OTQwMDYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "San Francisco, CA",
    },
    {
      id: "5",
      name: "Wooden Serving Board",
      price: 52.0,
      image:
        "https://images.unsplash.com/photo-1648650983937-cbac420329b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMHdvb2RlbiUyMGJvd2x8ZW58MXx8fHwxNzY5OTI2MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      artisan: {
        name: "Michael Wood",
        avatar: "https://i.pravatar.cc/150?img=13",
        id: "artisan-5",
      },
      description:
        "Hand-carved wooden serving board made from sustainable walnut. Perfect for charcuterie and entertaining.",
      materials: ["Walnut wood", "Food-safe finish", "Hand-carved"],
      category: "Woodwork",
      rating: 4.9,
      reviews: 27,
      inStock: 6,
      customizable: true,
      images: [
        "https://images.unsplash.com/photo-1648650983937-cbac420329b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMHdvb2RlbiUyMGJvd2x8ZW58MXx8fHwxNzY5OTI2MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "Asheville, NC",
    },
    {
      id: "6",
      name: "Woven Basket Set",
      price: 78.0,
      image:
        "https://images.unsplash.com/photo-1768734836548-5be5fd6ef617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGJhc2tldCUyMGhhbmRtYWRlfGVufDF8fHx8MTc2OTk0MDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      artisan: {
        name: "Aisha Osman",
        avatar: "https://i.pravatar.cc/150?img=16",
        id: "artisan-6",
      },
      description:
        "Set of 3 handwoven baskets made from natural materials. Perfect for storage and organization with a beautiful rustic look.",
      materials: ["Natural grass", "Hand-woven", "Eco-friendly"],
      category: "Baskets",
      rating: 4.8,
      reviews: 19,
      inStock: 4,
      customizable: false,
      images: [
        "https://images.unsplash.com/photo-1768734836548-5be5fd6ef617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGJhc2tldCUyMGhhbmRtYWRlfGVufDF8fHx8MTc2OTk0MDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "Seattle, WA",
    },
    {
      id: "7",
      name: "Soy Candle Collection",
      price: 42.0,
      image:
        "https://images.unsplash.com/photo-1764587492706-cea197b4376d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZXMlMjBuYXR1cmFsfGVufDF8fHx8MTc2OTk0MDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      artisan: {
        name: "Lily Nguyen",
        avatar: "https://i.pravatar.cc/150?img=20",
        id: "artisan-7",
      },
      description:
        "Hand-poured soy candles with natural essential oils. Set of 3 calming scents in reusable ceramic vessels.",
      materials: ["Soy wax", "Essential oils", "Cotton wick"],
      category: "Candles",
      rating: 5.0,
      reviews: 45,
      inStock: 12,
      customizable: true,
      images: [
        "https://images.unsplash.com/photo-1764587492706-cea197b4376d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZXMlMjBuYXR1cmFsfGVufDF8fHx8MTc2OTk0MDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "Boulder, CO",
    },
    {
      id: "8",
      name: "Ceramic Coffee Mug",
      price: 28.0,
      image:
        "https://images.unsplash.com/photo-1633738674687-9505aa528801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwaGFuZG1hZGUlMjBtdWd8ZW58MXx8fHwxNzY5OTQwMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      artisan: {
        name: "Sarah Mitchell",
        avatar: "https://i.pravatar.cc/150?img=1",
        id: "artisan-1",
      },
      description:
        "Handcrafted ceramic mug with unique glaze patterns. Perfect for your morning coffee or tea ritual.",
      materials: ["Stoneware", "Lead-free glaze", "Microwave safe"],
      category: "Pottery",
      rating: 4.7,
      reviews: 36,
      inStock: 7,
      customizable: true,
      images: [
        "https://images.unsplash.com/photo-1633738674687-9505aa528801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwaGFuZG1hZGUlMjBtdWd8ZW58MXx8fHwxNzY5OTQwMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "Portland, OR",
    },
  ];

  const addToCart = (
    product: Product,
    customization?: CartItem["customization"],
  ) => {
    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        JSON.stringify(item.customization) === JSON.stringify(customization),
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id &&
          JSON.stringify(item.customization) === JSON.stringify(customization)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1, customization }]);
    }

    toast.success("Added to basket!", {
      description: `${product.name} has been added to your basket.`,
    });
  };

  const removeFromCart = (
    productId: string,
    customization?: CartItem["customization"],
  ) => {
    setCart(
      cart.filter(
        (item) =>
          !(
            item.id === productId &&
            JSON.stringify(item.customization) === JSON.stringify(customization)
          ),
      ),
    );
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
    customization?: CartItem["customization"],
  ) => {
    if (quantity === 0) {
      removeFromCart(productId, customization);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId &&
          JSON.stringify(item.customization) === JSON.stringify(customization)
            ? { ...item, quantity }
            : item,
        ),
      );
    }
  };

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      toast.info("Removed from wishlist");
    } else {
      setWishlist([...wishlist, productId]);
      toast.success("Added to wishlist!");
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product");
  };

  const handleArtisanClick = (artisanId: string) => {
    setSelectedArtisan(artisanId);
    setCurrentPage("artisan");
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navigation
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onShopClick={() => setCurrentPage("shop")}
        onShopAllClick={() => setCurrentPage("shop-all")}
        onAboutClick={() => setCurrentPage("about")}
        onHomeClick={() => setCurrentPage("home")}
        onAccountClick={() =>
          user ? setCurrentPage("dashboard") : setIsAuthModalOpen(true)
        }
        onSearchClick={() => setCurrentPage("search")}
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {currentPage === "home" && (
        <>
          <Hero onShopClick={() => setCurrentPage("shop")} />
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="font-['Amatic_SC'] text-6xl font-bold text-[#3A5A40] mb-4">
                Featured Handcrafted Treasures
              </h2>
              <p className="font-['Josefin_Sans'] text-lg text-[#3A5A40]/80">
                Each piece is lovingly made by talented artisans from around the
                world
              </p>
            </div>

            {/* Full-width featured products - first 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {products.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="relative bg-[#FAF7F2] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-350 cursor-pointer group"
                  style={{
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  }}
                  onClick={() => handleProductClick(product)}
                >
                  {/* Product Image - Full width */}
                  <div className="relative overflow-hidden bg-[#FAF7F2]">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Product Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
                      {["Organic", "Handmade"].map((badge, index) => (
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
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-[#FAF7F2] transition-colors duration-350"
                    >
                      <Heart
                        size={18}
                        className={
                          wishlist.includes(product.id)
                            ? "fill-[#C77956] text-[#C77956]"
                            : "text-[#A8927B]"
                        }
                      />
                    </button>

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
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArtisanClick(product.artisan.id);
                        }}
                        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={product.artisan.avatar}
                          alt={product.artisan.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="font-['Lora'] text-xs text-[#A8927B]">
                          {product.artisan.name}
                        </span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-['Lora'] text-xs text-[#A8927B]">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>

                    <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#3A5A40] mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="font-['Lora'] text-sm text-[#3A5A40]/70 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#C77956]">
                        ${product.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-[#9CAF88] text-[#FAF7F2] px-4 py-2 rounded-lg font-['Lora'] text-sm font-medium hover:bg-[#C77956] transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Remaining products in grid */}
            <ProductGrid
              products={products.slice(3, 6)}
              onProductClick={handleProductClick}
              onArtisanClick={handleArtisanClick}
              onAddToCart={addToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
            <div className="text-center mt-12">
              <button
                onClick={() => setCurrentPage("shop")}
                className="bg-[#D4703B] text-[#FFF8E7] px-8 py-4 rounded-lg font-['Josefin_Sans'] text-lg font-medium hover:bg-[#F4ACB7] transition-colors duration-300 shadow-lg relative"
                style={{
                  border: "3px solid #3A5A40",
                  borderRadius: "20px 5px 20px 5px",
                }}
              >
                Explore All Unique Finds →
              </button>
            </div>
          </div>
        </>
      )}

      {currentPage === "shop" && (
        <div className="w-full md:max-w-7xl md:mx-auto px-2 md:px-4 py-8">
          <ProductGrid
            products={products}
            onProductClick={handleProductClick}
            onArtisanClick={handleArtisanClick}
            onAddToCart={addToCart}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            showFilters={true}
          />
        </div>
      )}

      {currentPage === "shop-all" && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="font-['Amatic_SC'] text-4xl md:text-5xl font-bold text-[#3A5A40] mb-2 md:mb-4">
              Shop All Products
            </h1>
            <p className="font-['Josefin_Sans'] text-base md:text-lg text-[#3A5A40]/80">
              Discover our complete collection of handcrafted treasures
            </p>
          </div>
          <ProductGrid
            products={products}
            onProductClick={handleProductClick}
            onArtisanClick={handleArtisanClick}
            onAddToCart={addToCart}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            showFilters={true}
          />
        </div>
      )}

      {currentPage === "about" && <About onNavigate={setCurrentPage} />}

      {currentPage === "product" && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={addToCart}
          onArtisanClick={handleArtisanClick}
          onBackClick={() => setCurrentPage("shop")}
          isInWishlist={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={() => toggleWishlist(selectedProduct.id)}
        />
      )}

      {currentPage === "checkout" && (
        <Checkout
          cart={cart}
          onBackClick={() => setCurrentPage("shop")}
          user={user}
        />
      )}

      {currentPage === "dashboard" && user && (
        <UserDashboard
          user={user}
          onBackClick={() => setCurrentPage("home")}
          products={products}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onProductClick={handleProductClick}
        />
      )}

      {currentPage === "artisan" && selectedArtisan && (
        <ArtisanProfile
          artisanId={selectedArtisan}
          products={products.filter((p) => p.artisan.id === selectedArtisan)}
          onProductClick={handleProductClick}
          onBackClick={() => setCurrentPage("shop")}
        />
      )}

      {currentPage === "search" && (
        <SearchPage
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          products={products}
          onProductClick={handleProductClick}
          onBackClick={() => setCurrentPage("home")}
        />
      )}

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentPage("checkout");
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(userData) => {
          setUser(userData);
          setIsAuthModalOpen(false);
          toast.success(`Welcome, ${userData.name}!`);
        }}
      />

      {(currentPage === "home" ||
        currentPage === "shop" ||
        currentPage === "shop-all" ||
        currentPage === "about" ||
        currentPage === "dashboard" ||
        currentPage === "artisan" ||
        currentPage === "search") && <Footer onNavigate={setCurrentPage} />}

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
