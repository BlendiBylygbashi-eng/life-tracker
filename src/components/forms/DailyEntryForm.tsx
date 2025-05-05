'use client';

import { useState, useEffect } from 'react';
import CircularProgress from '../ui/CircularProgress';
import { theme } from '@/styles/theme';
import SupplementsSection from './SupplementForm';
import GymSessionTypeSelector from './GymSessionTypeSelector';
import type { WorkoutType } from '@/lib/workoutData';
import GymExerciseForm from './GymExerciseForm';
import type { DailyEntry } from '@/types/dashboard';

interface DailyEntryFormData {
  date: string;
  timeInOffice: number;
  calories: number;
  protein: number;
  bodyWeight: string;
  gripStrength: string;
  activities: string;
  improvements: string;
  supplements: {
    creatine: boolean;
    vitaminC: boolean;
    vitaminD: boolean;
  };
  gymSession: {
    type: WorkoutType | null;
    exercises: Array<{
      id: string;
      name: string;
      weight: string;
      reps: string;
      order: number;
    }>;
  };
}

// Constants for goals
const GOALS = {
  timeInOffice: 9, // hours
  calories: 2273, // max calories
  protein: 205, // grams
};

// Add these props
interface DailyEntryFormProps {
  initialData?: DailyEntry;  // For edit mode
  onSuccess?: () => void;    // Callback after successful submit
  mode?: 'create' | 'edit';  // To distinguish between create/edit modes
}

const STORAGE_KEY = 'daily-entry-form-data';

