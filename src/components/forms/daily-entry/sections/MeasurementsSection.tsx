'use client';

interface MeasurementsSectionProps {
  bodyWeight: string;
  gripStrength: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MeasurementsSection({
  bodyWeight,
  gripStrength,
  onChange
}: MeasurementsSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Other Measurements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Body Weight */}
        <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100">
          <label htmlFor="bodyWeight" className="block text-sm font-medium text-gray-700 mb-2">
            Body Weight (lbs)
          </label>
          <input
            type="number"
            id="bodyWeight"
            name="bodyWeight"
            value={bodyWeight}
            onChange={onChange}
            placeholder="Enter weight in lbs"
            className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Grip Strength */}
        <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100">
          <label htmlFor="gripStrength" className="block text-sm font-medium text-gray-700 mb-2">
            Grip Strength
          </label>
          <input
            type="number"
            id="gripStrength"
            name="gripStrength"
            value={gripStrength}
            onChange={onChange}
            placeholder="0"
            className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
          />
          <p className="mt-1 text-xs text-gray-500">Measured in kg</p>
        </div>
      </div>
    </div>
  );
}
