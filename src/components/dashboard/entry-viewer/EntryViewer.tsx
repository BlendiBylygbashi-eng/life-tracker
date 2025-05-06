'use client';

import { formatDistanceToNow, format } from 'date-fns';
import { useState } from 'react';
import type { DailyEntry } from '@/types/dashboard';
import { useRouter } from 'next/navigation';
import { EntryHeader } from './header/EntryHeader';
import { DailyMetrics } from './metrics/DailyMetrics';
import { SupplementsList } from './supplements/SupplementList';
import { GymSession } from './gym-session/GymSession';
import { Reflections } from './reflections/Reflections';
import { EditEntryDialog } from './edit-dialog/EditEntryDialog';
import { DeleteConfirmDialog } from './delete-dialog/DeleteConfirmDialog';

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const handleDelete = () => {
    // Open the custom delete dialog instead of using browser confirm
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
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
      // Close the dialog after completion (either success or error)
      setIsDeleteDialogOpen(false);
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
        <DailyMetrics entry={entry} />
        
        {/* Supplements */}
        <SupplementsList entry={entry} />
        
        {/* Gym Session */}
        <GymSession entry={entry} />
      </div>
      
      <Reflections entry={entry} />

      <EditEntryDialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        entry={entry}
      />
      
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        entryDate={entry.date}
        isDeleting={isDeleting}
      />
    </div>
  );
}
