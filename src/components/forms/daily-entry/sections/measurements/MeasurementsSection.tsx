'use client';

import BodyWeightInput from './BodyWeightInput';
import GripStrengthInput from './GripStrengthInput';

interface MeasurementsSectionProps {
  bodyWeight: string;
  gripStrength: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MeasurementsSection({
  bodyWeight,
  gripStrength,
  onChange
}: MeasurementsSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Other Measurements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BodyWeightInput value={bodyWeight} onChange={onChange} />
        <GripStrengthInput value={gripStrength} onChange={onChange} />
      </div>
    </div>
  );
}
