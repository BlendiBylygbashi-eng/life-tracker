'use client';

import {
  FormLayout,
  StatusMessage,
  SubmitButton
} from './shared';

import {
  MetricsSection,
  MeasurementsSection,
  ReflectionSection,
  SupplementsSection,
  GymSessionTypeSelector,
  GymExerciseForm,
  DateField
} from './sections';

import { useFormState } from './state/useFormState';
import type { DailyEntryFormProps } from './state/types';

export default function DailyEntryForm({ 
  initialData, 
  onSuccess, 
  mode = 'create' 
}: DailyEntryFormProps) {
  const {
    formData,
    isSubmitting,
    submitStatus,
    handleSubmit,
    handleChange,
    handleSupplementsChange,
    handleGymSessionTypeChange,
    handleExercisesChange
  } = useFormState({ initialData, onSuccess, mode });

  return (
    <FormLayout mode={mode}>
      <StatusMessage type={submitStatus.type} message={submitStatus.message} />
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Date field */}
        <DateField 
          value={formData.date}
          onChange={handleChange}
        />

        {/* Daily Goals */}
        <MetricsSection
          timeInOffice={formData.timeInOffice}
          calories={formData.calories}
          protein={formData.protein}
          onChange={handleChange}
        />

        {/* Other Measurements */}
        <MeasurementsSection
          bodyWeight={formData.bodyWeight}
          gripStrength={formData.gripStrength}
          onChange={handleChange}
        />

        {/* Gym Session */}
        <GymSessionTypeSelector
          value={formData.gymSession.type}
          onChange={handleGymSessionTypeChange}
        />

        {formData.gymSession.type && (
          <GymExerciseForm
            exercises={formData.gymSession.exercises}
            sessionType={formData.gymSession.type}
            onChange={handleExercisesChange}
          />
        )}

        {/* Supplements */}
        <SupplementsSection
          supplements={formData.supplements}
          onChange={handleSupplementsChange}
        />

        {/* Daily Reflection */}
        <ReflectionSection
          activities={formData.activities}
          improvements={formData.improvements}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <SubmitButton isSubmitting={isSubmitting} mode={mode} />
        </div>
      </form>
    </FormLayout>
  );
}
