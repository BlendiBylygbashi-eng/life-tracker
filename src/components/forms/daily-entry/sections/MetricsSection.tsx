'use client';

import CircularProgress from '@/components/ui/CircularProgress';
import { theme } from '@/styles/theme';
import { GOALS } from '../state/types';

interface MetricsSectionProps {
  timeInOffice: number;
  calories: number;
  protein: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MetricsSection({ 
  timeInOffice, 
  calories, 
  protein, 
  onChange 
}: MetricsSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Goals</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Time in Office */}
        <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-50/40 to-indigo-50/30 border border-blue-100/30">
          <div className="flex items-center justify-between mb-4">
            <label htmlFor="timeInOffice" className="block text-sm font-medium text-gray-700">
              Time in Office
            </label>
            <div className="w-16 h-16">
              <CircularProgress
                value={timeInOffice}
                max={GOALS.timeInOffice}
                progressColor={theme.colors.metrics.office}
                size={64}
                strokeWidth={6}
              />
            </div>
          </div>
          <input
            type="number"
            id="timeInOffice"
            name="timeInOffice"
            value={timeInOffice || ''}
            onChange={onChange}
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
            <div className="w-16 h-16">
              <CircularProgress
                value={calories}
                max={GOALS.calories}
                progressColor={theme.colors.metrics.calories}
                isInverse={true}
                size={64}
                strokeWidth={6}
              />
            </div>
          </div>
          <input
            type="number"
            id="calories"
            name="calories"
            value={calories || ''}
            onChange={onChange}
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
            <div className="w-16 h-16">
              <CircularProgress
                value={protein}
                max={GOALS.protein}
                progressColor={theme.colors.metrics.protein}
                size={64}
                strokeWidth={6}
              />
            </div>
          </div>
          <input
            type="number"
            id="protein"
            name="protein"
            value={protein || ''}
            onChange={onChange}
            placeholder="0"
            min="0"
            className="w-full p-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          />
          <p className="mt-2 text-sm text-gray-600">Goal: {GOALS.protein}g</p>
        </div>
      </div>
    </div>
  );
}
