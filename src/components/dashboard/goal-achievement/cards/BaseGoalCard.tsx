interface BaseGoalCardProps {
  title: string;
  goalValue: number;
  goalUnit: string;
  goalPrefix: '≥' | '≤';
  successRate: number;
  bottomLabel: string;
  bottomValue: string;
  colorClass: {
    from: string;
    to: string;
    border: string;
    text: string;
    progressBg: string;
    progressFill: string;
  };
}

export function BaseGoalCard({
  title,
  goalValue,
  goalUnit,
  goalPrefix,
  successRate,
  bottomLabel,
  bottomValue,
  colorClass
}: BaseGoalCardProps) {
  return (
    <div className={`p-5 rounded-xl bg-gradient-to-br ${colorClass.from} ${colorClass.to} ${colorClass.border} shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <span className={`text-sm ${colorClass.text} font-medium`}>
          Goal: {goalPrefix}{goalValue}{goalUnit}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Success Rate</span>
            <span className={`font-medium ${colorClass.text}`}>
              {Math.round(successRate)}%
            </span>
          </div>
          <div className={`h-2.5 ${colorClass.progressBg} rounded-full overflow-hidden backdrop-blur-[2px]`}>
            <div 
              className={`h-full ${colorClass.progressFill} rounded-full transition-all duration-500 shadow-sm`}
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{bottomLabel}</span>
          <span className={`font-medium ${colorClass.text}`}>{bottomValue}</span>
        </div>
      </div>
    </div>
  );
}
