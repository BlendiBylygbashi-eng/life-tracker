'use client';

import ReflectionTextarea from './ReflectionTextarea';

interface ImprovementsInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ImprovementsInput({ value, onChange }: ImprovementsInputProps) {
  return (
    <ReflectionTextarea
      id="improvements"
      label="Areas for Improvement"
      value={value}
      onChange={onChange}
      placeholder="What would you do differently next time?"
    />
  );
}
