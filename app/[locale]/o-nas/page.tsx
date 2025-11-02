'use client';

import TimelineItem from '@/components/TimelineItem';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">O EuroBot Hub</h1>
        <p className="text-neutral-gray text-lg max-w-3xl mx-auto">
          Europejskie centrum afiliacyjne robotów humanoidalnych, łączące innowację z zaufaniem i bezpieczeństwem
        </p>
      </div>

      {/* Mission */}
      <div className="card mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Nasza Misja</h2>
            <p className="text-neutral-gray mb-4">
              EuroBot Hub powstał z potrzeby stworzenia zaufanego mośnika pomiędzy producentami robotów humanoidalnych a europejskimi konsumentami. Rozumiemy, że zakup robota za dziesiątki tysięcy euro to decyzja wymagająca pełnej transparentności i eksperckiego wsparcia.
            </p>
            <p className="text-neutral-gray">
              Specjalizujemy się w edukacji konsumentów na temat GDPR, AI Act i rzeczywistych możliwości technologicznych robotów domowych. Naszym celem jest demokratyzacja dostępu do zaawansowanej robotyki poprzez rzetelne informacje i profesjonalne doradztwo.
            </p>
          </div>
          <div className="bg-primary-dark rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <svg className="w-8 h-8 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <h3 className="font-bold mb-2">100% Transparentność</h3>
                  <p className="text-neutral-gray text-sm">
                    Jawnie informujemy o naszych partnerstwach afiliacyjnych
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg className="w-8 h-8 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <div>
                  <h3 className="font-bold mb-2">Edukacja Pierwsza</h3>
                  <p className="text-neutral-gray text-sm">
                    Priorytetem jest wiedza klienta, nie natychmiastowa sprzedaż
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg className="w-8 h-8 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold mb-2">Europejski Fundament</h3>
                  <p className="text-neutral-gray text-sm">
                    Skupienie na potrzebach i regulacjach rynku UE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nasza Historia</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              {
                date: 'Q4 2025',
                title: 'Założenie Firmy',
                description: 'Start projektu EuroBot Hub jako odpowiedź na rosnace zainteresowanie robotyką domową w Europie'
              },
              {
                date: 'Q1 2026',
                title: 'Pierwsze Partnerstwa',
                description: 'Nawiązanie współpracy z kluczowymi producentami robotów (Neura, Unitree, 1X)'
              },
              {
                date: 'Q2 2026',
                title: 'Launch MVP',
                description: 'Uruchomienie platformy edukacyjnej i katalogu produktów'
              },
              {
                date: 'Q3-Q4 2026',
                title: 'Ekspansja',
                description: 'Rozbudowa treści, community Discord i pierwsze 500 leadów'
              },
            ].map((item, index, array) => (
              <TimelineItem
                key={index}
                date={item.date}
                title={item.title}
                description={item.description}
                index={index}
                isLast={index === array.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nasz Zespół</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card text-center">
            <div className="w-24 h-24 rounded-full bg-accent/20 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-accent">RH</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Robohub</h3>
            <p className="text-accent mb-3">Technical Lead & Founder</p>
            <p className="text-neutral-gray text-sm">
              Ekspert w dziedzinie robotyki i AI z doświadczeniem w budowaniu platform technologicznych dla rynku europejskiego.
            </p>
          </div>
          <div className="card text-center">
            <div className="w-24 h-24 rounded-full bg-accent/20 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-accent">EB</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Team</h3>
            <p className="text-accent mb-3">Legal & Compliance Advisors</p>
            <p className="text-neutral-gray text-sm">
              Zespół prawników i audytorów bezpieczeństwa specjalizujących się w GDPR i EU AI Act.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="card">
        <h2 className="text-3xl font-bold mb-8 text-center">Nasze Wartości</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Bezpieczeństwo</h3>
            <p className="text-neutral-gray text-sm">
              Priorytetowo traktujemy ochronę danych osobowych i cybersecurity naszych klientów
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Jakość</h3>
            <p className="text-neutral-gray text-sm">
              Współpracujemy wyłącznie z certyfikowanymi producentami spełniającymi normy UE
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-2">Edukacja</h3>
            <p className="text-neutral-gray text-sm">
              Dzielimy się wiedzą poprzez raporty eksperckie, case studies i webinary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
