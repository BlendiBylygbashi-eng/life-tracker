import { BaseGoalCard } from './BaseGoalCard';

interface TimeGoalCardProps {
  successCount: number;
  totalEntries: number;
  currentStreak: number;
  goalValue: number;
}

export function TimeGoalCard({ 
  successCount, 
  totalEntries, 
  currentStreak,
  goalValue 
}: TimeGoalCardProps) {
  return (
    <BaseGoalCard
      title="Time in Office"
      goalValue={goalValue}
      goalUnit="h"
      goalPrefix="≥"
      successRate={(successCount / totalEntries) * 100}
      bottomLabel="Current Streak"
      bottomValue={`${currentStreak} days`}
      colorClass={{
        from: "from-blue-50/80",
        to: "to-indigo-50/90",
        border: "border border-blue-100/50",
        text: "text-blue-600",
        progressBg: "bg-blue-100/50",
        progressFill: "bg-blue-500"
      }}
    />
  );
}
