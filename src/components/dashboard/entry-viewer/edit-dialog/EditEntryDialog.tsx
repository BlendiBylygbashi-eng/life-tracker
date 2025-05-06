import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { DailyEntryForm } from '@/components/forms/daily-entry';
import type { DailyEntry } from '@/types/dashboard';

interface EditEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entry: DailyEntry;
}

export function EditEntryDialog({ isOpen, onClose, entry }: EditEntryDialogProps) {
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
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
                  onClose();
                }, 1500);
              }}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
