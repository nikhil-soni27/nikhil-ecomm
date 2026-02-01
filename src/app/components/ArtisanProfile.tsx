import React from 'react';
import { ChevronLeft, MapPin, Star, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import type { Product } from '@/app/App';

interface ArtisanProfileProps {
  artisanId: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onBackClick: () => void;
}

export function ArtisanProfile({
  artisanId,
  products,
  onProductClick,
  onBackClick
}: ArtisanProfileProps) {
  // Get artisan info from first product
  const artisan = products[0]?.artisan;
  
  if (!artisan) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-['Amatic_SC'] text-3xl text-[#3A5A40]">Artisan not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="flex items-center space-x-2 mb-8 text-[#3A5A40] hover:text-[#D4703B] transition-colors duration-300"
        >
          <ChevronLeft size={20} />
          <span className="font-['Josefin_Sans'] text-sm">Back to Shop</span>
        </button>

        {/* Artisan Header */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-12"
             style={{
               border: '4px solid #D4703B',
               borderRadius: '40px 10px 40px 10px'
             }}>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <ImageWithFallback
              src={artisan.avatar}
              alt={artisan.name}
              className="w-32 h-32 rounded-full object-cover"
              style={{
                border: '4px solid #D4703B'
              }}
            />

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="font-['Amatic_SC'] text-6xl font-bold text-[#3A5A40] mb-2">
                    {artisan.name}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-[#3A5A40]/70">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} className="text-[#D4703B]" />
                      <span className="font-['Josefin_Sans'] text-sm">
                        {products[0]?.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-[#D4703B] fill-current" />
                      <span className="font-['Josefin_Sans'] text-sm">
                        4.9 (127 reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <button className="mt-4 md:mt-0 bg-[#D4703B] text-[#FFF8E7] px-6 py-3 rounded-lg font-['Josefin_Sans'] font-medium hover:bg-[#3A5A40] transition-colors duration-300 flex items-center space-x-2"
                        style={{
                          border: '2px solid #3A5A40',
                          borderRadius: '15px 5px 15px 5px'
                        }}>
                  <MessageCircle size={18} />
                  <span>Message Artisan</span>
                </button>
              </div>

              {/* Bio */}
              <div className="bg-[#F4ACB7]/10 p-6 rounded-xl"
                   style={{
                     border: '2px dashed #D4703B',
                     borderRadius: '20px 5px 20px 5px'
                   }}>
                <h3 className="font-['Josefin_Sans'] font-semibold text-[#3A5A40] mb-3">
                  About {artisan.name.split(' ')[0]}
                </h3>
                <p className="font-['Josefin_Sans'] text-sm text-[#3A5A40]/80 leading-relaxed">
                  I'm a passionate artisan dedicated to creating unique, handcrafted pieces that bring joy and beauty into everyday life. 
                  Each item is made with care, using traditional techniques and sustainable materials. Thank you for supporting independent artists!
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-xl text-center"
                     style={{
                       border: '2px solid #3A5A40/20',
                       borderRadius: '15px 5px 15px 5px'
                     }}>
                  <p className="font-['Amatic_SC'] text-3xl font-bold text-[#D4703B]">
                    {products.length}
                  </p>
                  <p className="font-['Josefin_Sans'] text-xs text-[#3A5A40]/70">
                    Products
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl text-center"
                     style={{
                       border: '2px solid #3A5A40/20',
                       borderRadius: '15px 5px 15px 5px'
                     }}>
                  <p className="font-['Amatic_SC'] text-3xl font-bold text-[#D4703B]">
                    250+
                  </p>
                  <p className="font-['Josefin_Sans'] text-xs text-[#3A5A40]/70">
                    Sales
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl text-center"
                     style={{
                       border: '2px solid #3A5A40/20',
                       borderRadius: '15px 5px 15px 5px'
                     }}>
                  <p className="font-['Amatic_SC'] text-3xl font-bold text-[#D4703B]">
                    5.0
                  </p>
                  <p className="font-['Josefin_Sans'] text-xs text-[#3A5A40]/70">
                    Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="font-['Amatic_SC'] text-5xl font-bold text-[#3A5A40] mb-8 text-center">
            Handcrafted by {artisan.name.split(' ')[0]}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                style={{
                  border: '3px solid #3A5A40',
                  borderRadius: '20px 5px 20px 5px'
                }}
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-['Amatic_SC'] text-2xl font-bold text-[#3A5A40] mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="font-['Amatic_SC'] text-3xl font-bold text-[#D4703B]">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-[#D4703B] fill-current" />
                      <span className="font-['Josefin_Sans'] text-sm text-[#3A5A40]">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
