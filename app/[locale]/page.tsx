import { useTranslations } from 'next-intl';
import Image from 'next/image';
import JakDzialamyGrafika from '@/components/JakDzialamyGrafika';
import ReportDownloadForm from '@/components/ReportDownloadForm';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/xvjWEJYrNhg2Jvo97muHic.jpg"
            alt="Robot humanoidalny w domu"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 via-primary-dark/70 to-primary/95"></div>
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-light mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <a href="#report-form" className="btn-primary inline-block text-lg px-8 py-4">
            {t('hero.cta')}
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Jak Działamy Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-neutral-light">
            {t('how_we_work.title')}
          </h2>
          <p className="text-center text-neutral-gray mb-12 max-w-2xl mx-auto">
            Poznaj nasz transparentny proces doboru i weryfikacji robotów humanoidalnych
          </p>
          <JakDzialamyGrafika />
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-20 bg-primary-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="card">
              <div className="text-accent text-4xl font-bold mb-2">100%</div>
              <p className="text-neutral-gray">Zgodność z GDPR</p>
            </div>
            <div className="card">
              <div className="text-accent text-4xl font-bold mb-2">24/7</div>
              <p className="text-neutral-gray">Wsparcie Eksperckie</p>
            </div>
            <div className="card">
              <div className="text-accent text-4xl font-bold mb-2">3+</div>
              <p className="text-neutral-gray">Partnerów Producentów</p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Download Form Section */}
      <section id="report-form" className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <ReportDownloadForm />
        </div>
      </section>

      {/* Product Teaser Section */}
      <section className="py-20 bg-primary-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-neutral-light">
            Popularne Modele Robotów
          </h2>
          <p className="text-center text-neutral-gray mb-12 max-w-2xl mx-auto">
            Starannie wyselekcjonowane roboty humanoidalne z certyfikatami CE i zgodne z GDPR
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Tesla Optimus Gen 3', price: '€20,000', image: '/images/xvjWEJYrNhg2Jvo97muHic.jpg', brand: 'Tesla', slug: 'tesla-optimus-gen-3' },
              { name: '1X Neo', price: '€20,000', image: '/images/NEO-Gamma_Breakfast.webp', brand: '1X', slug: '1x-neo' },
              { name: 'Figure 02', price: '€85,000', image: '/images/Figure-03-humanoid-robots-Figure-AI-07.webp', brand: 'Figure AI', slug: 'figure-02' },
            ].map((robot, index) => (
              <a key={index} href={`/pl/sklep/${robot.slug}`} className="card group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="relative h-64 bg-primary rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={robot.image}
                    alt={robot.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-accent text-primary-dark text-xs font-bold rounded-full">
                      {robot.brand}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral-light group-hover:text-accent transition-colors">
                  {robot.name}
                </h3>
                <p className="text-2xl font-bold text-accent mb-4">{robot.price}</p>
                <span className="btn-secondary w-full block text-center">Zobacz Szczegóły</span>
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/pl/sklep" className="btn-primary inline-block text-lg px-8 py-4">
              Zobacz Wszystkie Roboty →
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-neutral-light">
            Co Mówią Nasi Klienci
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  MK
                </div>
                <div>
                  <p className="text-neutral-gray mb-4 italic">
                    "Ten raport o GDPR był dokładnie tym, czego potrzebowałem, aby zrozumieć ryzyko związane z robotem w domu."
                  </p>
                  <p className="text-neutral-light font-semibold">Dr. M. Kowalski</p>
                  <p className="text-neutral-gray text-sm">Inwestor Tech, Warszawa</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  AS
                </div>
                <div>
                  <p className="text-neutral-gray mb-4 italic">
                    "Profesjonalne podejście i szczegółowe porównania pomogły mi wybrać idealny model dla mojej rodziny."
                  </p>
                  <p className="text-neutral-light font-semibold">Anna Schmidt</p>
                  <p className="text-neutral-gray text-sm">Przedsiębiorca, Berlin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
