import { formatDistanceToNow, format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { DailyEntry } from '@/types/dashboard';

interface EntryHeaderProps {
  entry: DailyEntry;
  currentIndex: number;
  totalEntries: number;
  isFirst: boolean;
  isLast: boolean;
  isDeleting: boolean;
  onNavigate: (index: number) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function EntryHeader({
  entry,
  currentIndex,
  totalEntries,
  isFirst,
  isLast,
  isDeleting,
  onNavigate,
  onEdit,
  onDelete,
}: EntryHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Entry {totalEntries - currentIndex} of {totalEntries}
          <span className="text-sm font-normal text-gray-500">
            ({formatDistanceToNow(entry.date, { addSuffix: true })}: {format(new Date(entry.date), 'MMM d, yyyy')})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            disabled={isLast}
            className="p-1 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            disabled={isFirst}
            className="p-1 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded-full 
                   hover:bg-blue-50 transition-colors"
        >
          Edit Entry
        </button>
        
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded-full 
                   hover:bg-red-50 transition-colors disabled:opacity-50 
                   disabled:cursor-not-allowed flex items-center gap-1"
        >
          {isDeleting ? (
            <>
              <span className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"/>
              Deleting...
            </>
          ) : (
            'Delete Entry'
          )}
        </button>
      </div>
    </div>
  );
}