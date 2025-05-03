# Workout Logging

## Overview
Comprehensive workout tracking system with progress monitoring and strength standards.

## Workout Types
- Push
- Pull
- Legs & Shoulder
- Other (custom)

## Exercise Tracking

### Data Structure
```typescript
interface Exercise {
  name: string;
  weight: number;
  reps: number;
  order: number;
}
```

### Features
1. **Exercise Selection**
   - Predefined exercises per workout type
   - Custom exercise input
   - Weight and rep tracking

2. **Progress Tracking**
   - One Rep Max (1RM) calculations
   - Progress charts
   - Personal records

3. **Strength Standards**
   - Body weight ratio calculations
   - Level classifications:
     - Beginner
     - Novice
     - Intermediate
     - Advanced
     - Elite

## Components
- `GymSessionTypeSelector.tsx`
- `GymExerciseForm.tsx`
- `GymProgressTracker.tsx`
- `StrengthStandards.tsx`
