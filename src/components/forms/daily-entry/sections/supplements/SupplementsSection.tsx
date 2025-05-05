'use client';

import CreatineInput from './CreatineInput';
import VitaminCInput from './VitaminCInput';
import VitaminDInput from './VitaminDInput';

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
  const handleSupplementChange = (name: keyof typeof supplements) => {
    onChange({
      ...supplements,
      [name]: !supplements[name]
    });
  };

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/40 to-violet-50/30 border border-purple-100/30">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Supplements</h3>
      <div className="space-y-3">
        <CreatineInput 
          checked={supplements.creatine} 
          onChange={() => handleSupplementChange('creatine')} 
        />
        <VitaminCInput 
          checked={supplements.vitaminC} 
          onChange={() => handleSupplementChange('vitaminC')} 
        />
        <VitaminDInput 
          checked={supplements.vitaminD} 
          onChange={() => handleSupplementChange('vitaminD')} 
        />
      </div>
    </div>
  );
}
