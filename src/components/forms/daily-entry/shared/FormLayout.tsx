'use client';

interface FormLayoutProps {
  mode: 'create' | 'edit';
  children: React.ReactNode;
}

export default function FormLayout({ mode, children }: FormLayoutProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'edit' ? 'Edit Entry' : 'Daily Entry'}
          </h1>
          <p className="text-gray-600">
            {mode === 'edit' 
              ? 'Update your daily progress and reflections' 
              : 'Track your daily progress and reflections'
            }
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
