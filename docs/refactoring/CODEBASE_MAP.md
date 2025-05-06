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
│   │   ├── weekly-overview/              // Weekly metrics visualization
│   │   │   ├── charts/                   // Chart components
│   │   │   │   ├── BaseChart.tsx (43 lines)
│   │   │   │   ├── TimeChart.tsx (22 lines)
│   │   │   │   ├── CaloriesChart.tsx (22 lines)
│   │   │   │   ├── ProteinChart.tsx (22 lines)
│   │   │   │   ├── GripStrengthChart.tsx (22 lines)
│   │   │   │   ├── BodyWeightChart.tsx (21 lines)
│   │   │   │   └── index.ts (6 lines)
│   │   │   ├── utils/                    // Shared utilities
│   │   │   │   ├── chartConfig.ts (30 lines)
│   │   │   │   ├── chartDatasets.ts (95 lines)
│   │   │   │   └── dataTransformers.ts (24 lines)
│   │   │   ├── WeeklyOverview.tsx (56 lines)
│   │   │   └── index.ts (2 lines)
│   │   ├── goal-achievement/            // Goal tracking components
│   │   │   ├── cards/                   // Card components
│   │   │   │   ├── BaseGoalCard.tsx (62 lines)
│   │   │   │   ├── TimeGoalCard.tsx (36 lines)
│   │   │   │   ├── CaloriesGoalCard.tsx (36 lines)
│   │   │   │   ├── ProteinGoalCard.tsx (36 lines)
│   │   │   │   ├── GymGoalCard.tsx (34 lines)
│   │   │   │   └── index.ts (6 lines)
│   │   │   ├── utils/                   // Shared utilities
│   │   │   │   ├── goalConfig.ts (9 lines)
│   │   │   │   ├── statsCalculators.ts (48 lines)
│   │   │   │   ├── gymSessionUtils.ts (43 lines)
│   │   │   │   ├── types.ts (26 lines)
│   │   │   │   └── index.ts (5 lines)
│   │   │   ├── GoalAchievement.tsx (62 lines)
│   │   │   └── index.ts (2 lines)
│   │   ├── gym-progress/               // Gym progress tracking
│   │   │   ├── cards/                  // Card components
│   │   │   │   └── PRCard.tsx          // Personal record card
│   │   │   ├── charts/                 // Chart components
│   │   │   │   └── ProgressChart.tsx   // Exercise progress visualization
│   │   │   ├── hooks/                  // Custom hooks
│   │   │   │   └── useGymProgress.ts   // Progress data & state management
│   │   │   ├── layout/                 // Layout components
│   │   │   │   └── Container.tsx       // Section container
│   │   │   ├── sections/               // Main sections
│   │   │   │   ├── PersonalRecords.tsx     // Records display
│   │   │   │   ├── RecordsSection.tsx      // Records wrapper
│   │   │   │   ├── StrengthSection.tsx     // Standards wrapper
│   │   │   │   └── StrengthStandards.tsx   // Standards display
│   │   │   ├── utils/                  // Shared utilities
│   │   │   │   ├── calculations.ts     // Data processing
│   │   │   │   ├── chartConfig.ts      // Chart setup
│   │   │   │   ├── constants.ts        // Shared constants
│   │   │   │   └── types.ts           // Type definitions
│   │   │   ├── GymProgressTracker.tsx  // Main container (reduced)
│   │   │   └── index.ts               // Public exports
│   │   ├── entry-viewer/               // Daily entry viewing components
│   │   │   ├── header/                 // Header components 
│   │   │   │   └── EntryHeader.tsx (82 lines)
│   │   │   ├── metrics/                // Metrics components
│   │   │   │   └── DailyMetrics.tsx (39 lines)
│   │   │   ├── supplements/            // Supplements components
│   │   │   │   └── SupplementList.tsx (29 lines)
│   │   │   ├── gym-session/            // Gym session components
│   │   │   │   └── GymSession.tsx (32 lines)
│   │   │   ├── reflections/            // Reflections components
│   │   │   │   └── Reflections.tsx (20 lines)
│   │   │   ├── edit-dialog/            // Edit dialog components
│   │   │   │   └── EditEntryDialog.tsx (41 lines)
│   │   │   ├── EntryViewer.tsx (105 lines)
│   │   │   ├── EntryViewerContainer.tsx (22 lines)
│   │   │   └── index.ts (2 lines)
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
✓ WeeklyOverview Component
- [x] Extract common patterns
- [x] Modularize visualization components
- [x] Create reusable BaseChart
- [x] Separate chart configurations
- [x] Implement data transformers

✓ GoalAchievement Component
- [x] Extract common card pattern into BaseGoalCard
- [x] Create individual goal cards
- [x] Separate utility functions
- [x] Improve type safety with shared interfaces

✓ EntryViewer Component
- [x] Create modular directory structure
- [x] Extract header component
- [x] Extract metrics component
- [x] Extract supplements component
- [x] Extract gym session component
- [x] Extract reflections component
- [x] Extract edit dialog component
- [x] Reduce main component complexity

Remaining Components to Refactor:
- [ ] GymProgressTracker.tsx

### 3. API Routes (Final Phase)
- [ ] Standardize error handling
- [ ] Extract database operations
- [ ] Create shared utilities

## Change History
### [Previous Date] Initial Map
[Initial codebase map]

### [Previous Date] Post-WeeklyOverview Refactor
- Modularized WeeklyOverview component
- Reduced main component from 280 to 56 lines
- Created reusable chart components
- Implemented shared utilities and configurations
- Improved type safety and maintainability

### [Previous Date] Post-GoalAchievement Refactor
- Modularized GoalAchievement component
- Reduced main component from 256 to 62 lines
- Created reusable BaseGoalCard pattern
- Implemented shared utilities and goal configurations
- Improved type safety and maintainability

### [Previous Date] Post-GymProgressTracker Refactor
- Completely modularized GymProgressTracker component
- Reduced main component from 236 lines to ~36 lines
- Created modular directory structure with clear separation of concerns
- Extracted logic into custom hook (useGymProgress)
- Created dedicated section components
- Moved and updated StrengthStandards to gym-progress module
- Improved type safety and maintainability

### [Current Date] Post-EntryViewer Refactor
- Completely modularized EntryViewer component
- Reduced main component from 240 lines to 105 lines
- Created dedicated components for each section:
  - EntryHeader (navigation and actions)
  - DailyMetrics (metrics display)
  - SupplementsList (supplements tracking)
  - GymSession (workout display)
  - Reflections (activities and improvements)
  - EditEntryDialog (form dialog)
- Organized components into a logical directory structure
- Improved code maintainability and readability
