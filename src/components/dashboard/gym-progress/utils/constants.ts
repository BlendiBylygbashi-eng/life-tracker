export const STRENGTH_LEVELS = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Elite'] as const;

export type StrengthLevel = typeof STRENGTH_LEVELS[number];
