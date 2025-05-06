import type { DailyEntry } from '@/types/dashboard';

interface ReflectionsProps {
  entry: DailyEntry;
}

export function Reflections({ entry }: ReflectionsProps) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100">
        <h3 className="font-medium text-gray-900 mb-3">Activities</h3>
        <p className="text-gray-600 whitespace-pre-wrap">{entry.activities}</p>
      </div>
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-100">
        <h3 className="font-medium text-gray-900 mb-3">Areas for Improvement</h3>
        <p className="text-gray-600 whitespace-pre-wrap">{entry.improvements}</p>
      </div>
    </div>
  );
}
