'use client';

interface LegalComplianceData {
  ai_act_status?: string;
  gdpr_compliant?: boolean;
  ce_mark?: boolean;
  iso_certifications?: string[];
}

interface LegalComplianceInfoProps {
  data: LegalComplianceData;
}

export default function LegalComplianceInfo({ data }: LegalComplianceInfoProps) {
  const {
    ai_act_status = 'Nieznany',
    gdpr_compliant = false,
    ce_mark = false,
    iso_certifications = []
  } = data;

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6 text-neutral-light flex items-center gap-2">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Zgodność Prawna i Certyfikacje
      </h3>

      <div className="space-y-6">
        {/* EU AI Act */}
        <div className="p-4 bg-primary-dark rounded-lg border border-neutral-gray/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-neutral-light mb-1">Status AI Act (UE)</h4>
              <p className="text-sm text-neutral-gray">
                Zgodność z europejskim rozporządzeniem AI Act
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                ai_act_status.toLowerCase().includes('certyfikowany')
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : ai_act_status.toLowerCase().includes('trakcie')
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-neutral-gray/20 text-neutral-gray border border-neutral-gray/30'
              }`}>
                {ai_act_status}
              </span>
            </div>
          </div>
        </div>

        {/* GDPR Compliance */}
        <div className="p-4 bg-primary-dark rounded-lg border border-neutral-gray/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-neutral-light mb-1">GDPR / Ochrona Danych</h4>
              <p className="text-sm text-neutral-gray">
                Zgodność z ogólnym rozporządzeniem o ochronie danych
              </p>
            </div>
            <div className="flex-shrink-0">
              {gdpr_compliant ? (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-semibold">
                  ✓ Zgodny
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-sm font-semibold">
                  ✗ Niezgodny
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CE Mark */}
        <div className="p-4 bg-primary-dark rounded-lg border border-neutral-gray/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-neutral-light mb-1">Znak CE</h4>
              <p className="text-sm text-neutral-gray">
                Certyfikat bezpieczeństwa dla rynku europejskiego
              </p>
            </div>
            <div className="flex-shrink-0">
              {ce_mark ? (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-semibold">
                  ✓ Posiada
                </span>
              ) : (
                <span className="px-3 py-1 bg-neutral-gray/20 text-neutral-gray border border-neutral-gray/30 rounded-full text-sm font-semibold">
                  ✗ Brak
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ISO Certifications */}
        {iso_certifications && iso_certifications.length > 0 && (
          <div className="p-4 bg-primary-dark rounded-lg border border-neutral-gray/20">
            <h4 className="font-semibold text-neutral-light mb-3">Certyfikaty ISO</h4>
            <div className="flex flex-wrap gap-2">
              {iso_certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full text-sm font-semibold"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Important Notice */}
      <div className="mt-6 p-4 bg-accent/5 border-l-4 border-accent rounded">
        <p className="text-sm text-neutral-gray">
          <span className="text-accent font-bold">⚠️ Ważne:</span> 
          {' '}Wszystkie informacje o zgodności prawnej są aktualne na dzień publikacji. 
          Przepisy mogą się zmieniać. Przed zakupem skonsultuj się z naszym działem prawnym.
        </p>
      </div>
    </div>
  );
}
