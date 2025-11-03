import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { fetchProducts, fetchProductBySlug } from '@/utils/strapi';
import ScaleVisualization from '@/components/ScaleVisualization';
import SmartHomeMatrixTable from '@/components/SmartHomeMatrixTable';
import LegalComplianceInfo from '@/components/LegalComplianceInfo';
import AuditRequestForm from '@/components/AuditRequestForm';
import ProductGallery from '@/components/ProductGallery';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  const response = await fetchProducts();
  const products = response.data || [];
  
  const locales = ['pl', 'en', 'de'];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach(locale => {
    products.forEach((product: any) => {
      params.push({
        locale,
        slug: product.attributes.slug
      });
    });
  });

  return params;
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  
  // Enable static rendering with next-intl - must be called before any async operations
  setRequestLocale(locale);
  
  const response = await fetchProductBySlug(slug);
  
  if (!response || !response.data) {
    notFound();
  }

  const product = response.data;

  const {
    name,
    description_full,
    price_eur,
    brand,
    gallery,
    robot_height_cm,
    specs_table,
    smart_home_matrix,
    legal_compliance
  } = product.attributes;

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-sm text-neutral-gray mb-8">
          <Link href={`/${locale}`} className="hover:text-accent transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/sklep`} className="hover:text-accent transition-colors">
            Sklep
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-light">{name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <ProductGallery images={gallery || []} productName={name} />
          </div>

          {/* Product Info */}
          <div>
            {brand && (
              <p className="text-accent font-semibold mb-2">{brand}</p>
            )}
            <h1 className="text-5xl font-bold mb-6 text-neutral-light glow-text">
              {name}
            </h1>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <p className="text-5xl font-bold text-accent">
                  €{price_eur.toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-neutral-gray">
                + transport i instalacja
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm font-semibold">
                ✓ CE Mark
              </span>
              <span className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm font-semibold">
                ✓ GDPR Compliant
              </span>
              <span className="px-4 py-2 bg-accent/20 text-accent border border-accent/30 rounded-lg text-sm font-semibold">
                ✓ 2 lata gwarancji
              </span>
            </div>

            {/* Quick Specs */}
            {specs_table && (
              <div className="card mb-8">
                <h3 className="text-xl font-bold mb-4 text-neutral-light">Kluczowe Specyfikacje</h3>
                <div className="grid grid-cols-2 gap-4">
                  {specs_table.dof && (
                    <div className="p-3 bg-primary-dark rounded">
                      <p className="text-neutral-gray text-sm mb-1">Stopnie swobody</p>
                      <p className="text-accent font-bold text-lg">{specs_table.dof} DoF</p>
                    </div>
                  )}
                  {specs_table.battery_kwh && (
                    <div className="p-3 bg-primary-dark rounded">
                      <p className="text-neutral-gray text-sm mb-1">Bateria</p>
                      <p className="text-accent font-bold text-lg">{specs_table.battery_kwh} kWh</p>
                    </div>
                  )}
                  {specs_table.payload_kg && (
                    <div className="p-3 bg-primary-dark rounded">
                      <p className="text-neutral-gray text-sm mb-1">Udźwig</p>
                      <p className="text-accent font-bold text-lg">{specs_table.payload_kg} kg</p>
                    </div>
                  )}
                  {specs_table.speed_ms && (
                    <div className="p-3 bg-primary-dark rounded">
                      <p className="text-neutral-gray text-sm mb-1">Prędkość</p>
                      <p className="text-accent font-bold text-lg">{specs_table.speed_ms} m/s</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="p-6 bg-accent/5 border-2 border-accent/30 rounded-lg">
              <p className="text-lg text-neutral-light mb-4">
                🎯 <strong>Zainteresowany tym modelem?</strong> Wypełnij formularz audytu poniżej - nasz ekspert skontaktuje się w ciągu 24h.
              </p>
              <Link href="#audit-form" className="btn-primary w-full text-center block">
                Zapytaj o Audyt
              </Link>
            </div>
          </div>
        </div>

        {/* Description */}
        {description_full && (
          <div className="mb-16">
            <div className="card">
              <div
                className="prose prose-invert prose-accent max-w-none"
                dangerouslySetInnerHTML={{ __html: description_full }}
              />
            </div>
          </div>
        )}

        {/* Interactive Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Scale Visualization */}
          {robot_height_cm && (
            <ScaleVisualization robotHeight={robot_height_cm} />
          )}

          {/* Smart Home Matrix */}
          {smart_home_matrix && (
            <SmartHomeMatrixTable data={smart_home_matrix} />
          )}
        </div>

        {/* Legal Compliance */}
        {legal_compliance && (
          <div className="mb-16">
            <LegalComplianceInfo data={legal_compliance} />
          </div>
        )}

        {/* Audit Request Form */}
        <div id="audit-form" className="max-w-3xl mx-auto">
          <AuditRequestForm productName={name} />
        </div>
      </div>
    </main>
  );
}
