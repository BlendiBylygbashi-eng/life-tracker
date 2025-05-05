'use client';

import ActivitiesInput from './ActivitiesInput';
import ImprovementsInput from './ImprovementsInput';

interface ReflectionSectionProps {
  activities: string;
  improvements: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ReflectionSection({
  activities,
  improvements,
  onChange
}: ReflectionSectionProps) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/40 to-orange-50/30 border border-amber-100/30 backdrop-blur-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Daily Reflection</h3>
      <ActivitiesInput value={activities} onChange={onChange} />
      <ImprovementsInput value={improvements} onChange={onChange} />
    </div>
  );
}
