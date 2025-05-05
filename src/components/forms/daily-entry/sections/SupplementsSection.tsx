'use client';

interface SupplementsSectionProps {
  supplements: {
    creatine: boolean;
    vitaminC: boolean;
    vitaminD: boolean;
  };
  onChange: (supplements: {
    creatine: boolean;
    vitaminC: boolean;
    vitaminD: boolean;
  }) => void;
}

export default function SupplementsSection({
  supplements,
  onChange
}: SupplementsSectionProps) {
  const handleCheckboxChange = (name: keyof typeof supplements) => {
    onChange({
      ...supplements,
      [name]: !supplements[name]
    });
  };

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/40 to-violet-50/30 border border-purple-100/30">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Supplements</h3>
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={supplements.creatine}
            onChange={() => handleCheckboxChange('creatine')}
            className="w-5 h-5 text-purple-600 rounded border-gray-300 
              focus:ring-purple-500 focus:ring-2 focus:ring-offset-0"
          />
          <span className="text-gray-700">Creatine</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={supplements.vitaminC}
            onChange={() => handleCheckboxChange('vitaminC')}
            className="w-5 h-5 text-purple-600 rounded border-gray-300 
              focus:ring-purple-500 focus:ring-2 focus:ring-offset-0"
          />
          <span className="text-gray-700">Vitamin C</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={supplements.vitaminD}
            onChange={() => handleCheckboxChange('vitaminD')}
            className="w-5 h-5 text-purple-600 rounded border-gray-300 
              focus:ring-purple-500 focus:ring-2 focus:ring-offset-0"
          />
          <span className="text-gray-700">Vitamin D</span>
        </label>
      </div>
    </div>
  );
}
