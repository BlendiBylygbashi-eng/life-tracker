import type { DailyEntry } from '@/types/dashboard';

interface SupplementsListProps {
  entry: DailyEntry;
}

export function SupplementsList({ entry }: SupplementsListProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
      <h3 className="font-medium text-gray-900 mb-4">Supplements Taken</h3>
      <div className="space-y-3">
        {entry.supplements.map(supp => (
          <div key={supp.id} className="flex items-center gap-2">
            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
              supp.taken ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <span className="text-white text-sm">
                {supp.taken ? '✓' : '✗'}
              </span>
            </div>
            <span className="text-gray-700">
              {supp.supplementName.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
