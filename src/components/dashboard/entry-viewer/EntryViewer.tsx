'use client';

import { formatDistanceToNow, format } from 'date-fns';
import { useState } from 'react';
import type { DailyEntry } from '@/types/dashboard';
import { useRouter } from 'next/navigation';
import { DailyEntryForm } from '@/components/forms/daily-entry';
import { Dialog } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { EntryHeader } from './header/EntryHeader';

interface EntryViewerProps {
  entries: DailyEntry[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function EntryViewer({ entries, currentIndex, onNavigate }: EntryViewerProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  if (!entries || entries.length === 0 || !entries[currentIndex]) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
        <p className="text-gray-500">No entries available</p>
      </div>
    );
  }

  const entry = entries[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === entries.length - 1;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this entry? This cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/daily-entry/${entry.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }

      // Refresh the page data
      router.refresh();
    } catch (err) {
      setError('Failed to delete entry. Please try again.');
      console.error('Error deleting entry:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
      <EntryHeader
        entry={entry}
        currentIndex={currentIndex}
        totalEntries={entries.length}
        isFirst={isFirst}
        isLast={isLast}
        isDeleting={isDeleting}
        onNavigate={onNavigate}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDelete}
      />

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Metrics */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <h3 className="font-medium text-gray-900 mb-4">Daily Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Time in Office</span>
              <span className="font-medium">{entry.timeInOffice} hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Calories</span>
              <span className="font-medium">{entry.calories}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Protein</span>
              <span className="font-medium">{entry.protein}g</span>
            </div>
            {entry.bodyWeight && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Body Weight</span>
                <span className="font-medium">{entry.bodyWeight} lbs</span>
              </div>
            )}
            {entry.gripStrength && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Grip Strength</span>
                <span className="font-medium">{entry.gripStrength}kg</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Supplements */}
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
        
        {/* Gym Session */}
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
      </div>
      
      {/* Reflections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100">
          <h3 className="font-medium text-gray-900 mb-3">Activities</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{entry.activities}</p>
        </div>
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-100">
          <h3 className="font-medium text-gray-900 mb-3">Areas for Improvement</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{entry.improvements}</p>
        </div>
      </div>

      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        className="relative z-40"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl w-full bg-white rounded-xl shadow-lg">
            <div className="max-h-[90vh] overflow-y-auto">
              <DailyEntryForm
                mode="edit"
                initialData={entry}
                onSuccess={() => {
                  router.refresh();
                  setTimeout(() => {
                    setIsEditing(false);
                  }, 1500);
                }}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
