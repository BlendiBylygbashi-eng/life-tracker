# Getting Started

## Prerequisites
- Node.js 16.x or higher
- npm or yarn
- Git

## Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd life-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configurations

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:3000`

## Development Tools

### Code Quality
- ESLint for linting
- Prettier for code formatting
- TypeScript for type checking

### Database Management
- Prisma Studio: `npx prisma studio`
- Database Reset: `npx prisma reset`

### Testing
- Run tests: `npm test`
- Coverage report: `npm run test:coverage`
