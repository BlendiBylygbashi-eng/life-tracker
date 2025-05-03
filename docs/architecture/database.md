# Database Architecture

## Schema Overview
The application uses SQLite with Prisma as the ORM. The database consists of four main models:

### DailyEntry
Primary table tracking daily activities and metrics.
```typescript
model DailyEntry {
  id            String         @id @default(uuid())
  date          DateTime
  timeInOffice  Float
  calories      Int
  protein       Int
  bodyWeight    Float?
  gripStrength  Float?
  activities    String?
  improvements  String?
  // Relations
  supplements   SupplementLog[]
  gymSession    GymSession?
}
```

### Relationships
- One-to-many: DailyEntry → SupplementLog
- One-to-one: DailyEntry → GymSession
- One-to-many: GymSession → GymExercise

## Data Flow
1. Form Submission → API Routes
2. Data Validation
3. Prisma Operations
4. Response Handling

## Schema Migrations
- Located in `prisma/migrations/`
- Run migrations: `npx prisma migrate dev`
- Reset database: `npx prisma reset`
