'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string || 'pl';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'shop', href: `/${locale}/sklep` },
    { key: 'blog', href: `/${locale}/blog` },
    { key: 'about', href: `/${locale}/o-nas` },
    { key: 'contact', href: `/${locale}/kontakt` },
    { key: 'club', href: `/${locale}/club` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-neutral-gray/10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary font-bold text-xl">EB</span>
            </div>
            <span className="text-xl font-bold text-neutral-light group-hover:text-accent transition-colors">
              {t('site_title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-neutral-light hover:text-accent transition-colors font-medium"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral-light hover:text-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-neutral-gray/10">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-neutral-light hover:text-accent transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
