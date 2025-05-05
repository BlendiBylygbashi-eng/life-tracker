'use client';

import SupplementCheckbox from './SupplementCheckbox';

interface VitaminDInputProps {
  checked: boolean;
  onChange: () => void;
}

export default function VitaminDInput({ checked, onChange }: VitaminDInputProps) {
  return (
    <SupplementCheckbox
      id="vitaminD"
      checked={checked}
      onChange={onChange}
    />
  );
}
