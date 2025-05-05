'use client';

interface ReflectionTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

export default function ReflectionTextarea({
  id,
  label,
  value,
  onChange,
  placeholder
}: ReflectionTextareaProps) {
  return (
    <div className="mb-6 last:mb-0">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className="w-full p-4 bg-white/50 backdrop-blur-sm border border-black/20 rounded-lg 
          focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all
          placeholder:text-gray-400"
      />
    </div>
  );
}
