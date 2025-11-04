import { setRequestLocale, getTranslations } from 'next-intl/server';
import { fetchArticles } from '@/utils/strapi';
import ArticleCard from '@/components/ArticleCard';

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description_short: string;
    featured_image: string;
    content: string;
    publishedAt: string;
    category: string;
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // CRITICAL: Extract locale synchronously for setRequestLocale before any await
  const { locale } = await params;
  
  // Enable static rendering with next-intl - must be called immediately
  setRequestLocale(locale);
  
  // Server-side fetch
  const data = await fetchArticles();
  const articles: Article[] = data?.data || [];

  const t = await getTranslations('blog');

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-neutral-gray text-lg max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.attributes.title}
            slug={article.attributes.slug}
            description_short={article.attributes.description_short}
            featured_image={article.attributes.featured_image}
            category={article.attributes.category}
            publishedAt={article.attributes.publishedAt}
            locale={locale}
          />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-gray text-lg">
            {t('no_articles')}
          </p>
        </div>
      )}
    </div>
  );
}
