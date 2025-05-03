'use client';

import { useState } from 'react';
import { theme } from '@/styles/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { GymSession } from '@/types/dashboard';
import StrengthStandards from './StrengthStandards';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Constants
const STRENGTH_LEVELS = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Elite'];

interface Exercise {
  name: string;
  weight: number;
  reps: number;
  date: string;
  createdAt: string;
}

interface GymProgressTrackerProps {
  sessions: GymSession[];
}

// Calculate One Rep Max using Brzycki formula
function calculateOneRepMax(weight: number, reps: number): number {
  return weight * (36 / (37 - reps));
}

// Format the date to be more readable
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function GymProgressTracker({ sessions }: GymProgressTrackerProps) {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  // Function to handle card clicks
  const handleCardClick = (exerciseName: string) => {
    // If clicking the same card, deselect it, otherwise select the new card
    setSelectedExercise(selectedExercise === exerciseName ? null : exerciseName);
  };

  // Get unique exercise names
  const exerciseNames = Array.from(
    new Set(
      sessions.flatMap(session => 
        session.exercises.map(exercise => exercise.name)
      )
    )
  ).sort();

  // Calculate PRs and history for each exercise
  const exerciseHistory = exerciseNames.reduce((acc, exerciseName) => {
    const exerciseInstances = sessions
      .flatMap(session =>
        session.exercises
          .filter(exercise => exercise.name === exerciseName)
          .map(exercise => {
            const oneRepMax = calculateOneRepMax(exercise.weight, exercise.reps);
            console.log(`Exercise: ${exercise.name}`);
            console.log(`Weight: ${exercise.weight}, Reps: ${exercise.reps}`);
            console.log(`Calculated 1RM: ${oneRepMax}`);
            return {
              ...exercise,
              oneRepMax,
              date: session.date,
              createdAt: session.createdAt,
            };
          })
      )
      .sort((a, b) => {
        const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateCompare === 0) {
          // If dates are the same, sort by creation time
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return dateCompare;
      });

    acc[exerciseName] = exerciseInstances;
    return acc;
  }, {} as Record<string, Array<{ weight: number; reps: number; oneRepMax: number; date: string; createdAt: string; }>>);

  // Calculate PRs (keep existing PR calculation code)
  const personalRecords = exerciseNames.reduce((acc, exerciseName) => {
    const instances = exerciseHistory[exerciseName];
    const maxOneRepMax = Math.max(...instances.map(instance => instance.oneRepMax));
    const prInstance = instances.find(instance => instance.oneRepMax === maxOneRepMax);

    acc[exerciseName] = prInstance ? {
      weight: prInstance.weight,
      reps: prInstance.reps,
      oneRepMax: maxOneRepMax,
      date: prInstance.date,
    } : null;

    return acc;
  }, {} as Record<string, { weight: number; reps: number; oneRepMax: number; date: string; } | null>);

  // Prepare chart data for selected exercise
  const chartData = selectedExercise ? {
    labels: exerciseHistory[selectedExercise].map(instance => 
      format(new Date(instance.date), 'MMM d')
    ),
    datasets: [
      {
        label: 'Estimated 1RM (lbs)',
        data: exerciseHistory[selectedExercise].map(instance => {
          const oneRepMax = Math.round(instance.oneRepMax);
          console.log(`Plotting 1RM for ${selectedExercise}: ${oneRepMax}`);
          return oneRepMax;
        }),
        borderColor: theme.colors.primary[500],
        backgroundColor: theme.colors.primary[500] + '20',
        tension: 0.4,
        fill: true,
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const instance = exerciseHistory[selectedExercise][context.dataIndex];
            return [
              `1RM: ${Math.round(instance.oneRepMax)} lbs`,
              `Weight: ${instance.weight} lbs`,
              `Reps: ${instance.reps}`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Estimated 1RM (lbs)',
        },
      },
    },
  };

  // Get the most recent body weight
  const latestBodyWeight = sessions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .find(session => session.bodyWeight)?.bodyWeight;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
      <h2 className="text-xl font-semibold mb-6">Strength Progress</h2>

      {/* Strength Standards */}
      {latestBodyWeight && (
        <div className="mb-8">
          <StrengthStandards 
            personalRecords={personalRecords}
            bodyWeight={latestBodyWeight}
          />
        </div>
      )}

      {/* Personal Records */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Records</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exerciseNames.map(exerciseName => {
            const pr = personalRecords[exerciseName];
            if (!pr) return null;

            return (
              <div key={exerciseName} className="p-4 rounded-xl bg-gradient-to-br from-gray-50/40 to-gray-100/30 border border-gray-100/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{exerciseName}</h4>
                  <button 
                    onClick={() => handleCardClick(exerciseName)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {selectedExercise === exerciseName ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium text-gray-900">{pr.weight} lbs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reps:</span>
                    <span className="font-medium text-gray-900">{pr.reps}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated 1RM:</span>
                    <span className="font-medium text-gray-900">{Math.round(pr.oneRepMax)} lbs</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Set on {format(new Date(pr.date), 'MMM d')}
                  </div>
                </div>

                {/* Chart section that appears when card is selected */}
                {selectedExercise === exerciseName && chartData && (
                  <div className="mt-4 h-[200px]">
                    <Line options={chartOptions} data={chartData} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
