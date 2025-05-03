# Data Visualization

## Overview
Comprehensive data visualization system using Chart.js and custom components.

## Chart Types

### 1. Weekly Overview
- Time in office trends
- Calorie intake
- Protein consumption
- Body weight tracking
- Grip strength progression

### 2. Strength Progress
- One Rep Max (1RM) progression
- Body weight ratios
- Strength standards comparison

### 3. Goal Achievement
- Daily goals progress
- Circular progress indicators
- Success rate tracking

## Implementation

### Chart.js Configuration
```typescript
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    }
  }
};
```

### Components
1. **WeeklyOverview.tsx**
   - Line charts for trends
   - Multiple metric overlay
   - Date-based filtering

2. **CircularProgress.tsx**
   - Goal progress visualization
   - Dynamic color coding
   - Animated transitions

3. **StrengthStandards.tsx**
   - Progress bar visualization
   - Level indicators
   - Comparative metrics
