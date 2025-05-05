import { BaseGoalCard } from './BaseGoalCard';

interface ProteinGoalCardProps {
  successCount: number;
  totalEntries: number;
  currentStreak: number;
  goalValue: number;
}

export function ProteinGoalCard({ 
  successCount, 
  totalEntries, 
  currentStreak,
  goalValue 
}: ProteinGoalCardProps) {
  return (
    <BaseGoalCard
      title="Protein"
      goalValue={goalValue}
      goalUnit="g"
      goalPrefix="≥"
      successRate={(successCount / totalEntries) * 100}
      bottomLabel="Current Streak"
      bottomValue={`${currentStreak} days`}
      colorClass={{
        from: "from-green-50/80",
        to: "to-emerald-50/90",
        border: "border border-green-100/50",
        text: "text-green-600",
        progressBg: "bg-green-100",
        progressFill: "bg-green-500"
      }}
    />
  );
}
