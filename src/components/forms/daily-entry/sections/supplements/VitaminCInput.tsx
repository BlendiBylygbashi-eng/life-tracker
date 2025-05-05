'use client';

import SupplementCheckbox from './SupplementCheckbox';

interface VitaminCInputProps {
  checked: boolean;
  onChange: () => void;
}

export default function VitaminCInput({ checked, onChange }: VitaminCInputProps) {
  return (
    <SupplementCheckbox
      id="vitaminC"
      checked={checked}
      onChange={onChange}
    />
  );
}
