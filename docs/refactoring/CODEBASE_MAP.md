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
│   │   ├── DailyEntryForm.tsx (539 lines) ⚠️
│   │   ├── GymExerciseForm.tsx (142 lines) ⚠️
│   │   ├── SupplementForm.tsx (48 lines)
│   │   └── GymSessionTypeSelector.tsx (42 lines)
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
- [ ] Break down DailyEntryForm.tsx
- [ ] Extract common dashboard patterns
- [ ] Modularize API routes
[etc...]

## Change History
### [Date] Initial Map
[Initial codebase map]

### [Future Date] Post-[Component] Refactor
[Updated map showing changes]
