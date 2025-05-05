'use client';

interface MeasurementInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  unit?: string;
}

export default function MeasurementInput({
  id,
  label,
  value,
  onChange,
  placeholder = "0",
  unit
}: MeasurementInputProps) {
  return (
    <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="number"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
      />
      {unit && <p className="mt-1 text-xs text-gray-500">Measured in {unit}</p>}
    </div>
  );
}
