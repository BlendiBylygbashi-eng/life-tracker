'use client';

import MeasurementInput from './MeasurementInput';

interface BodyWeightInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BodyWeightInput({ value, onChange }: BodyWeightInputProps) {
  return (
    <MeasurementInput
      id="bodyWeight"
      label="Body Weight (lbs)"
      value={value}
      onChange={onChange}
      placeholder="Enter weight in lbs"
    />
  );
}
