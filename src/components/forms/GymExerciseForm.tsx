'use client';

interface Exercise {
  id: string;
  name: string;
  weight: number;
  reps: number;
  order: number;
}

interface GymExerciseFormProps {
  exercises: Exercise[];
  onChange: (exercises: Exercise[]) => void;
}

export default function GymExerciseForm({ exercises, onChange }: GymExerciseFormProps) {
  const addExercise = () => {
    const newExercise: Exercise = {
      id: crypto.randomUUID(), // Generate a temporary ID for new exercises
      name: '',
      weight: 0,
      reps: 0,
      order: exercises.length,
    };
    onChange([...exercises, newExercise]);
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string | number) => {
    onChange(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const removeExercise = (id: string) => {
    onChange(
      exercises
        .filter((exercise) => exercise.id !== id)
        .map((exercise, index) => ({ ...exercise, order: index }))
    );
  };

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium text-gray-900">
              Exercise {exercise.order + 1}
            </h4>
            <button
              type="button"
              onClick={() => removeExercise(exercise.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label htmlFor={`name-${exercise.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Exercise Name
              </label>
              <input
                type="text"
                id={`name-${exercise.id}`}
                value={exercise.name}
                onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="e.g., Bench Press"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`weight-${exercise.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  id={`weight-${exercise.id}`}
                  value={exercise.weight}
                  onChange={(e) => updateExercise(exercise.id, 'weight', parseFloat(e.target.value))}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  min="0"
                  step="0.5"
                  required
                />
              </div>

              <div>
                <label htmlFor={`reps-${exercise.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Reps
                </label>
                <input
                  type="number"
                  id={`reps-${exercise.id}`}
                  value={exercise.reps}
                  onChange={(e) => updateExercise(exercise.id, 'reps', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExercise}
        className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-sky-400 hover:text-sky-600 transition-colors"
      >
        + Add Exercise
      </button>
    </div>
  );
}
