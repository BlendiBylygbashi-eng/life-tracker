/**
 * Type for exercise data in request payload
 */
interface ExerciseRequestData {
    name: string;
    weight: string | number;
    reps: string | number;
    order: number;
  }
  
  /**
   * Type for gym session data in request payload
   */
  interface GymSessionRequestData {
    type: string;
    exercises: ExerciseRequestData[];
  }
  
  /**
   * Type for entry request data
   */
  export interface EntryRequestData {
    date: string;
    timeInOffice: string | number;
    calories: string | number;
    protein: string | number;
    bodyWeight?: string | number | null;
    gripStrength?: string | number | null;
    activities: string;
    improvements: string;
    supplements: {
      creatine: boolean;
      vitaminC: boolean;
      vitaminD: boolean;
    };
    gymSession?: GymSessionRequestData;
  }
  
  /**
   * Transforms exercise data from request to database format
   */
  export function transformExerciseData(ex: ExerciseRequestData) {
    return {
      name: ex.name,
      weight: parseFloat(ex.weight as string),
      reps: parseInt(ex.reps as string),
      order: ex.order,
    };
  }
  
  /**
   * Transforms entry data from request to database format
   */
  export function transformEntryData(data: EntryRequestData) {
    return {
      date: new Date(data.date),
      timeInOffice: parseFloat(data.timeInOffice as string),
      calories: parseInt(data.calories as string),
      protein: parseInt(data.protein as string),
      bodyWeight: data.bodyWeight ? parseFloat(data.bodyWeight as string) : null,
      gripStrength: data.gripStrength ? parseFloat(data.gripStrength as string) : null,
      activities: data.activities,
      improvements: data.improvements,
      supplements: {
        create: [
          { supplementName: 'creatine', taken: data.supplements.creatine },
          { supplementName: 'vitamin_c', taken: data.supplements.vitaminC },
          { supplementName: 'vitamin_d', taken: data.supplements.vitaminD },
        ],
      },
    };
  }