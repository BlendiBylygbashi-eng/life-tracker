# Component Architecture

## Component Organization

### UI Components (`/components/ui/`)
Reusable UI elements used throughout the application.

```typescript
components/ui/
├── Navbar.tsx           // Main navigation
├── ParticleBackground.tsx // Animated background
├── CircularProgress.tsx   // Progress indicators
└── Card.tsx             // Base card component
```

### Form Components (`/components/forms/`)
Handle user input and data submission.

```typescript
components/forms/
├── DailyEntryForm.tsx     // Main data entry
├── GymSessionTypeSelector.tsx // Workout type selection
├── GymExerciseForm.tsx    // Exercise logging
└── SupplementForm.tsx     // Supplement tracking
```

### Dashboard Components (`/components/dashboard/`)
Data visualization and metrics display.

```typescript
components/dashboard/
├── WeeklyOverview.tsx     // Weekly metrics charts
├── GymProgressTracker.tsx // Exercise progress
├── StrengthStandards.tsx // Strength comparisons
├── LatestEntry.tsx       // Most recent entry
└── GoalAchievement.tsx   // Goals progress
```

## Component Patterns

### State Management
- Local state with `useState`
- Form persistence with `localStorage`
- Server state through API calls

### Props Interface Example
```typescript
interface DailyEntryFormProps {
  initialData?: DailyEntry;
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
}
```

### Common Patterns
1. **Data Loading**
   ```typescript
   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState<Data | null>(null);
   ```

2. **Error Handling**
   ```typescript
   const [error, setError] = useState<string | null>(null);
   ```

3. **Form Submission**
   ```typescript
   const [isSubmitting, setIsSubmitting] = useState(false);
   ```
