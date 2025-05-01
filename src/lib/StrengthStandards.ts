export type StrengthLevel = 'Beginner' | 'Novice' | 'Intermediate' | 'Advanced' | 'Elite';

export const COMPOUND_LIFTS = [
  'Flat Bench Press',
  'Deadlift',
  'Squats',
  'Barbell Standing Shoulder Press'
] as const;

export type CompoundLift = typeof COMPOUND_LIFTS[number];

export const strengthStandards: Record<CompoundLift, Record<StrengthLevel, number>> = {
  "Flat Bench Press": {
    Beginner: 0.5,
    Novice: 0.75,
    Intermediate: 1.0,
    Advanced: 1.25,
    Elite: 1.5
  },
  "Deadlift": {
    Beginner: 1.0,
    Novice: 1.5,
    Intermediate: 2.0,
    Advanced: 2.5,
    Elite: 3.0
  },
  "Squats": {
    Beginner: 0.75,
    Novice: 1.25,
    Intermediate: 1.5,
    Advanced: 2.0,
    Elite: 2.5
  },
  "Barbell Standing Shoulder Press": {
    Beginner: 0.4,
    Novice: 0.6,
    Intermediate: 0.8,
    Advanced: 1.0,
    Elite: 1.2
  }
};

export function calculateStrengthLevel(
  exercise: CompoundLift,
  oneRepMax: number,
  bodyWeight: number
): { currentLevel: StrengthLevel; nextLevel: StrengthLevel | null; progress: number } {
  const ratio = oneRepMax / bodyWeight;
  const levels: StrengthLevel[] = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Elite'];
  
  // Find current level
  let currentLevelIndex = levels.length - 1;
  for (let i = 0; i < levels.length; i++) {
    if (ratio < strengthStandards[exercise][levels[i]]) {
      currentLevelIndex = i > 0 ? i - 1 : 0;
      break;
    }
  }

  const currentLevel = levels[currentLevelIndex];
  const nextLevel = currentLevelIndex < levels.length - 1 ? levels[currentLevelIndex + 1] : null;

  // Calculate progress to next level
  let progress = 1;
  if (nextLevel) {
    const currentStandard = strengthStandards[exercise][currentLevel];
    const nextStandard = strengthStandards[exercise][nextLevel];
    progress = (ratio - currentStandard) / (nextStandard - currentStandard);
    progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1
  }

  return { currentLevel, nextLevel, progress };
}
