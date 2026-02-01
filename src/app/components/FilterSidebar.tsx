import React from 'react';
import { Slider } from '@/app/components/ui/slider';
import { Leaf } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  materials: string[];
  selectedCategory: string;
  selectedMaterial: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onMaterialChange: (material: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
}

export function FilterSidebar({
  categories,
  materials,
  selectedCategory,
  selectedMaterial,
  priceRange,
  onCategoryChange,
  onMaterialChange,
  onPriceRangeChange
}: FilterSidebarProps) {
  return (
    <div className="w-72 bg-[#FAF7F2] rounded-xl p-6 h-fit sticky top-24"
         style={{
           boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
         }}>
      <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#A8927B] mb-6">
        Refine
      </h3>

      {/* Skin Concerns / Categories */}
      <div className="mb-8">
        <h4 className="font-['Lora'] text-base font-semibold text-[#A8927B] mb-4">
          Skin Concerns
        </h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-4 py-2 rounded-lg font-['Lora'] text-sm transition-all duration-350 ${
                selectedCategory === category
                  ? 'bg-[#9CAF88] text-[#FAF7F2]'
                  : 'bg-white/50 text-[#A8927B] hover:bg-[#9CAF88]/10'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredients / Materials */}
      <div className="mb-8">
        <h4 className="font-['Lora'] text-base font-semibold text-[#A8927B] mb-4">
          Key Ingredients
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {materials.map((material) => (
            <button
              key={material}
              onClick={() => onMaterialChange(material)}
              className={`w-full text-left px-4 py-2 rounded-lg font-['Lora'] text-sm transition-all duration-350 ${
                selectedMaterial === material
                  ? 'bg-[#C77956] text-[#FAF7F2]'
                  : 'bg-white/50 text-[#A8927B] hover:bg-[#9CAF88]/10'
              }`}
            >
              {material.charAt(0).toUpperCase() + material.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-['Lora'] text-base font-semibold text-[#A8927B] mb-4">
          Price Range
        </h4>
        <div className="px-2">
          <Slider
            min={0}
            max={200}
            step={5}
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex items-center justify-between">
            <span className="font-['Lora'] text-sm text-[#A8927B]">
              ${priceRange[0]}
            </span>
            <span className="font-['Lora'] text-sm text-[#A8927B]">
              ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-8">
        <h4 className="font-['Lora'] text-base font-semibold text-[#A8927B] mb-4">
          Certifications
        </h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#9CAF88] border border-[#A8927B]/30 rounded focus:ring-[#9CAF88]"
            />
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-[#9CAF88]" strokeWidth={2} />
              <span className="font-['Lora'] text-sm text-[#A8927B]">
                Organic
              </span>
            </div>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#9CAF88] border border-[#A8927B]/30 rounded focus:ring-[#9CAF88]"
            />
            <span className="font-['Lora'] text-sm text-[#A8927B]">
              Vegan
            </span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#9CAF88] border border-[#A8927B]/30 rounded focus:ring-[#9CAF88]"
            />
            <span className="font-['Lora'] text-sm text-[#A8927B]">
              Cruelty-Free
            </span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#9CAF88] border border-[#A8927B]/30 rounded focus:ring-[#9CAF88]"
            />
            <span className="font-['Lora'] text-sm text-[#A8927B]">
              Eco-Friendly
            </span>
          </label>
        </div>
      </div>

      {/* Sustainability Info */}
      <div className="bg-[#9CAF88]/10 p-4 rounded-lg border border-[#9CAF88]/20">
        <div className="flex items-center space-x-2 mb-2">
          <Leaf className="w-5 h-5 text-[#9CAF88]" strokeWidth={2} />
          <p className="font-['Lora'] text-sm font-semibold text-[#9CAF88]">
            Sustainable Beauty
          </p>
        </div>
        <p className="font-['Lora'] text-xs text-[#A8927B]">
          All products made with natural, responsibly sourced ingredients
        </p>
      </div>
    </div>
  );
}
