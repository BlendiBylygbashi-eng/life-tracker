import { format } from 'date-fns';
import type { DailyEntry } from '@/types/dashboard';

export interface EntryWithTimestamp extends DailyEntry {
  displayLabel: string;
}

export function sortEntriesByDate(entries: DailyEntry[]): DailyEntry[] {
  return [...entries].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function addDisplayLabels(entries: DailyEntry[]): EntryWithTimestamp[] {
  return entries.map((entry) => ({
    ...entry,
    displayLabel: format(new Date(entry.createdAt), 'MMM d HH:mm')
  }));
}

export function getLabels(entries: EntryWithTimestamp[]): string[] {
  return entries.map(entry => entry.displayLabel);
}
