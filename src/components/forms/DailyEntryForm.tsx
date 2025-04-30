'use client';

import { useState } from 'react';
import CircularProgress from '../ui/CircularProgress';
import { theme } from '@/styles/theme';
import SupplementsSection from './SupplementForm';
import GymSessionTypeSelector, { GymSessionType } from './GymSessionTypeSelector';

interface DailyEntryFormData {
  date: string;
  timeInOffice: number;
  calories: number;
  protein: number;
  dailyActivities: string;
  improvements: string;
  supplements: {
    creatine: boolean;
    vitaminC: boolean;
    vitaminD: boolean;
  };
  gymSession: {
    type: GymSessionType;
  };
}

// Constants for goals
const GOALS = {
  timeInOffice: 9, // hours
  calories: 2273, // max calories
  protein: 205, // grams
};

export default function DailyEntryForm() {
  const [formData, setFormData] = useState<DailyEntryFormData>({
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    timeInOffice: 0,
    calories: 0,
    protein: 0,
    dailyActivities: '',
    improvements: '',
    supplements: {
      creatine: false,
      vitaminC: false,
      vitaminD: false,
    },
    gymSession: {
      type: null,
    },
  });

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
      const response = await fetch('/api/daily-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save entry');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Daily entry saved successfully!',
      });

      // Optional: Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        timeInOffice: 0,
        calories: 0,
        protein: 0,
        dailyActivities: '',
        improvements: '',
        supplements: {
          creatine: false,
          vitaminC: false,
          vitaminD: false,
        },
        gymSession: {
          type: null,
        },
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to save entry. Please try again.',
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

  const handleGymSessionTypeChange = (type: GymSessionType) => {
    setFormData((prev) => ({
      ...prev,
      gymSession: {
        ...prev.gymSession,
        type,
      },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Entry</h1>
        <p className="text-gray-600">Track your daily progress and reflections</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6">
        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg mb-6">
          {/* Date field with updated styling */}
          <div className="md:col-span-2">
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

          {/* Metrics Grid */}
          {/* Time in Office */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="timeInOffice" className="block text-sm font-medium text-gray-700">
                Time in Office
              </label>
              <CircularProgress
                value={formData.timeInOffice}
                max={GOALS.timeInOffice}
                progressColor={theme.colors.metrics.office}
                size={32}
              />
            </div>
            <input
              type="number"
              id="timeInOffice"
              name="timeInOffice"
              value={formData.timeInOffice}
              onChange={handleChange}
              step="0.5"
              min="0"
              max="24"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Goal: {GOALS.timeInOffice} hours</p>
          </div>

          {/* Calories */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
                Calories
              </label>
              <CircularProgress
                value={formData.calories}
                max={GOALS.calories}
                progressColor={theme.colors.metrics.calories}
                isInverse={true}
                size={32}
              />
            </div>
            <input
              type="number"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Goal: under {GOALS.calories} cal</p>
          </div>

          {/* Protein */}
          <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="protein" className="block text-sm font-medium text-gray-700">
                Protein
              </label>
              <CircularProgress
                value={formData.protein}
                max={GOALS.protein}
                progressColor={theme.colors.metrics.protein}
                size={32}
              />
            </div>
            <input
              type="number"
              id="protein"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              min="0"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Goal: {GOALS.protein}g</p>
          </div>
        </div>

        {/* Add Gym Session Type Selector after metrics, before supplements */}
        <GymSessionTypeSelector
          value={formData.gymSession.type}
          onChange={handleGymSessionTypeChange}
        />

        {/* Add Supplements Section before Daily Reflection */}
        <SupplementsSection
          supplements={formData.supplements}
          onChange={handleSupplementsChange}
        />

        {/* Reflection Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Reflection</h3>
          
          {/* Daily Activities */}
          <div>
            <label htmlFor="dailyActivities" className="block text-sm font-medium text-gray-700 mb-2">
              What did you accomplish today?
            </label>
            <textarea
              id="dailyActivities"
              name="dailyActivities"
              value={formData.dailyActivities}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              placeholder="List your main activities and achievements..."
            />
          </div>

          {/* Improvements */}
          <div>
            <label htmlFor="improvements" className="block text-sm font-medium text-gray-700 mb-2">
              Areas for improvement
            </label>
            <textarea
              id="improvements"
              name="improvements"
              value={formData.improvements}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              placeholder="What would you do differently next time?"
            />
          </div>
        </div>

        {/* Add status message */}
        {submitStatus.type && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Update submit button to show loading state */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-sky-400 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md ${
            isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-sky-500'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Daily Entry'}
        </button>
      </form>
    </div>
  );
}
