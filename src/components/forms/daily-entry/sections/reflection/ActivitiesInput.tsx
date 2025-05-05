'use client';

import ReflectionTextarea from './ReflectionTextarea';

interface ActivitiesInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ActivitiesInput({ value, onChange }: ActivitiesInputProps) {
  return (
    <ReflectionTextarea
      id="activities"
      label="Daily Activities"
      value={value}
      onChange={onChange}
      placeholder="What did you accomplish today?"
    />
  );
}
