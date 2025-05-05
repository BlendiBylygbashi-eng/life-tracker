'use client';

interface SupplementCheckboxProps {
  id: keyof typeof supplementNames;
  checked: boolean;
  onChange: () => void;
}

const supplementNames = {
  creatine: 'Creatine',
  vitaminC: 'Vitamin C',
  vitaminD: 'Vitamin D',
} as const;

export default function SupplementCheckbox({ 
  id, 
  checked, 
  onChange 
}: SupplementCheckboxProps) {
  return (
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 text-purple-600 rounded border-gray-300 
          focus:ring-purple-500 focus:ring-2 focus:ring-offset-0"
      />
      <span className="text-gray-700">{supplementNames[id]}</span>
    </label>
  );
}
