import { BaseGoalCard } from './BaseGoalCard';

interface GymGoalCardProps {
  weeklySuccessRate: number;
  currentWeekSessions: number;
  goalValue: number;
}

export function GymGoalCard({ 
  weeklySuccessRate, 
  currentWeekSessions,
  goalValue 
}: GymGoalCardProps) {
  return (
    <BaseGoalCard
      title="Weekly Gym"
      goalValue={goalValue}
      goalUnit="x"
      goalPrefix="≥"
      successRate={weeklySuccessRate}
      bottomLabel="This Week"
      bottomValue={`${currentWeekSessions} / ${goalValue}`}
      colorClass={{
        from: "from-purple-50/80",
        to: "to-violet-50/90",
        border: "border border-purple-100/50",
        text: "text-purple-600",
        progressBg: "bg-purple-100",
        progressFill: "bg-purple-500"
      }}
    />
  );
}
