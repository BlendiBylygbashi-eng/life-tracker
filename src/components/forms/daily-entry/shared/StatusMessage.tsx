'use client';

interface StatusMessageProps {
  type: 'success' | 'error' | null;
  message: string;
}

export default function StatusMessage({ type, message }: StatusMessageProps) {
  if (!type) return null;

  return (
    <div 
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50
        mb-6 px-6 py-3 rounded-lg text-center font-medium shadow-lg
        transition-all duration-300 ease-in-out
        ${type === 'success' 
          ? 'bg-green-100 text-green-800 border-2 border-green-300' 
          : 'bg-red-100 text-red-800 border-2 border-red-300'
        }
      `}
    >
      <div className="flex items-center justify-center space-x-2">
        {type === 'success' ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}
