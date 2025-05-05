'use client';

import MeasurementInput from './MeasurementInput';

interface GripStrengthInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function GripStrengthInput({ value, onChange }: GripStrengthInputProps) {
  return (
    <MeasurementInput
      id="gripStrength"
      label="Grip Strength"
      value={value}
      onChange={onChange}
      unit="kg"
    />
  );
}
