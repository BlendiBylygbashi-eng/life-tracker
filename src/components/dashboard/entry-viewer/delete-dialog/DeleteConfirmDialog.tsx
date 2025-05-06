import { Dialog } from '@headlessui/react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entryDate: Date | string;
  isDeleting: boolean;
}

export function DeleteConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  entryDate,
  isDeleting
}: DeleteConfirmDialogProps) {
  const formattedDate = new Date(entryDate).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-40"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-xl shadow-lg p-6">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
            Confirm Deletion
          </Dialog.Title>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete your entry from <span className="font-medium">{formattedDate}</span>? This action cannot be undone.
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
              disabled={isDeleting}
            >
              Cancel
            </button>
            
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Entry'
              )}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}