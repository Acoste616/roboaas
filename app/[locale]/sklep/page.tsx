'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import Sidebar, { FilterState } from '@/components/Sidebar';
import { fetchProducts } from '@/utils/strapi';

interface Product {
  id: number;
  attributes: {
    name: string;
    slug: string;
    price_eur: number;
    brand: string;
    description_short?: string;
    image?: string;
    gallery?: string[];
  };
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200000],
    selectedBrands: []
  });
  const [compareList, setCompareList] = useState<number[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Extract unique brands and price range
  const { brands, minPrice, maxPrice } = useMemo(() => {
    const brandSet = new Set<string>();
    let min = Infinity;
    let max = 0;

    products.forEach(product => {
      if (product.attributes.brand) brandSet.add(product.attributes.brand);
      if (product.attributes.price_eur < min) min = product.attributes.price_eur;
      if (product.attributes.price_eur > max) max = product.attributes.price_eur;
    });

    return {
      brands: Array.from(brandSet).sort(),
      minPrice: min === Infinity ? 0 : min,
      maxPrice: max || 200000
    };
  }, [products]);

  // Update filter price range when products load
  useEffect(() => {
    if (minPrice !== Infinity && maxPrice > 0) {
      setFilters(prev => ({
        ...prev,
        priceRange: [minPrice, maxPrice]
      }));
    }
  }, [minPrice, maxPrice]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply price filter
    result = result.filter(
      p => p.attributes.price_eur >= filters.priceRange[0] && 
           p.attributes.price_eur <= filters.priceRange[1]
    );

    // Apply brand filter
    if (filters.selectedBrands.length > 0) {
      result = result.filter(p => 
        filters.selectedBrands.includes(p.attributes.brand)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.attributes.price_eur - b.attributes.price_eur;
        case 'price-desc':
          return b.attributes.price_eur - a.attributes.price_eur;
        case 'name':
        default:
          return a.attributes.name.localeCompare(b.attributes.name);
      }
    });

    return result;
  }, [products, filters, sortBy]);

  const handleCompareToggle = (productId: number) => {
    setCompareList(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : prev.length < 3
        ? [...prev, productId]
        : prev
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-neutral-gray">Ładowanie produktów...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 glow-text"
          >
            Katalog Robotów
          </motion.h1>
          <p className="text-xl text-neutral-gray">
            Odkryj najbardziej zaawansowane roboty humanoidalne dostępne w Europie
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Hidden on mobile by default, shown in modal */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar
              brands={brands}
              onFilterChange={setFilters}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-primary-light rounded-lg border border-neutral-gray/20">
              <div className="flex items-center gap-4">
                <span className="text-neutral-gray">
                  <span className="text-accent font-bold">{filteredProducts.length}</span> produktów
                </span>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'grid'
                        ? 'bg-accent text-primary'
                        : 'bg-primary-dark text-neutral-gray hover:text-accent'
                    }`}
                    title="Widok siatki"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'list'
                        ? 'bg-accent text-primary'
                        : 'bg-primary-dark text-neutral-gray hover:text-accent'
                    }`}
                    title="Widok listy"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-neutral-gray text-sm">
                  Sortuj:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-primary-dark border border-neutral-gray/30 rounded-lg text-neutral-light focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="name">Nazwa (A-Z)</option>
                  <option value="price-asc">Cena (rosnąco)</option>
                  <option value="price-desc">Cena (malejąco)</option>
                </select>
              </div>
            </div>

            {/* Compare Bar */}
            <AnimatePresence>
              {compareList.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-between"
                >
                  <span className="text-neutral-light">
                    <span className="font-bold text-accent">{compareList.length}</span> produktów do porównania
                    {compareList.length >= 3 && <span className="ml-2 text-neutral-gray text-sm">(max 3)</span>}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCompareList([])}
                      className="px-4 py-2 bg-primary-dark text-neutral-gray hover:text-accent rounded transition-colors text-sm"
                    >
                      Wyczyść
                    </button>
                    <button className="btn-primary text-sm">
                      Porównaj
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-24 h-24 mx-auto mb-6 text-neutral-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-neutral-light mb-2">Brak produktów</h3>
                <p className="text-neutral-gray mb-6">Nie znaleźliśmy produktów spełniających wybrane kryteria</p>
                <button
                  onClick={() => setFilters({ priceRange: [minPrice, maxPrice], selectedBrands: [] })}
                  className="btn-secondary"
                >
                  Wyczyść filtry
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard
                        product={product}
                        viewMode={viewMode}
                        isInCompare={compareList.includes(product.id)}
                        onToggleCompare={() => handleCompareToggle(product.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
