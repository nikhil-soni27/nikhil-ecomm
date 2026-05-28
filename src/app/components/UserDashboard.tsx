import React, { useState } from 'react';
import { ChevronLeft, Package, Heart, User as UserIcon, Plus } from 'lucide-react';
import type { User, Product } from '@/app/App';
import { ProductCard } from '@/app/components/ProductCard';
import { toast } from 'sonner';

interface UserDashboardProps {
  user: User;
  onBackClick: () => void;
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onProductClick: (product: Product) => void;
  onAddProduct?: (productData: Partial<Product>) => Promise<Product>;
}

export function UserDashboard({
  user,
  onBackClick,
  products,
  wishlist,
  onToggleWishlist,
  onProductClick,
  onAddProduct
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = React.useState<'orders' | 'wishlist' | 'manage-products'>('orders');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Pottery',
    image: '',
    location: '',
    inStock: '5',
    customizable: false
  });

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

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
          materials: []
        });
        toast.success("Product created successfully!");
        setShowAddForm(false);
        // Reset form
        setNewProduct({
          name: '',
          price: '',
          description: '',
          category: 'Pottery',
          image: '',
          location: '',
          inStock: '5',
          customizable: false
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
      id: '12345',
      date: 'Jan 28, 2026',
      status: 'In Progress',
      total: 125.00,
      items: 2,
      image: products[0].image
    },
    {
      id: '12344',
      date: 'Jan 15, 2026',
      status: 'Delivered',
      total: 89.00,
      items: 1,
      image: products[1].image
    }
  ];

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

        {/* Header */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-8"
             style={{
               border: '3px solid #D4703B',
               borderRadius: '30px 10px 30px 10px'
             }}>
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-[#D4703B] rounded-full flex items-center justify-center">
              <UserIcon size={40} className="text-[#FFF8E7]" />
            </div>
            <div>
              <h1 className="font-['Amatic_SC'] text-5xl font-bold text-[#3A5A40] mb-2">
                Welcome, {user.name}!
              </h1>
              <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-['Josefin_Sans'] font-medium transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-[#D4703B] text-[#FFF8E7] shadow-lg'
                : 'bg-white text-[#3A5A40] hover:bg-[#F4ACB7]/30'
            }`}
            style={{
              border: '2px solid #3A5A40',
              borderRadius: '15px 5px 15px 5px'
            }}
          >
            <Package size={20} />
            <span>My Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-['Josefin_Sans'] font-medium transition-all duration-300 ${
              activeTab === 'wishlist'
                ? 'bg-[#D4703B] text-[#FFF8E7] shadow-lg'
                : 'bg-white text-[#3A5A40] hover:bg-[#F4ACB7]/30'
            }`}
            style={{
              border: '2px solid #3A5A40',
              borderRadius: '15px 5px 15px 5px'
            }}
          >
            <Heart size={20} />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          {user.isArtisan && (
            <button
              onClick={() => setActiveTab('manage-products')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-['Josefin_Sans'] font-medium transition-all duration-300 ${
                activeTab === 'manage-products'
                  ? 'bg-[#D4703B] text-[#FFF8E7] shadow-lg'
                  : 'bg-white text-[#3A5A40] hover:bg-[#F4ACB7]/30'
              }`}
              style={{
                border: '2px solid #3A5A40',
                borderRadius: '15px 5px 15px 5px'
              }}
            >
              <Package size={20} />
              <span>Manage My Products</span>
            </button>
          )}
        </div>

        {/* Content */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-xl shadow-lg"
                style={{
                  border: '2px solid #3A5A40/20',
                  borderRadius: '20px 5px 20px 5px'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                      Order #{order.id}
                    </p>
                    <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                      {order.date}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-[#3A5A40]/20 text-[#3A5A40]'
                      : 'bg-[#D4703B]/20 text-[#D4703B]'
                  }`}
                       style={{ borderRadius: '20px 5px 20px 5px' }}>
                    <p className="font-['Josefin_Sans'] text-sm font-semibold">
                      {order.status}
                    </p>
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
                        {order.items} {order.items === 1 ? 'item' : 'items'}
                      </p>
                      <p className="font-['Amatic_SC'] text-2xl font-bold text-[#3A5A40]">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <button className="bg-[#F4ACB7]/30 text-[#3A5A40] px-6 py-2 rounded-lg font-['Josefin_Sans'] text-sm font-medium hover:bg-[#F4ACB7] transition-colors duration-300"
                          style={{ borderRadius: '12px 3px 12px 3px' }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="text-center py-20">
                <Package size={64} className="mx-auto text-[#D4703B] mb-4" />
                <p className="font-['Amatic_SC'] text-3xl text-[#3A5A40] mb-2">
                  No orders yet
                </p>
                <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                  Start shopping to see your orders here
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
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
              <div className="text-center py-20">
                <Heart size={64} className="mx-auto text-[#D4703B] mb-4" />
                <p className="font-['Amatic_SC'] text-3xl text-[#3A5A40] mb-2">
                  Your wishlist is empty
                </p>
                <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70">
                  Save items you love for later
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'manage-products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-['Amatic_SC'] text-4xl font-bold text-[#3A5A40]">
                My Products ({products.filter(p => p.artisan.id === user.id || p.artisan.name === user.name).length})
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center space-x-2 bg-[#D4703B] text-[#FFF8E7] px-6 py-3 rounded-lg font-['Josefin_Sans'] text-sm font-semibold hover:bg-[#3A5A40] transition-colors duration-300 shadow-md"
                style={{
                  border: '2px solid #3A5A40',
                  borderRadius: '15px 5px 15px 5px'
                }}
              >
                <Plus size={16} />
                <span>{showAddForm ? 'Cancel' : 'Add New Product'}</span>
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleCreateProduct} className="bg-white p-8 rounded-3xl shadow-xl space-y-4 border-2 border-[#D4703B]"
                    style={{ borderRadius: '30px 10px 30px 10px' }}>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#3A5A40] mb-4">
                  Add Handcrafted Product
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                      style={{ borderRadius: '12px 3px 12px 3px' }}
                    />
                  </div>

                  <div>
                    <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                      style={{ borderRadius: '12px 3px 12px 3px' }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                      Category
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                      style={{ borderRadius: '12px 3px 12px 3px' }}
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
                    <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                      Location (e.g. Portland, OR)
                    </label>
                    <input
                      type="text"
                      value={newProduct.location}
                      onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                      style={{ borderRadius: '12px 3px 12px 3px' }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                      Image URL (Unsplash or direct link)
                    </label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                      style={{ borderRadius: '12px 3px 12px 3px' }}
                    />
                  </div>

                  <div>
                    <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={newProduct.inStock}
                      onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                      style={{ borderRadius: '12px 3px 12px 3px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-['Josefin_Sans'] text-sm text-[#3A5A40] mb-2 block">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#3A5A40]/20 focus:border-[#D4703B] focus:outline-none font-['Josefin_Sans'] text-sm bg-white"
                    style={{ borderRadius: '12px 3px 12px 3px' }}
                  />
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <input
                    type="checkbox"
                    id="customizable"
                    checked={newProduct.customizable}
                    onChange={(e) => setNewProduct({ ...newProduct, customizable: e.target.checked })}
                    className="w-4 h-4 text-[#D4703B] border-2 border-[#3A5A40] rounded focus:ring-[#D4703B] cursor-pointer"
                  />
                  <label htmlFor="customizable" className="font-['Josefin_Sans'] text-sm text-[#3A5A40] select-none cursor-pointer">
                    Offer Customization (e.g. custom initials/size)
                  </label>
                </div>

                <div className="flex justify-end space-x-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-['Josefin_Sans'] text-sm font-semibold hover:bg-gray-200 transition-colors"
                    style={{ borderRadius: '12px 3px 12px 3px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#D4703B] text-[#FFF8E7] px-8 py-3 rounded-lg font-['Josefin_Sans'] text-sm font-semibold hover:bg-[#3A5A40] transition-colors shadow-md disabled:opacity-50"
                    style={{
                      border: '2px solid #3A5A40',
                      borderRadius: '15px 5px 15px 5px'
                    }}
                  >
                    {loading ? 'Creating...' : 'Create Product'}
                  </button>
                </div>
              </form>
            )}

            {/* List Artisan's Products */}
            {products.filter(p => p.artisan.id === user.id || p.artisan.name === user.name).length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {products
                  .filter(p => p.artisan.id === user.id || p.artisan.name === user.name)
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
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-[#3A5A40]/20"
                   style={{ borderRadius: '30px 10px 30px 10px' }}>
                <Package size={64} className="mx-auto text-[#D4703B] mb-4" />
                <p className="font-['Amatic_SC'] text-3xl text-[#3A5A40] mb-2">
                  No products listed yet
                </p>
                <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/70 mb-6">
                  List your first handcrafted masterpiece to start selling!
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#D4703B] text-[#FFF8E7] px-6 py-3 rounded-lg font-['Josefin_Sans'] text-sm font-semibold hover:bg-[#3A5A40] transition-colors"
                  style={{
                    border: '2px solid #3A5A40',
                    borderRadius: '15px 5px 15px 5px'
                  }}
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
