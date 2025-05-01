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
    <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50/40 to-purple-50/30 border border-violet-100/30 backdrop-blur-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Supplements Taken</h3>
      <div className="space-y-4">
        {[
          { id: 'creatine', label: 'Creatine', checked: supplements.creatine },
          { id: 'vitaminC', label: 'Vitamin C', checked: supplements.vitaminC },
          { id: 'vitaminD', label: 'Vitamin D', checked: supplements.vitaminD },
        ].map(({ id, label, checked }) => (
          <label 
            key={id} 
            className="flex items-center p-3 rounded-lg bg-white/40 hover:bg-white/60 border border-black/20 transition-all duration-300 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleChange(id as any)}
              className="h-5 w-5 rounded-md border-violet-200 text-violet-500 focus:ring-violet-500 transition-colors"
            />
            <span className="ml-3 text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
