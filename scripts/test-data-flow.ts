const { PrismaClient } = require('@prisma/client')
const testCases = require('./test-cases')

const prisma = new PrismaClient()

// Get test cases from command line arguments
const testsToRun = process.argv.slice(2)

async function runTests() {
    console.log("Starting systematic tests...")
    
    try {
        // If specific tests are specified, run only those
        const casesToTest = testsToRun.length > 0 
            ? Object.entries(testCases).filter(([name]) => testsToRun.includes(name))
            : Object.entries(testCases)

        console.log(`\n=== Testing ${testsToRun.length ? 'Selected' : 'All'} Entries ===`)
        for (const [caseName, testData] of casesToTest) {
            console.log(`\nCreating ${caseName} entry...`)
            const entry = await createEntry(testData)
            await verifyEntry(entry, testData)
        }

        // Display results
        console.log("\n=== Verifying All Entries ===")
        await displayAllEntries()

    } catch (error) {
        console.error("Test failed:", error)
    } finally {
        await prisma.$disconnect()
    }
}

async function createEntry(data) {
    // Transform the test data into the format expected by Prisma
    const prismaData = {
        date: new Date(data.date),  // Ensure it's a Date object
        timeInOffice: Number(data.timeInOffice),  // Ensure it's a number
        calories: Number(data.calories),
        protein: Number(data.protein),
        bodyWeight: data.bodyWeight ? Number(data.bodyWeight) : null,
        gripStrength: data.gripStrength ? Number(data.gripStrength) : null,
        activities: data.activities || null,
        improvements: data.improvements || null,
        supplements: {
            create: [
                {
                    supplementName: 'creatine',
                    taken: Boolean(data.supplements.creatine)
                },
                {
                    supplementName: 'vitamin_c',
                    taken: Boolean(data.supplements.vitamin_c)
                },
                {
                    supplementName: 'vitamin_d',
                    taken: Boolean(data.supplements.vitamin_d)
                }
            ]
        },
        ...(data.gymSession && {
            gymSession: {
                create: {
                    type: String(data.gymSession.type),
                    exercises: {
                        create: data.gymSession.exercises.map(ex => ({
                            name: String(ex.name),
                            weight: Number(ex.weight),
                            reps: Number(ex.reps),
                            order: Number(ex.order)
                        }))
                    }
                }
            }
        })
    }

    return await prisma.dailyEntry.create({
        data: prismaData,
        include: {
            supplements: true,
            gymSession: {
                include: {
                    exercises: true
                }
            }
        }
    })
}

async function verifyEntry(createdEntry, expectedData) {
    console.log("Verifying entry...")
    
    // Verify basic fields
    const basicFields = ['timeInOffice', 'calories', 'protein', 'bodyWeight', 'gripStrength', 'activities', 'improvements'];
    basicFields.forEach(field => {
        if (expectedData[field]) {
            console.log(`Checking ${field}...`)
            if (createdEntry[field] !== expectedData[field]) {
                throw new Error(`Mismatch in ${field}: expected ${expectedData[field]}, got ${createdEntry[field]}`)
            }
        }
    })

    // Verify supplements
    console.log("Checking supplements...")
    Object.entries(expectedData.supplements).forEach(([name, taken]) => {
        const found = createdEntry.supplements.find(s => s.supplementName === name)
        if (!found || found.taken !== taken) {
            throw new Error(`Supplement mismatch for ${name}`)
        }
    })

    // Verify gym session if present
    if (expectedData.gymSession) {
        console.log("Checking gym session...")
        if (!createdEntry.gymSession) {
            throw new Error("Expected gym session but none found")
        }
        if (createdEntry.gymSession.type !== expectedData.gymSession.type) {
            throw new Error(`Gym session type mismatch: expected ${expectedData.gymSession.type}, got ${createdEntry.gymSession.type}`)
        }

        // Verify exercises
        console.log("Checking exercises...")
        expectedData.gymSession.exercises.forEach((expectedEx, index) => {
            const actualEx = createdEntry.gymSession.exercises[index]
            if (!actualEx) {
                throw new Error(`Missing exercise at index ${index}`)
            }
            if (actualEx.name !== expectedEx.name || 
                actualEx.weight !== expectedEx.weight || 
                actualEx.reps !== expectedEx.reps || 
                actualEx.order !== expectedEx.order) {
                throw new Error(`Exercise mismatch at index ${index}`)
            }
        })
    }

    console.log("✓ Entry verified successfully")
}

async function displayAllEntries() {
    const entries = await prisma.dailyEntry.findMany({
        include: {
            supplements: true,
            gymSession: {
                include: {
                    exercises: true
                }
            }
        },
        orderBy: {
            date: 'desc'
        }
    })

    console.log(`Found ${entries.length} entries.\n`)
    
    entries.forEach((entry, index) => {
        console.log(`\n--- Entry ${index + 1} ---`)
        console.log(`Date: ${entry.date}`)
        console.log(`Time in Office: ${entry.timeInOffice} hours`)
        console.log(`Calories: ${entry.calories}`)
        console.log(`Protein: ${entry.protein}g`)
        console.log(`Body Weight: ${entry.bodyWeight || 'Not recorded'}`)
        console.log(`Grip Strength: ${entry.gripStrength || 'Not recorded'}`)
        
        console.log('\nSupplements taken:')
        entry.supplements.forEach(supp => {
            console.log(`- ${supp.supplementName}: ${supp.taken ? 'Yes' : 'No'}`)
        })

        if (entry.gymSession) {
            console.log('\nGym Session:')
            console.log(`Type: ${entry.gymSession.type}`)
            console.log('Exercises:')
            entry.gymSession.exercises.forEach(ex => {
                console.log(`- ${ex.name}: ${ex.weight}kg x ${ex.reps} reps`)
            })
        } else {
            console.log('\nNo gym session recorded')
        }
        console.log('-------------------')
    })
}

runTests()
