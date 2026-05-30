import React, { useState, useEffect } from "react";
import { Navigation } from "@/app/components/Navigation";
import { api } from "@/app/utils/api";
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
import { PulseLoader } from "react-spinners";

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

  // Dynamic products and loading states
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  // Fetch all products from Express backend
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      setErrorProducts(null);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err: any) {
      console.error("Failed to load products from API:", err);
      setErrorProducts(err.message || "Failed to load products");
      toast.error("Could not load products. Please check if the Express backend is running.");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Restore session & fetch cart on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("artisan_token");
      if (token) {
        try {
          const userData = await api.getProfile();
          setUser(userData);
          
          // Get backend cart
          const serverCart = await api.getCart();
          if (serverCart && serverCart.length > 0) {
            setCart(serverCart);
          }
        } catch (err) {
          console.error("Session restoration failed:", err);
          // Token expired or invalid
          api.logout();
        }
      }
    };
    restoreSession();
  }, []);

  // Sync cart to server on state updates (only if logged in)
  useEffect(() => {
    const syncCartWithServer = async () => {
      if (user) {
        try {
          await api.syncCart(cart);
        } catch (err) {
          console.error("Failed to sync cart with server:", err);
        }
      }
    };
    syncCartWithServer();
  }, [cart, user]);

  const handleAddProduct = async (productData: Partial<Product>) => {
    try {
      const newProduct = await api.addProduct(productData);
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err: any) {
      console.error("Failed to add product:", err);
      throw err;
    }
  };

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

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    setCurrentPage("home");
    setCart([]);
    toast.success("Successfully logged out");
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const renderProductContent = (content: React.ReactNode) => {
    if (loadingProducts) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] py-20">
          <PulseLoader color="#4F6F52" size={20} />
          <p className="mt-8 font-['Josefin_Sans'] text-lg text-[#3A5A40]">
            Loading handcrafted treasures...
          </p>
        </div>
      );
    }

    if (errorProducts) {
      return (
        <div className="text-center py-20 min-h-[40vh] flex flex-col justify-center">
          <p className="font-['Amatic_SC'] text-4xl text-[#D4703B] mb-2">Failed to load products</p>
          <p className="font-['Josefin_Sans'] text-lg text-[#3A5A40]/80">{errorProducts}</p>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-center py-20 min-h-[40vh] flex flex-col justify-center">
          <p className="font-['Amatic_SC'] text-4xl text-[#3A5A40] mb-2">No products found</p>
          <p className="font-['Josefin_Sans'] text-lg text-[#3A5A40]/80">Check back later for new arrivals!</p>
        </div>
      );
    }

    return content;
  };

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
        onLogout={handleLogout}
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

            {renderProductContent(
              <>
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
              </>
            )}
          </div>
        </>
      )}

      {currentPage === "shop" && (
        <div className="w-full md:max-w-7xl md:mx-auto px-2 md:px-4 py-8">
          {renderProductContent(
            <ProductGrid
              products={products}
              onProductClick={handleProductClick}
              onArtisanClick={handleArtisanClick}
              onAddToCart={addToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              showFilters={true}
            />
          )}
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
          {renderProductContent(
            <ProductGrid
              products={products}
              onProductClick={handleProductClick}
              onArtisanClick={handleArtisanClick}
              onAddToCart={addToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              showFilters={true}
            />
          )}
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
          onAddProduct={handleAddProduct}
          onLogout={handleLogout}
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
