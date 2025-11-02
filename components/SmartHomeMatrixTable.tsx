'use client';

interface SmartHomeMatrixData {
  alexa?: 'full' | 'partial' | 'none';
  google_home?: 'full' | 'partial' | 'none';
  homekit?: 'full' | 'partial' | 'none';
}

interface SmartHomeMatrixTableProps {
  data: SmartHomeMatrixData;
}

const compatibilityLabels = {
  full: { text: 'Pełna', color: 'text-green-400', icon: '✓✓' },
  partial: { text: 'Częściowa', color: 'text-yellow-400', icon: '✓' },
  none: { text: 'Brak', color: 'text-neutral-gray', icon: '✗' }
};

export default function SmartHomeMatrixTable({ data }: SmartHomeMatrixTableProps) {
  const systems = [
    { key: 'alexa' as const, name: 'Amazon Alexa' },
    { key: 'google_home' as const, name: 'Google Home' },
    { key: 'homekit' as const, name: 'Apple HomeKit' }
  ];

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6 text-neutral-light flex items-center gap-2">
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Kompatybilność Smart Home
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-gray/20">
              <th className="text-left py-3 px-4 text-neutral-gray font-semibold">System</th>
              <th className="text-left py-3 px-4 text-neutral-gray font-semibold">Kompatybilność</th>
              <th className="text-center py-3 px-4 text-neutral-gray font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {systems.map((system) => {
              const compatibility = data[system.key] || 'none';
              const label = compatibilityLabels[compatibility];
              
              return (
                <tr
                  key={system.key}
                  className="border-b border-neutral-gray/10 hover:bg-accent/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="font-medium text-neutral-light">{system.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${label.color}`}>
                      {label.text}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`text-2xl ${label.color}`}>
                      {label.icon}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <p className="text-sm text-neutral-gray">
          <span className="text-accent font-semibold">ℹ️ Informacja:</span> 
          {' '}Kompatybilność może wymagać dodatkowych aktualizacji oprogramowania lub konfiguracji.
        </p>
      </div>
    </div>
  );
}
