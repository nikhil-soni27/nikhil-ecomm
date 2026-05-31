import React, { useState } from "react";
import {
  ChevronLeft,
  Package,
  Heart,
  User as UserIcon,
  Plus,
  LogOut,
} from "lucide-react";
import type { User, Product } from "@/app/App";
import { ProductCard } from "@/app/components/ProductCard";
import { toast } from "sonner";

interface UserDashboardProps {
  user: User;
  onBackClick: () => void;
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onProductClick: (product: Product) => void;
  onAddProduct?: (productData: Partial<Product>) => Promise<Product>;
  onLogout?: () => void;
}

export function UserDashboard({
  user,
  onBackClick,
  products,
  wishlist,
  onToggleWishlist,
  onProductClick,
  onAddProduct,
  onLogout,
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = React.useState<
    "orders" | "wishlist" | "manage-products"
  >("orders");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "Pottery",
    image: "",
    location: "",
    inStock: "5",
    customizable: false,
  });

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      toast.error("Product name and price are required!");
      return;
    }
    setLoading(true);
    try {
      if (onAddProduct) {
        await onAddProduct({
          name: newProduct.name,
          price: Number(newProduct.price),
          description: newProduct.description,
          category: newProduct.category,
          image: newProduct.image || undefined,
          location: newProduct.location || undefined,
          inStock: Number(newProduct.inStock) || 5,
          customizable: newProduct.customizable,
          materials: [],
        });
        toast.success("Product created successfully!");
        setShowAddForm(false);
        // Reset form
        setNewProduct({
          name: "",
          price: "",
          description: "",
          category: "Pottery",
          image: "",
          location: "",
          inStock: "5",
          customizable: false,
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  // Mock orders data
  const orders = [
    {
      id: "12345",
      date: "Jan 28, 2026",
      status: "In Progress",
      total: 125.0,
      items: 2,
      image: products[0].image,
    },
    {
      id: "12344",
      date: "Jan 15, 2026",
      status: "Delivered",
      total: 89.0,
      items: 1,
      image: products[1].image,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF3E8] py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="flex items-center space-x-2 mb-8 text-[#3A5A40] hover:text-[#9CAF88] transition-colors duration-300"
        >
          <ChevronLeft size={20} />
          <span className="text-sm tracking-[0.12em] uppercase text-[#A8927B]">
            Back to Home
          </span>
        </button>

        {/* Header */}
        <div className="bg-[#FAF7F2] p-8 rounded-[32px] shadow-[0_28px_80px_rgba(71,56,38,0.12)] mb-8 ring-1 ring-[#A8927B]/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-[28px] bg-[#9CAF88]/15 flex items-center justify-center text-[#3A5A40] shadow-sm ring-1 ring-[#A8927B]/15">
                <UserIcon size={40} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#A8927B]">
                  Artisan Marketplace
                </p>
                <h1 className="mt-3 text-4xl font-semibold text-[#3A5A40] font-['Cormorant_Garamond']">
                  Welcome, {user.name}!
                </h1>
                <p className="mt-2 text-sm text-[#6B5E4E]">{user.email}</p>
              </div>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-[20px] border border-[#A8927B]/25 bg-white px-6 py-3 text-sm font-medium text-[#3A5A40] shadow-sm transition hover:border-[#9CAF88] hover:bg-[#FAF7F2]"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition ${
              activeTab === "orders"
                ? "bg-[#9CAF88] text-[#FAF7F2] shadow-md"
                : "bg-white text-[#3A5A40] ring-1 ring-[#A8927B]/15 hover:bg-[#F4E9DC]"
            }`}
          >
            <Package size={18} />
            <span>My Orders</span>
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition ${
              activeTab === "wishlist"
                ? "bg-[#9CAF88] text-[#FAF7F2] shadow-md"
                : "bg-white text-[#3A5A40] ring-1 ring-[#A8927B]/15 hover:bg-[#F4E9DC]"
            }`}
          >
            <Heart size={18} />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          {user.isArtisan && (
            <button
              onClick={() => setActiveTab("manage-products")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition ${
                activeTab === "manage-products"
                  ? "bg-[#9CAF88] text-[#FAF7F2] shadow-md"
                  : "bg-white text-[#3A5A40] ring-1 ring-[#A8927B]/15 hover:bg-[#F4E9DC]"
              }`}
            >
              <Package size={18} />
              <span>Manage My Products</span>
            </button>
          )}
        </div>

        {/* Content */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/95 p-6 rounded-[28px] shadow-[0_24px_60px_rgba(71,56,38,0.12)] border border-[#A8927B]/10"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#A8927B]">
                      Order #{order.id}
                    </p>
                    <p className="mt-2 text-sm text-[#6B5E4E]">{order.date}</p>
                  </div>
                  <div
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-[#9CAF88]/15 text-[#3A5A40]"
                        : "bg-[#C77956]/15 text-[#A35A36]"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={order.image}
                      alt="Order"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-['Josefin_Sans'] text-sm font-medium text-[#3A5A40]">
                        {order.items} {order.items === 1 ? "item" : "items"}
                      </p>
                      <p className="font-['Amatic_SC'] text-2xl font-bold text-[#3A5A40]">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      toast.info(`Viewing details for Order #${order.id}`, {
                        description:
                          "This feature is currently a mock and will be fully implemented soon.",
                      })
                    }
                    className="inline-flex items-center justify-center rounded-full bg-[#FAF7F2] px-6 py-3 text-sm font-semibold text-[#3A5A40] ring-1 ring-[#A8927B]/20 transition hover:bg-[#F4E9DC]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[28px] border border-[#A8927B]/10 shadow-[0_20px_60px_rgba(71,56,38,0.08)]">
                <Package size={64} className="mx-auto text-[#9CAF88] mb-4" />
                <p className="text-3xl font-semibold text-[#3A5A40] mb-2">
                  No orders yet
                </p>
                <p className="text-sm text-[#6B5E4E]">
                  Start shopping to see your orders here.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            {wishlistProducts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {wishlistProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onProductClick}
                    onArtisanClick={() => {}}
                    onAddToCart={() => {}}
                    isInWishlist={true}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/95 rounded-[28px] border border-[#A8927B]/10 p-12 shadow-[0_20px_40px_rgba(71,56,38,0.06)]">
                <Heart size={64} className="mx-auto text-[#C77956] mb-4" />
                <p className="text-3xl font-semibold text-[#3A5A40] mb-2">
                  Your wishlist is empty
                </p>
                <p className="text-sm text-[#6B5E4E] mb-6">
                  Save items you love for later
                </p>
                <button
                  onClick={onBackClick}
                  className="rounded-full bg-[#9CAF88] px-6 py-3 text-sm font-semibold text-[#FAF7F2] shadow-sm transition hover:bg-[#82ae6f]"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "manage-products" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-4xl font-semibold text-[#3A5A40] font-['Cormorant_Garamond']">
                  My Products (
                  {
                    products.filter(
                      (p) =>
                        p.artisan.id === user.id ||
                        p.artisan.name === user.name,
                    ).length
                  }
                  )
                </h2>
                <p className="mt-2 text-sm text-[#6B5E4E]">
                  Manage your handmade listings and keep your shop updated.
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center gap-2 rounded-full bg-[#9CAF88] px-6 py-3 text-sm font-semibold text-[#FAF7F2] shadow-md transition hover:bg-[#82ae6f]"
              >
                <Plus size={16} />
                <span>{showAddForm ? "Cancel" : "Add New Product"}</span>
              </button>
            </div>

            {showAddForm && (
              <form
                onSubmit={handleCreateProduct}
                className="bg-white/95 p-8 rounded-[28px] shadow-[0_24px_60px_rgba(71,56,38,0.12)] space-y-6 border border-[#A8927B]/10"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-[#3A5A40] font-['Cormorant_Garamond'] mb-2">
                    Add Handcrafted Product
                  </h3>
                  <p className="text-sm text-[#6B5E4E]">
                    Share your newest artisan creation with the marketplace.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#3A5A40] mb-2 block">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="w-full rounded-3xl border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none focus:border-[#9CAF88] focus:ring-[#9CAF88]/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#3A5A40] mb-2 block">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      className="w-full rounded-3xl border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none focus:border-[#9CAF88] focus:ring-[#9CAF88]/20"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#3A5A40] mb-2 block">
                      Category
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      className="w-full rounded-3xl border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none focus:border-[#9CAF88] focus:ring-[#9CAF88]/20"
                    >
                      <option value="Pottery">Pottery</option>
                      <option value="Leather Goods">Leather Goods</option>
                      <option value="Textiles">Textiles</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Woodwork">Woodwork</option>
                      <option value="Baskets">Baskets</option>
                      <option value="Candles">Candles</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-[#3A5A40] mb-2 block">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newProduct.location}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          location: e.target.value,
                        })
                      }
                      className="w-full rounded-3xl border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none focus:border-[#9CAF88] focus:ring-[#9CAF88]/20"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#3A5A40] mb-2 block">
                      Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                      className="w-full rounded-3xl border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none focus:border-[#9CAF88] focus:ring-[#9CAF88]/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#3A5A40] mb-2 block">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={newProduct.inStock}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          inStock: e.target.value,
                        })
                      }
                      className="w-full rounded-3xl border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none focus:border-[#9CAF88] focus:ring-[#9CAF88]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#3A5A40] mb-2 block">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full rounded-3xl border border-[#A8927B]/20 bg-white px-4 py-3 text-sm text-[#3A5A40] outline-none focus:border-[#9CAF88] focus:ring-[#9CAF88]/20"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="customizable"
                    checked={newProduct.customizable}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        customizable: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-[#A8927B] text-[#9CAF88] focus:ring-[#9CAF88]"
                  />
                  <label
                    htmlFor="customizable"
                    className="text-sm text-[#3A5A40] cursor-pointer"
                  >
                    Offer customization (e.g. initials or size)
                  </label>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="rounded-full bg-[#F4F0EA] px-6 py-3 text-sm font-semibold text-[#6B5E4E] transition hover:bg-[#E8DFC9]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-[#C77956] px-8 py-3 text-sm font-semibold text-[#FAF7F2] shadow-md transition hover:bg-[#A85B42] disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </form>
            )}

            {/* List Artisan's Products */}
            {products.filter(
              (p) => p.artisan.id === user.id || p.artisan.name === user.name,
            ).length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {products
                  .filter(
                    (p) =>
                      p.artisan.id === user.id || p.artisan.name === user.name,
                  )
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={onProductClick}
                      onArtisanClick={() => {}}
                      onAddToCart={() => {}}
                      isInWishlist={wishlist.includes(product.id)}
                      onToggleWishlist={onToggleWishlist}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[28px] border border-dashed border-[#A8927B]/20 shadow-[0_20px_60px_rgba(71,56,38,0.08)]">
                <Package size={64} className="mx-auto text-[#9CAF88] mb-4" />
                <p className="text-3xl font-semibold text-[#3A5A40] mb-2">
                  No products listed yet
                </p>
                <p className="text-sm text-[#6B5E4E] mb-6">
                  List your first handcrafted masterpiece to start selling!
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="rounded-full bg-[#C77956] px-6 py-3 text-sm font-semibold text-[#FAF7F2] shadow-md transition hover:bg-[#A85B42]"
                >
                  Create Your First Listing
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
