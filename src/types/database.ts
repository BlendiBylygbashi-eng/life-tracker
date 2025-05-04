export type DailyEntry = {
    id: string;
    date: string;
    time_in_office: number;
    calories: number;
    protein: number;
    body_weight: number | null;
    grip_strength: number | null;
    activities: string | null;
    improvements: string | null;
    created_at: string;
    updated_at: string;
}

export type SupplementLog = {
    id: string;
    entry_id: string;
    supplement_name: 'creatine' | 'vitamin_c' | 'vitamin_d';
    taken: boolean;
}

export type GymSession = {
    id: string;
    entry_id: string;
    type: 'push' | 'pull' | 'legs & shoulder' | 'other';
}

export type GymExercise = {
    id: string;
    session_id: string;
    name: string;
    weight: number;
    reps: number;
    order: number;
}

// Helper type for joined data
export type DailyEntryWithRelations = DailyEntry & {
    supplements: SupplementLog[];
    gym_session: (GymSession & {
        exercises: GymExercise[];
    }) | null;
}
