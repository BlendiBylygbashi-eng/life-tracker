'use client';

interface DateFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateField({ value, onChange }: DateFieldProps) {
  return (
    <div>
      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
        Date
      </label>
      <input
        type="date"
        id="date"
        name="date"
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        required
      />
    </div>
  );
}
