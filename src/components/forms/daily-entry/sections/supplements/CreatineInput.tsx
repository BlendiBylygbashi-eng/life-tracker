'use client';

import SupplementCheckbox from './SupplementCheckbox';

interface CreatineInputProps {
  checked: boolean;
  onChange: () => void;
}

export default function CreatineInput({ checked, onChange }: CreatineInputProps) {
  return (
    <SupplementCheckbox
      id="creatine"
      checked={checked}
      onChange={onChange}
    />
  );
}
