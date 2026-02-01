import React from 'react';
import { Leaf, Heart, Users, Award } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <div className="bg-gradient-to-br from-[#9CAF88] to-[#C77956] text-[#FFF8E7] py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-['Amatic_SC'] text-4xl md:text-6xl font-bold mb-6">
            About Natura
          </h1>
          <p className="font-['Josefin_Sans'] text-lg md:text-xl leading-relaxed">
            Connecting artisans with conscious consumers through handcrafted, sustainable goods
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="font-['Amatic_SC'] text-4xl md:text-5xl font-bold text-[#3A5A40] mb-4 md:mb-6">
              Our Story
            </h2>
            <p className="font-['Lora'] text-base md:text-lg text-[#3A5A40]/80 leading-relaxed mb-4 md:mb-6">
              Natura was born from a simple belief: that every handmade item tells a story, and every purchase can make a difference. Founded in 2020, we've been working tirelessly to create a marketplace that celebrates craftsmanship, sustainability, and the human connection behind every product.
            </p>
            <p className="font-['Lora'] text-base md:text-lg text-[#3A5A40]/80 leading-relaxed">
              We partner with artisans from around the world who share our commitment to quality, ethics, and environmental responsibility. Each piece in our collection is carefully curated to ensure it meets our standards for craftsmanship and sustainability.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FucyUyMHdvcmtpbmd8ZW58MXx8fHwxNzY5OTQwMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Artisans working"
              className="rounded-lg shadow-lg w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-[#FAF7F2] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-['Amatic_SC'] text-4xl md:text-5xl font-bold text-[#3A5A40] text-center mb-8 md:mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="bg-[#9CAF88] w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Leaf className="text-[#FFF8E7] w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="font-['Josefin_Sans'] text-lg md:text-xl font-semibold text-[#3A5A40] mb-2 md:mb-3">
                Sustainability
              </h3>
              <p className="font-['Lora'] text-sm md:text-base text-[#3A5A40]/80">
                We prioritize eco-friendly materials and ethical production practices that respect our planet.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#C77956] w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Heart className="text-[#FFF8E7] w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="font-['Josefin_Sans'] text-lg md:text-xl font-semibold text-[#3A5A40] mb-2 md:mb-3">
                Craftsmanship
              </h3>
              <p className="font-['Lora'] text-sm md:text-base text-[#3A5A40]/80">
                Every item is handcrafted with care, skill, and attention to detail by talented artisans.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F4ACB7] w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Users className="text-[#FFF8E7] w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="font-['Josefin_Sans'] text-lg md:text-xl font-semibold text-[#3A5A40] mb-2 md:mb-3">
                Community
              </h3>
              <p className="font-['Lora'] text-sm md:text-base text-[#3A5A40]/80">
                We build meaningful connections between artisans, customers, and communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwbWFya2V0fGVufDF8fHx8MTc2OTk0MDA2NHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Artisan marketplace"
              className="rounded-lg shadow-lg w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div>
            <h2 className="font-['Amatic_SC'] text-4xl md:text-5xl font-bold text-[#3A5A40] mb-4 md:mb-6">
              Our Impact
            </h2>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3 md:space-x-4">
                <Award className="text-[#9CAF88] w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-['Josefin_Sans'] text-base md:text-lg font-semibold text-[#3A5A40]">
                    Supporting 500+ Artisans
                  </h3>
                  <p className="font-['Lora'] text-sm md:text-base text-[#3A5A40]/80">
                    We've helped over 500 artisans establish sustainable livelihoods through our platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <Award className="text-[#9CAF88] w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-['Josefin_Sans'] text-base md:text-lg font-semibold text-[#3A5A40]">
                    Carbon Neutral Shipping
                  </h3>
                  <p className="font-['Lora'] text-sm md:text-base text-[#3A5A40]/80">
                    All our shipping partners are committed to carbon-neutral delivery options.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <Award className="text-[#9CAF88] w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-['Josefin_Sans'] text-base md:text-lg font-semibold text-[#3A5A40]">
                    Fair Trade Certified
                  </h3>
                  <p className="font-['Lora'] text-sm md:text-base text-[#3A5A40]/80">
                    We ensure fair wages and ethical working conditions for all our partner artisans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#3A5A40] text-[#FFF8E7] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-['Amatic_SC'] text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Join Our Community
          </h2>
          <p className="font-['Josefin_Sans'] text-lg md:text-xl mb-6 md:mb-8">
            Discover unique handcrafted items and support artisans making a difference.
          </p>
          <button
            onClick={() => onNavigate('shop-all')}
            className="bg-[#D4703B] text-[#FFF8E7] px-6 md:px-8 py-3 md:py-4 rounded-lg font-['Josefin_Sans'] text-base md:text-lg font-medium hover:bg-[#F4ACB7] transition-colors duration-300 shadow-lg"
            style={{
              border: '3px solid #FFF8E7',
              borderRadius: '20px 5px 20px 5px'
            }}
          >
            Shop Our Collection →
          </button>
        </div>
      </div>
    </div>
  );
}