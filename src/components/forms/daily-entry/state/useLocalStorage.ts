import type { DailyEntryFormData } from './types';

const STORAGE_KEY = 'daily-entry-form-data';

const DEFAULT_FORM_DATA: DailyEntryFormData = {
  date: new Date().toISOString().split('T')[0],
  timeInOffice: 0,
  calories: 0,
  protein: 0,
  bodyWeight: '',
  gripStrength: '',
  activities: '',
  improvements: '',
  supplements: {
    creatine: false,
    vitaminC: false,
    vitaminD: false,
  },
  gymSession: {
    type: null,
    exercises: [],
  },
};

export function useLocalStorage(mode: 'create' | 'edit') {
  // Get initial data from localStorage
  const getStoredData = (): DailyEntryFormData => {
    if (typeof window === 'undefined') return DEFAULT_FORM_DATA;
    
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return DEFAULT_FORM_DATA;

    try {
      const parsed = JSON.parse(savedData);
      return {
        ...parsed,
        gymSession: parsed.gymSession || {
          type: null,
          exercises: [],
        },
      };
    } catch (e) {
      console.error('Failed to parse saved form data:', e);
      return DEFAULT_FORM_DATA;
    }
  };

  // Save data to localStorage
  const saveToStorage = (data: DailyEntryFormData) => {
    if (mode === 'create') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  };

  // Clear storage
  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    getStoredData,
    saveToStorage,
    clearStorage,
    STORAGE_KEY
  };
}
