module.exports = {
  // Basic entry with minimal required data
  minimal: {
    date: new Date(),
    timeInOffice: 8,
    calories: 2000,
    protein: 150,
    supplements: {
      creatine: false,
      vitamin_c: false,
      vitamin_d: false
    }
  },

  // Complete entry with all fields
  complete: {
    date: new Date(),
    timeInOffice: 9.5,
    calories: 1513,
    protein: 202,
    bodyWeight: 205,
    gripStrength: 63,
    activities: "Completed project milestone",
    improvements: "Could have taken more breaks",
    supplements: {
      creatine: true,
      vitamin_c: true,
      vitamin_d: true
    },
    gymSession: {
      type: "push",
      exercises: [
        {
          name: "Flat Bench Press",
          weight: 200,
          reps: 5,
          order: 0
        },
        {
          name: "Incline Dumbbell Press",
          weight: 90,
          reps: 12,
          order: 1
        }
      ]
    }
  },

  // Entry with different gym session type
  pullDay: {
    date: new Date(),
    timeInOffice: 8.5,
    calories: 1800,
    protein: 180,
    bodyWeight: 204,
    gripStrength: 62,
    supplements: {
      creatine: true,
      vitamin_c: false,
      vitamin_d: true
    },
    gymSession: {
      type: "pull",
      exercises: [
        {
          name: "Barbell Row",
          weight: 140,
          reps: 8,
          order: 0
        },
        {
          name: "Pull-ups",
          weight: 0,
          reps: 12,
          order: 1
        }
      ]
    }
  },

  // Valid entry with common values
  typical: {
    date: new Date(),
    timeInOffice: 8.5,      // Valid half-hour increment
    calories: 2000,         // Whole number
    protein: 180,           // Whole number
    bodyWeight: 185,        // Whole number
    gripStrength: 45,       // Whole number
    supplements: {
      creatine: true,
      vitamin_c: true,
      vitamin_d: false
    }
  },

  // Edge case with maximum values
  maxValues: {
    date: new Date(),
    timeInOffice: 24,       // Max allowed hours
    calories: 5000,         // High but possible
    protein: 300,           // High but possible
    bodyWeight: 300,        // High but possible
    gripStrength: 100,      // High but possible
    supplements: {
      creatine: true,
      vitamin_c: true,
      vitamin_d: true
    }
  },

  // Edge case with minimum values
  minValues: {
    date: new Date(),
    timeInOffice: 0,        // Min allowed hours
    calories: 500,          // Low but possible
    protein: 0,             // Minimum
    bodyWeight: 100,        // Low but possible
    gripStrength: 10,       // Low but possible
    supplements: {
      creatine: false,
      vitamin_c: false,
      vitamin_d: false
    }
  },

  // Testing Legs & Shoulder session type with predefined exercises
  legsAndShoulder: {
    date: new Date(),
    timeInOffice: 8.5,
    calories: 2200,
    protein: 190,
    bodyWeight: 185,
    gripStrength: 45,
    activities: "Good leg day, hit PR on squats",
    improvements: "Could improve shoulder press form",
    supplements: {
      creatine: true,
      vitamin_c: true,
      vitamin_d: true
    },
    gymSession: {
      type: "legs & shoulder",
      exercises: [
        {
          name: "Squats",  // From predefined list
          weight: 185,
          reps: 5,
          order: 0
        },
        {
          name: "Barbell Standing Shoulder Press",  // From predefined list
          weight: 105,
          reps: 8,
          order: 1
        },
        {
          name: "Dumbbell Lateral Raise",  // From predefined list
          weight: 25,
          reps: 12,
          order: 2
        }
      ]
    }
  },

  // Testing Other session type with custom exercises
  otherSession: {
    date: new Date(),
    timeInOffice: 7.5,
    calories: 1900,
    protein: 170,
    bodyWeight: 184,
    gripStrength: 44,
    activities: "Mixed workout focusing on core and cardio",
    improvements: "Need more structure in mixed sessions",
    supplements: {
      creatine: true,
      vitamin_c: true,
      vitamin_d: false
    },
    gymSession: {
      type: "other",
      exercises: [
        {
          name: "Weighted Planks",  // Custom exercise
          weight: 45,
          reps: 60,  // seconds
          order: 0
        },
        {
          name: "Battle Ropes",  // Custom exercise
          weight: 0,
          reps: 30,  // seconds
          order: 1
        },
        {
          name: "Box Jumps",  // Custom exercise
          weight: 0,
          reps: 20,
          order: 2
        }
      ]
    }
  },

  // Testing mixed predefined and custom exercises in a push session
  mixedPushSession: {
    date: new Date(),
    timeInOffice: 8.5,
    calories: 2100,
    protein: 180,
    bodyWeight: 185,
    gripStrength: 45,
    activities: "Push day with some custom exercises",
    improvements: "Good session mixing standard and variations",
    supplements: {
      creatine: true,
      vitamin_c: true,
      vitamin_d: true
    },
    gymSession: {
      type: "push",
      exercises: [
        {
          name: "Flat Bench Press",  // From predefined list
          weight: 200,
          reps: 5,
          order: 0
        },
        {
          name: "Landmine Press",  // Custom exercise
          weight: 90,
          reps: 12,
          order: 1
        },
        {
          name: "Pec Fly Machine",  // From predefined list
          weight: 140,
          reps: 12,
          order: 2
        },
        {
          name: "Plate Front Raise",  // Custom exercise
          weight: 45,
          reps: 15,
          order: 3
        }
      ]
    }
  },

  // Testing pull session with only custom exercises
  customPullSession: {
    date: new Date(),
    timeInOffice: 8.0,
    calories: 2000,
    protein: 185,
    bodyWeight: 186,
    gripStrength: 46,
    activities: "Pull day with all custom exercises",
    improvements: "Good mind-muscle connection on cable work",
    supplements: {
      creatine: true,
      vitamin_c: true,
      vitamin_d: true
    },
    gymSession: {
      type: "pull",
      exercises: [
        {
          name: "Meadows Row",  // Custom exercise
          weight: 135,
          reps: 10,
          order: 0
        },
        {
          name: "Straight Arm Pulldown",  // Custom exercise
          weight: 65,
          reps: 15,
          order: 1
        },
        {
          name: "Single Arm Machine Row",  // Custom exercise
          weight: 160,
          reps: 12,
          order: 2
        },
        {
          name: "Reverse Pec Deck",  // Custom exercise
          weight: 110,
          reps: 15,
          order: 3
        }
      ]
    }
  }
}
