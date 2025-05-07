import type { DailyEntryFormData } from './types';
import { useState, useEffect } from 'react';

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

export function useLocalStorage(mode: string, initialValue?: DailyEntryFormData) {
  const key = STORAGE_KEY;
  const defaultValue = initialValue || DEFAULT_FORM_DATA;
  
  const [storedValue, setStoredValue] = useState<DailyEntryFormData>(defaultValue);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          setStoredValue(parsed);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [key]);

  const getStoredData = (): DailyEntryFormData => {
    if (typeof window === 'undefined') return defaultValue;
    
    const savedData = localStorage.getItem(key);
    if (!savedData) return defaultValue;

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
      return defaultValue;
    }
  };

  const saveToStorage = (data: DailyEntryFormData) => {
    if (mode === 'create') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const clearStorage = () => {
    localStorage.removeItem(key);
  };

  return {
    getStoredData,
    saveToStorage,
    clearStorage,
    key
  };
}

export { DEFAULT_FORM_DATA };
