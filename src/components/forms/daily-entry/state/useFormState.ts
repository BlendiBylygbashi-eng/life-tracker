import { useState, useEffect } from 'react';
import type { 
  DailyEntryFormData, 
  DailyEntryFormProps,
  FormChangeHandler,
  SupplementsChangeHandler,
  GymSessionTypeChangeHandler,
  ExercisesChangeHandler
} from './types';
import { useLocalStorage } from './useLocalStorage';
import type { WorkoutType } from '@/lib/workoutData';

export function useFormState({ 
  initialData, 
  onSuccess, 
  mode = 'create' 
}: DailyEntryFormProps) {
  const { getStoredData, saveToStorage, clearStorage } = useLocalStorage(mode);

  // Main form state
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

    return getStoredData();
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Change handlers
  const handleChange: FormChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSupplementsChange: SupplementsChangeHandler = (supplements) => {
    setFormData((prev) => ({
      ...prev,
      supplements,
    }));
  };

  const handleGymSessionTypeChange: GymSessionTypeChangeHandler = (type) => {
    setFormData((prev) => ({
      ...prev,
      gymSession: {
        ...prev.gymSession,
        type,
      },
    }));
  };

  const handleExercisesChange: ExercisesChangeHandler = (exercises) => {
    setFormData((prev) => ({
      ...prev,
      gymSession: {
        ...prev.gymSession,
        exercises,
      },
    }));
  };

  // Form submission
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
        clearStorage();
        setFormData(getStoredData()); // Reset to default
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (onSuccess) {
        onSuccess();
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

  // Save to localStorage on form data changes
  useEffect(() => {
    if (mode === 'create') {
      saveToStorage(formData);
    }
  }, [formData, mode]);

  return {
    formData,
    isSubmitting,
    submitStatus,
    handleSubmit,
    handleChange,
    handleSupplementsChange,
    handleGymSessionTypeChange,
    handleExercisesChange
  };
}
