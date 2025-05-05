'use client';

interface SubmitButtonProps {
  isSubmitting: boolean;
  mode: 'create' | 'edit';
}

export default function SubmitButton({ isSubmitting, mode }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed
                flex items-center gap-2"
    >
      {isSubmitting ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
          {mode === 'edit' ? 'Saving Changes...' : 'Saving Entry...'}
        </>
      ) : (
        mode === 'edit' ? 'Save Changes' : 'Save Daily Entry'
      )}
    </button>
  );
}
