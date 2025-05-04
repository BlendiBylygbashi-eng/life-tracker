# 📘 Life Tracker App Structure Guide

## 🌳 High-Level Directory Structure

```text
├── .next/                    # 🔧 Build output from Next.js
├── node_modules/             # 📦 Installed dependencies
├── prisma/                   # 🧬 Prisma schema and DB migrations
│   └── schema.prisma         # - Defines your database models
├── public/                   # 🖼 Static files (images, icons, etc.)
├── src/                      # 💡 Main application source code
│   ├── app/                  # 🚏 Next.js 13+ App Router (routes like /dashboard)
│   ├── components/           # 🧩 All reusable UI components
│   │   ├── ui/               # - Generic UI elements (e.g. Navbar, Buttons)
│   │   ├── forms/            # - Daily entry form components
│   │   └── dashboard/        # - Dashboard visual and graph components
│   └── lib/                  # 🧠 Business logic, utilities, and DB client
│       ├── prisma.ts         # - Prisma Client instance
│       ├── calculations.ts   # - Utility calculations (e.g. streaks, goals)
│       └── workoutData.ts    # - Predefined workouts/exercises
├── package.json              # 📄 Project metadata and scripts
├── tailwind.config.ts        # 🎨 Tailwind CSS configuration
└── tsconfig.json             # ⚙️ TypeScript configuration
```


---

## 🔧 Key Features

### ✅ Daily Tracking
- Time in office  
- Calories and protein  
- Body weight  
- Grip strength  

### 🏋️ Workout Logging
- Push, Pull, Legs/Shoulders, Other  
- Exercises with sets and reps  
- Weekly and all-time progress  

### 💊 Supplement Tracking
- Creatine  
- Vitamin C  
- Vitamin D  

### 📈 Data Visualization
- Weekly charts  
- Strength progress  
- Goal achievement  

---

## 💻 Technical Stack

| Category     | Tool              |
|--------------|-------------------|
| Framework    | Next.js 13+       |
| Language     | TypeScript        |
| Database     | SQLite with Prisma|
| Styling      | Tailwind CSS      |
| Charts       | Chart.js          |
| Animations   | Framer Motion     |

---

## 🔐 State Management

- **Form State**: Persisted using `localStorage`  
- **Server State**: Managed via API routes  
- **UI Reactivity**: React state & hooks  

---

## 🎨 UI/UX Features

- Responsive layout  
- Animated particle backgrounds (on entry page)  
- Interactive charts & smooth progress rings  
- Clean, modern interface  
- Persistent form inputs  

---

## ✅ Benefits of This Structure

- Easy feature additions  
- Clear separation of concerns  
- Modular and scalable  
- Maintainable codebase  
- Efficient dev workflow with AI support  
