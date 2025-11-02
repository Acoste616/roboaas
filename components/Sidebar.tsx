'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  brands: string[];
  onFilterChange: (filters: FilterState) => void;
  minPrice: number;
  maxPrice: number;
}

export interface FilterState {
  priceRange: [number, number];
  selectedBrands: string[];
}

export default function Sidebar({ brands, onFilterChange, minPrice, maxPrice }: SidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onFilterChange({ priceRange, selectedBrands });
  }, [priceRange, selectedBrands]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const newRange: [number, number] = [...priceRange] as [number, number];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
  };

  const hasActiveFilters = selectedBrands.length > 0 || 
    priceRange[0] !== minPrice || 
    priceRange[1] !== maxPrice;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 btn-primary px-6 py-3 rounded-full shadow-2xl shadow-accent/50"
      >
        <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtry
        {hasActiveFilters && (
          <span className="ml-2 px-2 py-0.5 bg-primary text-accent rounded-full text-xs font-bold">
            {selectedBrands.length + (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-primary/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          lg:sticky lg:top-24 lg:self-start
          fixed lg:relative top-0 left-0 h-screen lg:h-auto w-80 lg:w-full
          bg-primary-light lg:bg-transparent 
          border-r lg:border-r-0 lg:border border-neutral-gray/20 lg:rounded-lg
          p-6 overflow-y-auto z-40 lg:z-auto
          transition-transform duration-300 lg:transition-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between mb-6 lg:mb-4">
          <h2 className="text-2xl lg:text-xl font-bold text-neutral-light flex items-center gap-2">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtry
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-neutral-gray hover:text-accent transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="mb-6 w-full px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
          >
            Wyczyść wszystkie filtry
          </button>
        )}

        {/* Price Range Filter */}
        <div className="mb-8 pb-8 border-b border-neutral-gray/20">
          <h3 className="text-lg font-semibold text-neutral-light mb-4">Przedział Cenowy</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-gray mb-2">
                Min: €{priceRange[0].toLocaleString()}
              </label>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={1000}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full h-2 bg-primary-dark rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-gray mb-2">
                Max: €{priceRange[1].toLocaleString()}
              </label>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={1000}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full h-2 bg-primary-dark rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <div className="flex items-center justify-between pt-2 text-sm text-neutral-gray">
              <span>€{priceRange[0].toLocaleString()}</span>
              <span>—</span>
              <span>€{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-neutral-light mb-4">Producent</h3>
          
          <div className="space-y-3">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="sr-only"
                  />
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                    ${selectedBrands.includes(brand)
                      ? 'bg-accent border-accent'
                      : 'border-neutral-gray/50 group-hover:border-accent'
                    }
                  `}>
                    {selectedBrands.includes(brand) && (
                      <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-neutral-light group-hover:text-accent transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <p className="text-sm text-neutral-gray">
            <span className="text-accent font-semibold">💡 Wskazówka:</span> Wszystkie roboty posiadają certyfikację CE i są zgodne z GDPR.
          </p>
        </div>
      </aside>
    </>
  );
}
