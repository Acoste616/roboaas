'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark border-t border-neutral-gray/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Transparency */}
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">
              {t('footer.transparency_title')}
            </h3>
            <p className="text-neutral-gray text-sm leading-relaxed">
              {t('footer.transparency_text')}
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">
              {t('footer.links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/o-nas"
                  className="text-neutral-gray hover:text-accent transition-colors text-sm"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-gray hover:text-accent transition-colors text-sm"
                >
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-neutral-gray hover:text-accent transition-colors text-sm"
                >
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="text-neutral-gray hover:text-accent transition-colors text-sm"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/regulamin"
                  className="text-neutral-gray hover:text-accent transition-colors text-sm"
                >
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">
              {t('footer.follow')}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-gray hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-gray hover:text-accent transition-colors"
                aria-label="Twitter/X"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-gray hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-gray/10 pt-8 text-center">
          <p className="text-neutral-gray text-sm">
            © {currentYear} EuroBot Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
