'use client';

export default function ProductSpecs({ specs }: { specs: Record<string, any> }) {
  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6">Specyfikacja Techniczna</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="p-4 bg-primary-dark rounded-lg border border-neutral-gray/10">
            <p className="text-sm text-neutral-gray mb-1 capitalize">{key.replace(/_/g, ' ')}</p>
            <p className="text-lg font-bold text-accent">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
