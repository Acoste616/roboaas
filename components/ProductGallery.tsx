'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-primary-dark to-primary rounded-lg flex items-center justify-center">
        <svg className="w-48 h-48 text-accent/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const currentImage = images[selectedIndex];

  return (
    <>
      {/* Main Image */}
      <div className="mb-4">
        <motion.div
          layoutId={`product-image-${selectedIndex}`}
          className="relative aspect-square bg-gradient-to-br from-primary-dark to-primary rounded-lg overflow-hidden group cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          <Image
            src={currentImage}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={selectedIndex === 0}
          />
          
          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-semibold text-neutral-light">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                index === selectedIndex
                  ? 'ring-2 ring-accent ring-offset-2 ring-offset-primary'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 p-3 bg-primary-dark rounded-full hover:bg-accent hover:text-primary transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              layoutId={`product-image-${selectedIndex}`}
              className="relative max-w-5xl max-h-[80vh] aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage}
                alt={`${productName} - Fullscreen`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-primary-dark rounded-full hover:bg-accent hover:text-primary transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-primary-dark rounded-full hover:bg-accent hover:text-primary transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
