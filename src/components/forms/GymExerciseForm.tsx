'use client';

import { EXERCISE_OPTIONS } from '@/lib/workoutData';
import type { WorkoutType } from '@/lib/workoutData';

interface Exercise {
  id: string;
  name: string;
  weight: string;
  reps: string;
  order: number;
}

interface GymExerciseFormProps {
  exercises: Exercise[];
  sessionType: WorkoutType;
  onChange: (exercises: Exercise[]) => void;
}

export default function GymExerciseForm({ exercises, sessionType, onChange }: GymExerciseFormProps) {
  const availableExercises = EXERCISE_OPTIONS[sessionType] || [];

  const addExercise = () => {
    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name: '',
      weight: '',
      reps: '',
      order: exercises.length,
    };
    onChange([...exercises, newExercise]);
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string) => {
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
              <div className="relative">
                <input
                  type="text"
                  list={`exercises-${exercise.id}`}
                  id={`name-${exercise.id}`}
                  value={exercise.name}
                  onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  placeholder="Select or type exercise name"
                  required
                />
                <datalist id={`exercises-${exercise.id}`}>
                  {availableExercises.map((name) => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
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
                  onChange={(e) => updateExercise(exercise.id, 'weight', e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  min="0"
                  step="0.5"
                  placeholder="0"
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
                  onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  min="0"
                  placeholder="0"
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