export default function DailyEntryForm({ 
  initialData, 
  onSuccess, 
  mode = 'create' 
}: DailyEntryFormProps) {
  const [formData, setFormData] = useState<DailyEntryFormData>(() => {
    if (initialData) {
      return {
        date: new Date(initialData.date).toISOString().split('T')[0],
        timeInOffice: initialData.timeInOffice,
        calories: initialData.calories,
        protein: initialData.protein,
        bodyWeight: initialData.bodyWeight?.toString() || '',
        gripStrength: initialData.gripStrength?.toString() || '',
        activities: initialData.activities || '',
        improvements: initialData.improvements || '',
        supplements: {
          creatine: initialData.supplements.some(s => s.supplementName === 'creatine' && s.taken),
          vitaminC: initialData.supplements.some(s => s.supplementName === 'vitamin_c' && s.taken),
          vitaminD: initialData.supplements.some(s => s.supplementName === 'vitamin_d' && s.taken),
        },
        gymSession: initialData.gymSession ? {
          type: initialData.gymSession.type as WorkoutType,
          exercises: initialData.gymSession.exercises.map(ex => ({
            id: ex.id,
            name: ex.name,
            weight: ex.weight.toString(),
            reps: ex.reps.toString(),
            order: ex.order,
          })),
        } : {
          type: null,
          exercises: [],
        },
      };
    }

    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          return {
            ...parsed,
            gymSession: parsed.gymSession || {  // Ensure gymSession exists
              type: null,
              exercises: [],
            },
          };
        } catch (e) {
          console.error('Failed to parse saved form data:', e);
        }
      }
    }

    return {
      date: new Date().toISOString().split('T')[0],
      timeInOffice: 0,
      calories: 0,
      protein: 0,
      bodyWeight: '',
      gripStrength: '',
      activities: '',
      improvements: '',
      supplements: {
        creatine: false,
        vitaminC: false,
        vitaminD: false,
      },
      gymSession: {
        type: null,
        exercises: [],
      },
    };
  });

  useEffect(() => {
    if (mode === 'create') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, mode]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch(
        mode === 'edit' ? `/api/daily-entry/${initialData!.id}` : '/api/daily-entry',
        {
          method: mode === 'edit' ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            bodyWeight: formData.bodyWeight ? parseFloat(formData.bodyWeight) : null,
            gripStrength: formData.gripStrength ? parseFloat(formData.gripStrength) : null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to save entry');
      }

      setSubmitStatus({
        type: 'success',
        message: `Daily entry ${mode === 'edit' ? 'updated' : 'saved'} successfully!`,
      });

      if (mode === 'create') {
        localStorage.removeItem(STORAGE_KEY);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (onSuccess) {
        onSuccess();
      }

      if (mode === 'create') {
        setFormData({
          date: new Date().toISOString().split('T')[0],
          timeInOffice: 0,
          calories: 0,
          protein: 0,
          bodyWeight: '',
          gripStrength: '',
          activities: '',
          improvements: '',
          supplements: {
            creatine: false,
            vitaminC: false,
            vitaminD: false,
          },
          gymSession: {
            type: null,
            exercises: [],
          },
        });
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to save entry. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSupplementsChange = (supplements: { creatine: boolean; vitaminC: boolean; vitaminD: boolean }) => {
    setFormData((prev) => ({
      ...prev,
      supplements,
    }));
  };

  const handleGymSessionTypeChange = (type: WorkoutType) => {
    setFormData((prev) => ({
      ...prev,
      gymSession: {
        ...prev.gymSession,
        type,
      },
    }));
  };

  const handleExercisesChange = (exercises: Array<{
    id: string;
    name: string;
    weight: string;
    reps: string;
    order: number;
  }>) => {
    setFormData((prev) => ({
      ...prev,
      gymSession: {
        ...prev.gymSession,
        exercises,
      },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'edit' ? 'Edit Entry' : 'Daily Entry'}
          </h1>
          <p className="text-gray-600">
            {mode === 'edit' ? 'Update your daily progress and reflections' : 'Track your daily progress and reflections'}
          </p>
        </div>

        {/* Status Message */}
        {submitStatus.type && (
          <div 
            className={`
              fixed top-4 left-1/2 transform -translate-x-1/2 z-50
              mb-6 px-6 py-3 rounded-lg text-center font-medium shadow-lg
              transition-all duration-300 ease-in-out
              ${submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                : 'bg-red-100 text-red-800 border-2 border-red-300'
              }
            `}
          >
            <div className="flex items-center justify-center space-x-2">
              {submitStatus.type === 'success' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              )}
              <span>{submitStatus.message}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Date field */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Goal Metrics Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Time in Office */}
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-50/40 to-indigo-50/30 border border-blue-100/30">
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="timeInOffice" className="block text-sm font-medium text-gray-700">
                    Time in Office
                  </label>
                  <div className="w-16 h-16"> {/* Increased size */}
                    <CircularProgress
                      value={formData.timeInOffice}
                      max={GOALS.timeInOffice}
                      progressColor={theme.colors.metrics.office}
                      size={64}  // Increased size
                      strokeWidth={6}  // Adjusted stroke width
                    />
                  </div>
                </div>
                <input
                  type="number"
                  id="timeInOffice"
                  name="timeInOffice"
                  value={formData.timeInOffice || ''}
                  onChange={handleChange}
                  placeholder="0"
                  step="0.5"
                  min="0"
                  max="24"
                  className="w-full p-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <p className="mt-2 text-sm text-gray-600">Goal: {GOALS.timeInOffice} hours</p>
              </div>

              {/* Calories */}
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-red-50/40 to-pink-50/30 border border-red-100/30">
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
                    Calories
                  </label>
                  <div className="w-16 h-16"> {/* Increased size */}
                    <CircularProgress
                      value={formData.calories}
                      max={GOALS.calories}
                      progressColor={theme.colors.metrics.calories}
                      isInverse={true}
                      size={64}  // Increased size
                      strokeWidth={6}  // Adjusted stroke width
                    />
                  </div>
                </div>
                <input
                  type="number"
                  id="calories"
                  name="calories"
                  value={formData.calories || ''}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full p-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
                <p className="mt-2 text-sm text-gray-600">Goal: under {GOALS.calories} cal</p>
              </div>

              {/* Protein */}
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-green-50/40 to-emerald-50/30 border border-green-100/30">
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="protein" className="block text-sm font-medium text-gray-700">
                    Protein
                  </label>
                  <div className="w-16 h-16"> {/* Increased size */}
                    <CircularProgress
                      value={formData.protein}
                      max={GOALS.protein}
                      progressColor={theme.colors.metrics.protein}
                      size={64}  // Increased size
                      strokeWidth={6}  // Adjusted stroke width
                    />
                  </div>
                </div>
                <input
                  type="number"
                  id="protein"
                  name="protein"
                  value={formData.protein || ''}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full p-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
                <p className="mt-2 text-sm text-gray-600">Goal: {GOALS.protein}g</p>
              </div>
            </div>
          </div>

          {/* Other Measurements Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Other Measurements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Body Weight */}
              <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                <label htmlFor="bodyWeight" className="block text-sm font-medium text-gray-700 mb-2">
                  Body Weight (lbs)
                </label>
                <input
                  type="number"
                  id="bodyWeight"
                  name="bodyWeight"
                  value={formData.bodyWeight}
                  onChange={handleChange}
                  placeholder="Enter weight in lbs"
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Grip Strength */}
              <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                <label htmlFor="gripStrength" className="block text-sm font-medium text-gray-700 mb-2">
                  Grip Strength
                </label>
                <input
                  type="number"
                  id="gripStrength"
                  name="gripStrength"
                  value={formData.gripStrength}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                />
                <p className="mt-1 text-xs text-gray-500">Measured in kg</p>
              </div>
            </div>
          </div>

          {/* Add Gym Session Type Selector after metrics, before supplements */}
          <GymSessionTypeSelector
            value={formData.gymSession.type}
            onChange={handleGymSessionTypeChange}
          />

          {/* Only show exercise form if a session type is selected */}
          {formData.gymSession.type && (
            <GymExerciseForm
              exercises={formData.gymSession.exercises}
              sessionType={formData.gymSession.type}
              onChange={handleExercisesChange}
            />
          )}

          {/* Add Supplements Section before Daily Reflection */}
          <SupplementsSection
            supplements={formData.supplements}
            onChange={handleSupplementsChange}
          />

          {/* Reflection Section */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/40 to-orange-50/30 border border-amber-100/30 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Daily Reflection</h3>
            
            {/* Daily Activities */}
            <div className="mb-6">
              <label htmlFor="activities" className="block text-sm font-medium text-gray-700 mb-2">
                Daily Activities
              </label>
              <textarea
                id="activities"
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                rows={4}
                placeholder="What did you accomplish today?"
                className="w-full p-4 bg-white/50 backdrop-blur-sm border border-black/20 rounded-lg 
                  focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all
                  placeholder:text-gray-400"
              />
            </div>

            {/* Areas for Improvement */}
            <div>
              <label htmlFor="improvements" className="block text-sm font-medium text-gray-700 mb-2">
                Areas for Improvement
              </label>
              <textarea
                id="improvements"
                name="improvements"
                value={formData.improvements}
                onChange={handleChange}
                rows={4}
                placeholder="What would you do differently next time?"
                className="w-full p-4 bg-white/50 backdrop-blur-sm border border-black/20 rounded-lg 
                  focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all
                  placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed
                       flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                  {mode === 'edit' ? 'Saving Changes...' : 'Saving Entry...'}
                </>
              ) : (
                mode === 'edit' ? 'Save Changes' : 'Save Daily Entry'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
