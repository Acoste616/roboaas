import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { fetchArticles, fetchArticleBySlug } from '@/utils/strapi';

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await fetchArticles();
  const locales = ['pl', 'en', 'de'];
  
  const paths = [];
  for (const locale of locales) {
    for (const article of articles.data) {
      paths.push({
        locale,
        slug: article.attributes.slug,
      });
    }
  }
  
  return paths;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  // CRITICAL: Extract locale synchronously for setRequestLocale before any await
  const { locale } = await params;
  
  // Enable static rendering with next-intl - must be called immediately
  setRequestLocale(locale);
  
  // Now we can safely destructure the rest
  const { slug } = await params;

  // Fetch article from Strapi by slug
  const response = await fetchArticleBySlug(slug, locale);
  const allArticles = await fetchArticles(locale); // For related articles
  
  if (!response || !response.data) {
    notFound();
  }
  
  const article = response.data;

  const { title, content, category, description_short, featured_image } = article.attributes;
  const publishedDate = article.attributes.publishedAt || article.attributes.createdAt || new Date().toISOString();

  const t = await getTranslations('blog');
  const tNav = await getTranslations('nav');

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-gray">
          <Link href={`/${locale}`} className="hover:text-accent">{tNav('home')}</Link>
          {' > '}
          <Link href={`/${locale}/blog`} className="hover:text-accent">{tNav('blog')}</Link>
          {' > '}
          <span className="text-neutral-light">{title}</span>
        </nav>

        {/* Article Header */}
        <article>
          <div className="mb-8">
            <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full">
              {category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

          {/* Featured Image */}
          {featured_image && (
            <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg">
              <Image
                src={featured_image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-neutral-gray/10">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-neutral-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-neutral-gray text-sm">
                {new Date(publishedDate).toLocaleDateString('pl-PL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-neutral-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-neutral-gray text-sm">5 {t('min_read')}</span>
            </div>
          </div>

          {/* Article Content with Prose Styling */}
          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-neutral-light prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-neutral-gray prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-accent prose-strong:font-semibold
              prose-ul:text-neutral-gray prose-ul:my-6
              prose-ol:text-neutral-gray prose-ol:my-6
              prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-light
              prose-table:text-neutral-gray prose-table:my-8
              prose-th:bg-accent/10 prose-th:text-accent prose-th:font-semibold prose-th:p-3
              prose-td:border prose-td:border-neutral-gray/20 prose-td:p-3
              prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* CTA Section */}
          <div className="mt-16 card bg-primary-dark">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                {t('want_more')}
              </h3>
              <p className="text-neutral-gray mb-6">
                {t('download_report_cta')}
              </p>
              <Link href={`/${locale}#report-form`} className="btn-primary inline-block">
                {t('want_more')}
              </Link>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mt-12 flex items-center justify-center space-x-4">
            <span className="text-neutral-gray">{t('share')}:</span>
            <button className="w-10 h-10 rounded-full bg-primary-dark hover:bg-accent hover:text-primary transition-all flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-primary-dark hover:bg-accent hover:text-primary transition-all flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">{t('related')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allArticles.data
              .filter((a: any) => a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle: any) => (
                <Link
                  key={relatedArticle.id}
                  href={`/${locale}/blog/${relatedArticle.attributes.slug}`}
                  className="card group cursor-pointer"
                >
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full inline-block mb-3">
                    {relatedArticle.attributes.category}
                  </span>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {relatedArticle.attributes.title}
                  </h4>
                  <span className="text-accent text-sm font-semibold">
                    {t('read_more')} →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
