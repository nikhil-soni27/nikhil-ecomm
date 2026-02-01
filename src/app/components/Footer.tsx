import React from 'react';
import { Heart, Facebook, Instagram, Twitter, Mail, Leaf } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#9CAF88] mt-20">
      {/* Organic wave divider */}
      <div className="relative">
        <svg width="100%" height="40" viewBox="0 0 1200 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 20 Q 150 0, 300 20 T 600 20 T 900 20 T 1200 20 V 0 H 0 Z" 
                fill="#FAF7F2"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="text-[#FAF7F2] w-6 h-6" strokeWidth={1.5} />
              <h3 className="font-['Oleo_Script'] text-2xl text-[#FAF7F2]">
                Natura
              </h3>
            </div>
            <p className="font-['Lora'] text-sm text-[#FAF7F2]/90 leading-relaxed mb-6">
              Nourishing your skin with the finest organic, plant-based ingredients. 
              Because natural beauty starts with nature.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-[#FAF7F2] rounded-full flex items-center justify-center hover:bg-[#C77956] hover:text-[#FAF7F2] transition-all duration-350">
                <Facebook size={18} className="text-[#9CAF88]" />
              </button>
              <button className="w-10 h-10 bg-[#FAF7F2] rounded-full flex items-center justify-center hover:bg-[#C77956] hover:text-[#FAF7F2] transition-all duration-350">
                <Instagram size={18} className="text-[#9CAF88]" />
              </button>
              <button className="w-10 h-10 bg-[#FAF7F2] rounded-full flex items-center justify-center hover:bg-[#C77956] hover:text-[#FAF7F2] transition-all duration-350">
                <Twitter size={18} className="text-[#9CAF88]" />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-['Lora'] text-base font-semibold text-[#FAF7F2] mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350"
                >
                  All Products
                </button>
              </li>
              <li>
                <button className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350">
                  Face Care
                </button>
              </li>
              <li>
                <button className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350">
                  Body Care
                </button>
              </li>
              <li>
                <button className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350">
                  Hair Care
                </button>
              </li>
              <li>
                <button className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350">
                  Gift Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-['Lora'] text-base font-semibold text-[#FAF7F2] mb-4">
              Learn
            </h4>
            <ul className="space-y-3">
              <li>
                <button className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350">
                  Our Story
                </button>
              </li>
              <li>
                <button className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350">
                  Ingredient Guide
                </button>
              </li>
              <li>
                <button className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350">
                  Sustainability
                </button>
              </li>
              <li>
                <button className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350">
                  Skin Care Tips
                </button>
              </li>
              <li>
                <button className="font-['Lora'] text-sm text-[#FAF7F2]/80 hover:text-[#C77956] transition-colors duration-350">
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-['Lora'] text-base font-semibold text-[#FAF7F2] mb-4">
              Join our community
            </h4>
            <p className="font-['Lora'] text-sm text-[#FAF7F2]/80 mb-4">
              Get natural beauty tips and 10% off your first order
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-l-lg font-['Lora'] text-sm text-[#A8927B] bg-[#FAF7F2] border border-[#9CAF88] focus:outline-none focus:border-[#C77956]"
              />
              <button className="px-4 py-2.5 bg-[#C77956] text-[#FAF7F2] rounded-r-lg hover:bg-[#A8927B] transition-colors duration-350">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-[#FAF7F2]/20 mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#FAF7F2]/10 rounded-full flex items-center justify-center mb-2">
              <Leaf className="w-6 h-6 text-[#FAF7F2]" strokeWidth={2} />
            </div>
            <span className="font-['Lora'] text-xs text-[#FAF7F2]">Organic</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#FAF7F2]/10 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-[#FAF7F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-['Lora'] text-xs text-[#FAF7F2]">Cruelty-Free</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#FAF7F2]/10 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-[#FAF7F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-['Lora'] text-xs text-[#FAF7F2]">Vegan</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#FAF7F2]/10 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-[#FAF7F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-['Lora'] text-xs text-[#FAF7F2]">Eco-Friendly</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#FAF7F2]/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="font-['Lora'] text-sm text-[#FAF7F2]/70 mb-4 md:mb-0">
              © 2026 Natura. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button className="font-['Lora'] text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors duration-350">
                Privacy Policy
              </button>
              <button className="font-['Lora'] text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors duration-350">
                Terms of Service
              </button>
              <button className="font-['Lora'] text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors duration-350">
                Shipping & Returns
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
