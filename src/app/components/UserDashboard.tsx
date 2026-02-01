import React from 'react';
import { ChevronLeft, Package, Heart, User as UserIcon } from 'lucide-react';
import type { User, Product } from '@/app/App';
import { ProductCard } from '@/app/components/ProductCard';

interface UserDashboardProps {
  user: User;
  onBackClick: () => void;
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onProductClick: (product: Product) => void;
}

export function UserDashboard({
  user,
  onBackClick,
  products,
  wishlist,
  onToggleWishlist,
  onProductClick
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = React.useState<'orders' | 'wishlist'>('orders');

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

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
      </div>
    </div>
  );
}
