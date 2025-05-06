'use client';

import { useState } from 'react';
import type { DailyEntry } from '@/types/dashboard';
import { EntryViewer } from '.';

interface EntryViewerContainerProps {
  entries: DailyEntry[];
}

export default function EntryViewerContainer({ entries }: EntryViewerContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);  // Start with most recent entry (index 0)

  return (
    <EntryViewer
      entries={entries}
      currentIndex={currentIndex}
      onNavigate={setCurrentIndex}
    />
  );
}
