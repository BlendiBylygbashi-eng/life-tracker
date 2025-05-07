const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Create a sample daily entry
  await prisma.dailyEntry.create({
    data: {
      date: new Date(),
      timeInOffice: 8,
      calories: 2000,
      protein: 120,
      bodyWeight: 170,
      gripStrength: 50,
      activities: "Initial setup",
      improvements: "First deployment",
      supplements: {
        create: [
          { supplementName: "creatine", taken: true },
          { supplementName: "vitamin_c", taken: true },
          { supplementName: "vitamin_d", taken: true }
        ]
      },
      gymSession: {
        create: {
          type: "push",
          exercises: {
            create: [
              { name: "Bench Press", weight: 135, reps: 10, order: 0 },
              { name: "Shoulder Press", weight: 95, reps: 10, order: 1 }
            ]
          }
        }
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })