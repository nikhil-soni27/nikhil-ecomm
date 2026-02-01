import React, { useState } from 'react';
import { Heart, ShoppingBag, User, Search, Menu, X, Leaf } from 'lucide-react';
import type { User as UserType } from '@/app/App';

interface NavigationProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onShopClick: () => void;
  onShopAllClick: () => void;
  onAboutClick: () => void;
  onHomeClick: () => void;
  onAccountClick: () => void;
  onSearchClick: () => void;
  user: UserType | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Navigation({
  cartCount,
  wishlistCount,
  onCartClick,
  onShopClick,
  onShopAllClick,
  onAboutClick,
  onHomeClick,
  onAccountClick,
  onSearchClick,
  user,
  searchQuery,
  onSearchChange
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FAF7F2]/95 backdrop-blur-sm sticky top-0 z-50" style={{
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[75px]">
          {/* Logo */}
          <button
            onClick={onHomeClick}
            className="flex items-center space-x-2 group"
          >
            <Leaf className="text-[#9CAF88] w-8 h-8" strokeWidth={1.5} />
            <h1 className="font-['Oleo_Script'] text-3xl text-[#9CAF88] hover:text-[#C77956] transition-colors duration-350">
              Natura
            </h1>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={onHomeClick}
              className="font-['Lora'] text-sm text-[#A8927B] hover:text-[#9CAF88] transition-all duration-350 relative group"
            >
              Home
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#9CAF88] group-hover:w-full transition-all duration-350"></span>
            </button>
            <button
              onClick={onShopAllClick}
              className="font-['Lora'] text-sm text-[#A8927B] hover:text-[#9CAF88] transition-all duration-350 relative group"
            >
              Shop All
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#9CAF88] group-hover:w-full transition-all duration-350"></span>
            </button>
            <button
              onClick={onShopClick}
              className="font-['Lora'] text-sm text-[#A8927B] hover:text-[#9CAF88] transition-all duration-350 relative group"
            >
              Categories
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#9CAF88] group-hover:w-full transition-all duration-350"></span>
            </button>
            <button
              onClick={onAboutClick}
              className="font-['Lora'] text-sm text-[#A8927B] hover:text-[#9CAF88] transition-all duration-350 relative group"
            >
              About
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#9CAF88] group-hover:w-full transition-all duration-350"></span>
            </button>
          </div>

          {/* Search Bar - Always Visible */}
          <div className="hidden md:flex items-center bg-[#FAF7F2] border border-[#9CAF88] rounded-full px-4 py-2 flex-1 max-w-md mx-8">
            <Search className="text-[#9CAF88] w-4 h-4 mr-2" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search natural products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent outline-none w-full font-['Lora'] text-sm text-[#A8927B] placeholder:text-[#A8927B]/50"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={onSearchClick}
              className="md:hidden text-[#9CAF88] hover:text-[#C77956] transition-colors duration-350 relative"
            >
              <Search size={22} strokeWidth={2} />
            </button>

            <button
              onClick={onAccountClick}
              className="text-[#9CAF88] hover:text-[#C77956] transition-colors duration-350 relative hidden md:block"
            >
              <User size={22} strokeWidth={2} />
              {user && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#9CAF88] rounded-full"></span>
              )}
            </button>

            <button
              onClick={onAccountClick}
              className="text-[#9CAF88] hover:text-[#C77956] transition-colors duration-350 relative hidden md:block"
            >
              <Heart size={22} strokeWidth={2} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C77956] text-[#FAF7F2] text-xs font-['Lora'] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="text-[#9CAF88] hover:text-[#C77956] transition-colors duration-350 relative"
            >
              <ShoppingBag size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C77956] text-[#FAF7F2] text-xs font-['Lora'] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#9CAF88]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#A8927B]/20">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center bg-[#FAF7F2] border border-[#9CAF88] rounded-full px-4 py-2">
                <Search className="text-[#9CAF88] w-4 h-4 mr-2" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search natural products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent outline-none w-full font-['Lora'] text-sm text-[#A8927B] placeholder:text-[#A8927B]/50"
                />
              </div>

              <button
                onClick={() => {
                  onHomeClick();
                  setIsMobileMenuOpen(false);
                }}
                className="font-['Lora'] text-sm text-[#A8927B] hover:text-[#9CAF88] transition-colors duration-350 text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onShopAllClick();
                  setIsMobileMenuOpen(false);
                }}
                className="font-['Lora'] text-sm text-[#A8927B] hover:text-[#9CAF88] transition-colors duration-350 text-left"
              >
                Shop All
              </button>
              <button
                onClick={() => {
                  onAboutClick();
                  setIsMobileMenuOpen(false);
                }}
                className="font-['Lora'] text-sm text-[#A8927B] hover:text-[#9CAF88] transition-colors duration-350 text-left"
              >
                About
              </button>
              <button
                onClick={() => {
                  onAccountClick();
                  setIsMobileMenuOpen(false);
                }}
                className="font-['Lora'] text-sm text-[#A8927B] hover:text-[#9CAF88] transition-colors duration-350 text-left flex items-center justify-between"
              >
                <span>Account</span>
                {user && <span className="text-xs text-[#9CAF88]">Signed in</span>}
              </button>
              <button
                onClick={() => {
                  onAccountClick();
                  setIsMobileMenuOpen(false);
                }}
                className="font-['Lora'] text-sm text-[#A8927B] hover:text-[#9CAF88] transition-colors duration-350 text-left flex items-center justify-between"
              >
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-[#C77956] text-[#FAF7F2] text-xs px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Organic Badge */}
      <div className="hidden md:block absolute top-2 right-4">
        <div className="flex items-center space-x-1">
          <Leaf className="text-[#9CAF88] w-3 h-3" strokeWidth={2} />
          <p className="font-['Lora'] text-xs text-[#A8927B]/60">
            100% Natural
          </p>
        </div>
      </div>
    </nav>
  );
}
