import React from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Sparkles } from "lucide-react";

interface HeroProps {
  onShopClick: () => void;
}

export function Hero({ onShopClick }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-b from-[#FAF7F2] to-[#E8DED0]/30 overflow-hidden">
      {/* Watercolor texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            {/* Seasonal Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#9CAF88]/10 text-[#9CAF88] px-5 py-2.5 rounded-full font-['Lora'] text-xs border border-[#9CAF88]/30">
              <Sparkles className="w-4 h-4" strokeWidth={2} />
              <span>Spring Renewal Collection</span>
            </div>

            {/* Headline */}
            <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#A8927B] leading-[1.2]">
              Nourish Your Skin
              <br />
              <span className="text-[#9CAF88]">Naturally</span>
            </h1>

            {/* Description */}
            <p className="font-['Lora'] text-base sm:text-lg text-[#A8927B]/85 leading-relaxed max-w-lg">
              Experience the gentle power of nature with our certified organic,
              plant-based skincare designed for radiant, healthy skin.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onShopClick}
                className="bg-[#9CAF88] text-[#FAF7F2] px-8 sm:px-10 py-3 sm:py-3.5 font-['Lora'] text-sm sm:text-base font-medium hover:bg-[#C77956] transition-all duration-350 rounded-lg relative group"
                style={{
                  boxShadow: "0 4px 12px rgba(156, 175, 136, 0.25)",
                }}
              >
                Shop the Collection
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform duration-350">
                  →
                </span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#9CAF88]/10 rounded-full flex items-center justify-center mb-2 border border-[#9CAF88]/20">
                  <svg
                    className="w-6 h-6 text-[#9CAF88]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-['Lora'] text-xs text-[#A8927B] text-center">
                  100%
                  <br />
                  Organic
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#9CAF88]/10 rounded-full flex items-center justify-center mb-2 border border-[#9CAF88]/20">
                  <svg
                    className="w-6 h-6 text-[#9CAF88]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-['Lora'] text-xs text-[#A8927B] text-center">
                  Cruelty
                  <br />
                  Free
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#9CAF88]/10 rounded-full flex items-center justify-center mb-2 border border-[#9CAF88]/20">
                  <svg
                    className="w-6 h-6 text-[#9CAF88]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-['Lora'] text-xs text-[#A8927B] text-center">
                  Eco
                  <br />
                  Friendly
                </span>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative mt-8 md:mt-0">
            {/* Main image with soft border */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1755655618085-e0267f9fbd81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBwcm9kdWN0cyUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3Njk5NDMyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Natural skincare products"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />

              {/* Floating badge */}
              <div
                className="absolute bottom-6 right-6 bg-[#FAF7F2]/95 backdrop-blur-sm px-6 py-3 rounded-lg"
                style={{
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                <p className="font-['Lora'] text-sm text-[#A8927B]">
                  <span className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#C77956] block">
                    98%
                  </span>
                  Natural Ingredients
                </p>
              </div>
            </div>

            {/* Decorative botanical illustration - subtle */}
            <div className="absolute -top-8 -right-8 w-32 h-32 opacity-10">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 10 Q 30 30, 50 50 Q 70 30, 50 10 M50 50 Q 30 70, 50 90 Q 70 70, 50 50"
                  stroke="#9CAF88"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="50" cy="50" r="3" fill="#9CAF88" />
              </svg>
            </div>

            {/* Soft organic blob shapes */}
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#9CAF88] rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Bottom organic wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          width="100%"
          height="60"
          viewBox="0 0 1200 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 Q 150 0, 300 30 T 600 30 T 900 30 T 1200 30 V 60 H 0 Z"
            fill="#FAF7F2"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
}
