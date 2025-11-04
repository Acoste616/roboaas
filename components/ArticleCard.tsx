import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  slug: string;
  description_short: string;
  featured_image: string;
  category: string;
  publishedAt?: string;
  locale: string;
}

export default function ArticleCard({
  title,
  slug,
  description_short,
  featured_image,
  category,
  publishedAt,
  locale
}: ArticleCardProps) {
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  return (
    <Link href={`/${locale}/blog/${slug}`}>
      <article className="card group cursor-pointer h-full flex flex-col hover:border-accent/50 transition-all">
        {/* Featured Image */}
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-primary-dark">
          <Image
            src={featured_image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3 text-neutral-light group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-neutral-gray text-sm mb-4 line-clamp-3 flex-1">
          {description_short}
        </p>

        {/* Date & Read More */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-gray/10">
          <span className="text-xs text-neutral-gray">
            {formattedDate}
          </span>
          <span className="text-accent text-sm font-semibold group-hover:underline flex items-center">
            Czytaj więcej
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
