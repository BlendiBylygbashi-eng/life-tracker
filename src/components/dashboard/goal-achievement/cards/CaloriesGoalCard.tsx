import { BaseGoalCard } from './BaseGoalCard';

interface CaloriesGoalCardProps {
  successCount: number;
  totalEntries: number;
  currentStreak: number;
  goalValue: number;
}

export function CaloriesGoalCard({ 
  successCount, 
  totalEntries, 
  currentStreak,
  goalValue 
}: CaloriesGoalCardProps) {
  return (
    <BaseGoalCard
      title="Calories"
      goalValue={goalValue}
      goalUnit=""
      goalPrefix="≤"
      successRate={(successCount / totalEntries) * 100}
      bottomLabel="Current Streak"
      bottomValue={`${currentStreak} days`}
      colorClass={{
        from: "from-red-50/80",
        to: "to-pink-50/90",
        border: "border border-red-100/50",
        text: "text-red-600",
        progressBg: "bg-red-100",
        progressFill: "bg-red-500"
      }}
    />
  );
}
