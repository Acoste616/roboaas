'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  attributes: {
    name: string;
    slug: string;
    price_eur: number;
    description_short?: string;
    brand?: string;
    image?: string;
    gallery?: string[];
    gallery_images?: any;
  };
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  isInCompare?: boolean;
  onToggleCompare?: () => void;
}

export default function ProductCard({ 
  product, 
  viewMode = 'grid',
  isInCompare = false,
  onToggleCompare 
}: ProductCardProps) {
  const params = useParams();
  const locale = params.locale as string;
  const { name, slug, price_eur, brand, description_short, image } = product.attributes;

  if (viewMode === 'list') {
    return (
      <div className="card group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        
        <div className="relative flex flex-col md:flex-row gap-6">
          {/* Image */}
          <Link href={`/${locale}/sklep/${slug}`} className="flex-shrink-0">
            <div className="w-full md:w-64 h-48 bg-primary-dark rounded-lg overflow-hidden group-hover:shadow-2xl group-hover:shadow-accent/20 transition-all duration-500 relative">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg 
                    className="w-32 h-32 text-accent/20 group-hover:text-accent/40 group-hover:scale-110 transition-all duration-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={0.5} 
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
              )}
            </div>
          </Link>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {brand && (
                <p className="text-sm font-semibold text-accent mb-2">{brand}</p>
              )}
              <Link href={`/${locale}/sklep/${slug}`}>
                <h3 className="text-2xl font-bold mb-3 text-neutral-light group-hover:text-accent transition-colors">
                  {name}
                </h3>
              </Link>
              {description_short && (
                <p className="text-neutral-gray mb-4 line-clamp-2">{description_short}</p>
              )}
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                  ✓ CE Mark
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                  ✓ GDPR
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                  ✓ 2Y Gwarancja
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-3xl font-bold text-accent">
                  €{price_eur.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-gray">+ transport i instalacja</p>
              </div>
              
              <div className="flex gap-2">
                {onToggleCompare && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleCompare();
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isInCompare 
                        ? 'bg-accent text-primary' 
                        : 'bg-primary-dark text-neutral-light hover:bg-accent/10 border border-neutral-gray/30'
                    }`}
                  >
                    {isInCompare ? '✓ W Porównaniu' : 'Porównaj'}
                  </button>
                )}
                <Link href={`/${locale}/sklep/${slug}`} className="btn-primary">
                  Zobacz Szczegóły
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="card group cursor-pointer h-full flex flex-col relative overflow-hidden">
        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <Link href={`/${locale}/sklep/${slug}`} className="relative">
          {/* Brand Badge */}
          {brand && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-primary/90 backdrop-blur-sm border border-accent/30 rounded-full">
              <span className="text-accent text-xs font-semibold">{brand}</span>
            </div>
          )}

          {/* Compare Checkbox */}
          {onToggleCompare && (
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleCompare();
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isInCompare
                    ? 'bg-accent text-primary'
                    : 'bg-primary/90 backdrop-blur-sm border border-neutral-gray/30 text-neutral-gray hover:border-accent hover:text-accent'
                }`}
              >
                {isInCompare ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </button>
            </div>
          )}

          {/* Product Image */}
          <div className="relative h-80 bg-gradient-to-br from-primary-dark to-primary rounded-lg mb-4 overflow-hidden group-hover:shadow-2xl group-hover:shadow-accent/20 transition-all duration-500">
            {image ? (
              <>
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.svg 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-48 h-48 text-accent/20 group-hover:text-accent/40 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={0.5} 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </motion.svg>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex-1 flex flex-col relative">
          <Link href={`/${locale}/sklep/${slug}`}>
            <h3 className="text-xl font-bold mb-2 text-neutral-light group-hover:text-accent transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          
          {description_short && (
            <p className="text-neutral-gray text-sm mb-4 line-clamp-2">
              {description_short}
            </p>
          )}

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded">
              ✓ CE
            </span>
            <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded">
              ✓ GDPR
            </span>
            <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded">
              ✓ 2Y
            </span>
          </div>

          <div className="mt-auto">
            <div className="mb-4">
              <p className="text-3xl font-bold text-accent mb-1">
                €{price_eur.toLocaleString()}
              </p>
              <p className="text-xs text-neutral-gray">+ transport</p>
            </div>
            
            <Link href={`/${locale}/sklep/${slug}`} className="btn-primary w-full text-center block group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/50 transition-all duration-300">
              Zobacz Szczegóły
              <svg className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
