'use client';

interface ReflectionSectionProps {
  activities: string;
  improvements: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ReflectionSection({
  activities,
  improvements,
  onChange
}: ReflectionSectionProps) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/40 to-orange-50/30 border border-amber-100/30 backdrop-blur-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Daily Reflection</h3>
      
      {/* Daily Activities */}
      <div className="mb-6">
        <label htmlFor="activities" className="block text-sm font-medium text-gray-700 mb-2">
          Daily Activities
        </label>
        <textarea
          id="activities"
          name="activities"
          value={activities}
          onChange={onChange}
          rows={4}
          placeholder="What did you accomplish today?"
          className="w-full p-4 bg-white/50 backdrop-blur-sm border border-black/20 rounded-lg 
            focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all
            placeholder:text-gray-400"
        />
      </div>

      {/* Areas for Improvement */}
      <div>
        <label htmlFor="improvements" className="block text-sm font-medium text-gray-700 mb-2">
          Areas for Improvement
        </label>
        <textarea
          id="improvements"
          name="improvements"
          value={improvements}
          onChange={onChange}
          rows={4}
          placeholder="What would you do differently next time?"
          className="w-full p-4 bg-white/50 backdrop-blur-sm border border-black/20 rounded-lg 
            focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all
            placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
