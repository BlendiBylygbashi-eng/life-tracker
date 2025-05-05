# Codebase Structure

## Current State

src/
├── app/
│   ├── api/
│   │   └── daily-entry/
│   │       ├── [id]/
│   │       │   └── route.ts (164 lines) ⚠️
│   │       └── route.ts (69 lines)
│   ├── dashboard/
│   │   ├── page.tsx (150 lines) ⚠️
│   │   └── WeeklyOverview.tsx (107 lines)
│   ├── layout.tsx (31 lines)
│   ├── metadata.ts (7 lines)
│   ├── global.css (30 lines)
│   └── page.tsx (11 lines)
├── components/
│   ├── forms/
│   │   ├── daily-entry/
│   │   │   ├── DailyEntryForm.tsx      // Main container (~100 lines)
│   │   │   ├── index.ts                // Public exports
│   │   │   ├── state/                  // Form state management
│   │   │   │   ├── types.ts            // Shared interfaces and types
│   │   │   │   ├── useFormState.ts     // Form logic and handlers
│   │   │   │   └── useLocalStorage.ts  // Storage persistence
│   │   │   ├── sections/               // Form sections
│   │   │   │   ├── index.ts           // Section exports
│   │   │   │   ├── date/              // Date input
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── DateField.tsx
│   │   │   │   ├── metrics/           // Daily goals
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── MetricsSection.tsx
│   │   │   │   │   ├── MetricInput.tsx
│   │   │   │   │   ├── TimeMetric.tsx
│   │   │   │   │   ├── CaloriesMetric.tsx
│   │   │   │   │   └── ProteinMetric.tsx
│   │   │   │   ├── measurements/      // Body measurements
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── MeasurementsSection.tsx
│   │   │   │   │   ├── MeasurementInput.tsx
│   │   │   │   │   ├── BodyWeightInput.tsx
│   │   │   │   │   └── GripStrengthInput.tsx
│   │   │   │   ├── gym/              // Workout tracking
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── GymSessionTypeSelector.tsx
│   │   │   │   │   └── GymExerciseForm.tsx
│   │   │   │   ├── supplements/      // Supplement tracking
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── SupplementsSection.tsx
│   │   │   │   │   ├── SupplementCheckbox.tsx
│   │   │   │   │   ├── CreatineInput.tsx
│   │   │   │   │   ├── VitaminCInput.tsx
│   │   │   │   │   └── VitaminDInput.tsx
│   │   │   │   └── reflection/       // Daily reflection
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── ReflectionSection.tsx
│   │   │   │   │   ├── ReflectionTextarea.tsx
│   │   │   │   │   ├── ActivitiesInput.tsx
│   │   │   │   │   └── ImprovementsInput.tsx
│   │   │   └── shared/               // Shared components
│   │   │       ├── index.ts
│   │   │       ├── FormLayout.tsx    // Form container and header
│   │   │       ├── StatusMessage.tsx // Success/error notifications
│   │   │       └── SubmitButton.tsx  // Submit button with states
│   ├── dashboard/
│   │   ├── WeeklyOverview.tsx (280 lines) ⚠️
│   │   ├── GoalAchievement.tsx (256 lines) ⚠️
│   │   ├── GymProgressTracker.tsx (236 lines) ⚠️
│   │   ├── EntryViewer.tsx (240 lines) ⚠️
│   │   ├── EntryViewerContainer.tsx (22 lines)
│   │   └── StrengthStandards.tsx (98 lines)
│   └── ui/
│       ├── ParticleBackground.tsx (104 lines)
│       ├── CircularProgress.tsx (89 lines)
│       └── Navbar.tsx (49 lines)
├── lib/
│   ├── calculations.ts (4 lines)
│   ├── StrengthStandards.ts (74 lines)
│   └── workoutData.ts (27 lines)
├── types/
│   ├── dashboard.ts (47 lines)
│   └── database.ts (44 lines)
└── styles/
    ├── animations.ts (17 lines)
    └── theme.ts (74 lines)

## Planned Changes

### 1. DailyEntryForm.tsx Breakdown
#### Components to Extract
- [ ] Form Container & Layout
  - Base form structure
  - Status messages
  - Submit button

- [ ] Form State Management
  - Form data interface
  - useState and useEffect hooks
  - Local storage handling
  - Submit handler

- [ ] Goal Metrics Section
  - [ ] TimeInOfficeInput
  - [ ] CaloriesInput
  - [ ] ProteinInput
  - [ ] Shared goal progress visualization

- [ ] Measurements Section
  - [ ] BodyWeightInput
  - [ ] GripStrengthInput

- [ ] Form Sections (Already Partially Modular)
  - [ ] GymSessionSection (combining existing components)
    - GymSessionTypeSelector
    - GymExerciseForm
  - [ ] SupplementsSection
  - [ ] DailyReflectionSection
    - Activities
    - Improvements

#### New Directory Structure
```typescript
src/components/forms/
├── daily-entry/                 // New directory for form components
│   ├── DailyEntryForm.tsx      // Main container (simplified)
│   ├── state/                  // Form state management
│   │   ├── types.ts
│   │   ├── useFormState.ts
│   │   └── useLocalStorage.ts
│   ├── sections/               // Form sections
│   │   ├── GoalMetrics/
│   │   ├── Measurements/
│   │   ├── GymSession/
│   │   ├── Supplements/
│   │   └── DailyReflection/
│   └── shared/                 // Shared components
│       ├── FormLayout.tsx
│       ├── StatusMessage.tsx
│       └── SubmitButton.tsx
```

### 2. Dashboard Components (Next Phase)
- [ ] Extract common patterns
- [ ] Modularize visualization components

### 3. API Routes (Final Phase)
- [ ] Standardize error handling
- [ ] Extract database operations
- [ ] Create shared utilities

## Change History
### [Date] Initial Map
[Initial codebase map]

### [Future Date] Post-[Component] Refactor
[Updated map showing changes]
