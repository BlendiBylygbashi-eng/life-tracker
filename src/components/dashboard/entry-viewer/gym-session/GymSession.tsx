import type { DailyEntry } from '@/types/dashboard';

interface GymSessionProps {
  entry: DailyEntry;
}

export function GymSession({ entry }: GymSessionProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
      <h3 className="font-medium text-gray-900 mb-4">Gym Session</h3>
      {entry.gymSession ? (
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-2">
            {entry.gymSession.type.toUpperCase()} Day
          </div>
          <div className="space-y-2">
            {entry.gymSession.exercises.map(ex => (
              <div key={ex.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{ex.name}</span>
                <span className="font-medium">
                  {ex.weight}lbs × {ex.reps} reps
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No gym session recorded</p>
      )}
    </div>
  );
}
