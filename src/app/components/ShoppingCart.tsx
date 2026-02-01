import React from 'react';
import { X, Minus, Plus, ShoppingBag, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import type { CartItem } from '@/app/App';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, customization?: any) => void;
  onRemove: (productId: string, customization?: any) => void;
  onCheckout: () => void;
}

export function ShoppingCart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onCheckout
}: ShoppingCartProps) {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 8.99;
  const total = subtotal + shipping;

  // Get unique artisans
  const artisans = Array.from(new Set(cart.map(item => item.artisan.name)));

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-[#FAF7F2] shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#FAF7F2] border-b border-[#A8927B]/20 p-6 z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#A8927B]">
              Your Bag
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#9CAF88]/10 transition-colors duration-350"
            >
              <X size={20} className="text-[#A8927B]" />
            </button>
          </div>
          <p className="font-['Lora'] text-sm text-[#A8927B]/70">
            {cart.reduce((total, item) => total + item.quantity, 0)} {cart.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-24 h-24 bg-[#9CAF88]/10 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-[#9CAF88]" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#A8927B] mb-2">
              Your bag is empty
            </h3>
            <p className="font-['Lora'] text-sm text-[#A8927B]/70 text-center mb-6">
              Discover natural skincare products to nourish your skin
            </p>
            <button
              onClick={onClose}
              className="bg-[#9CAF88] text-[#FAF7F2] px-6 py-3 rounded-lg font-['Lora'] font-medium hover:bg-[#C77956] transition-colors duration-350"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="p-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${JSON.stringify(item.customization)}`}
                  className="bg-white p-4 rounded-lg"
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-['Lora'] text-base font-semibold text-[#A8927B] truncate">
                            {item.name}
                          </h4>
                          <p className="font-['Lora'] text-xs text-[#9CAF88]">
                            by {item.artisan.name}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemove(item.id, item.customization)}
                          className="text-[#A8927B]/50 hover:text-[#C77956] transition-colors duration-350"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {item.customization && (
                        <div className="bg-[#9CAF88]/10 px-3 py-2 rounded-lg mb-2">
                          <p className="font-['Lora'] text-xs text-[#A8927B]">
                            {item.customization.size && `Size: ${item.customization.size}`}
                          </p>
                        </div>
                      )}

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <p className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#C77956]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.customization)}
                            className="w-8 h-8 bg-white border border-[#A8927B]/20 rounded-full flex items-center justify-center hover:bg-[#9CAF88]/10 transition-colors duration-350"
                          >
                            <Minus size={14} className="text-[#A8927B]" />
                          </button>
                          <span className="font-['Lora'] text-sm font-medium text-[#A8927B] w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.customization)}
                            className="w-8 h-8 bg-[#9CAF88] rounded-full flex items-center justify-center hover:bg-[#C77956] transition-colors duration-350"
                          >
                            <Plus size={14} className="text-[#FAF7F2]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Support Message */}
            <div className="mx-6 mb-6 bg-[#9CAF88]/10 p-4 rounded-lg border border-[#9CAF88]/20">
              <p className="font-['Lora'] text-sm font-semibold text-[#9CAF88] mb-1">
                Complete Your Routine
              </p>
              <p className="font-['Lora'] text-xs text-[#A8927B]">
                Curated by {artisans.join(', ')}
              </p>
            </div>

            {/* Summary */}
            <div className="sticky bottom-0 bg-[#FAF7F2] border-t border-[#A8927B]/20 p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-['Lora'] text-sm text-[#A8927B]">
                    Subtotal
                  </span>
                  <span className="font-['Lora'] text-sm font-medium text-[#A8927B]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-['Lora'] text-sm text-[#A8927B]">
                    Shipping
                  </span>
                  <span className="font-['Lora'] text-sm font-medium text-[#A8927B]">
                    {shipping === 0 ? (
                      <span className="text-[#9CAF88]">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 75 && (
                  <div className="bg-[#9CAF88]/10 px-3 py-2 rounded-lg">
                    <p className="font-['Lora'] text-xs text-[#9CAF88] text-center">
                      Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
                <div className="border-t border-[#A8927B]/20 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#A8927B]">
                      Total
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#C77956]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[#9CAF88] text-[#FAF7F2] px-8 py-4 rounded-lg font-['Lora'] text-base font-medium hover:bg-[#C77956] transition-all duration-350"
                style={{
                  boxShadow: '0 4px 16px rgba(156, 175, 136, 0.3)'
                }}
              >
                Proceed to Checkout - ${total.toFixed(2)}
              </button>

              <p className="font-['Lora'] text-xs text-[#A8927B]/60 text-center mt-3">
                Secure checkout • Recyclable packaging
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}