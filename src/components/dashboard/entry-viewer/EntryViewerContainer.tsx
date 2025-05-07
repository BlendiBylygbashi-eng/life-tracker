'use client';

import { useState } from 'react';
import type { DailyEntry } from '@/types/dashboard';
import { EntryViewer } from '.';

interface EntryViewerContainerProps {
  entries: DailyEntry[];
}

export default function EntryViewerContainer({ entries }: EntryViewerContainerProps) {
  if (!entries || entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
        <h2 className="text-xl font-semibold mb-6">Recent Entries</h2>
        <p className="text-gray-500 text-center py-4">No entries available</p>
      </div>
    );
  }
  
  const [currentIndex, setCurrentIndex] = useState(0);  // Start with most recent entry (index 0)

  return (
    <EntryViewer
      entries={entries}
      currentIndex={currentIndex}
      onNavigate={setCurrentIndex}
    />
  );
}
