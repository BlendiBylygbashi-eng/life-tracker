'use client';

interface SupplementsSectionProps {
  supplements: {
    creatine: boolean;
    vitaminC: boolean;
    vitaminD: boolean;
  };
  onChange: (supplements: { creatine: boolean; vitaminC: boolean; vitaminD: boolean }) => void;
}

export default function SupplementsSection({ supplements, onChange }: SupplementsSectionProps) {
  const handleChange = (supplement: 'creatine' | 'vitaminC' | 'vitaminD') => {
    onChange({
      ...supplements,
      [supplement]: !supplements[supplement],
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplements Taken</h3>
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={supplements.creatine}
            onChange={() => handleChange('creatine')}
            className="h-5 w-5 rounded border-gray-300 text-sky-400 focus:ring-sky-400"
          />
          <span className="text-gray-700">Creatine</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={supplements.vitaminC}
            onChange={() => handleChange('vitaminC')}
            className="h-5 w-5 rounded border-gray-300 text-sky-400 focus:ring-sky-400"
          />
          <span className="text-gray-700">Vitamin C</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={supplements.vitaminD}
            onChange={() => handleChange('vitaminD')}
            className="h-5 w-5 rounded border-gray-300 text-sky-400 focus:ring-sky-400"
          />
          <span className="text-gray-700">Vitamin D</span>
        </label>
      </div>
    </div>
  );
}
