import { theme } from '@/styles/theme';
import type { EntryWithTimestamp } from './dataTransformers';

export interface ChartDataset {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointHoverBackgroundColor?: string;
    pointHoverBorderColor?: string;
  }>;
}

export function createTimeData(entries: EntryWithTimestamp[], labels: string[]): ChartDataset {
  return {
    labels,
    datasets: [{
      label: 'Hours',
      data: entries.map(entry => entry.timeInOffice),
      borderColor: theme.colors.metrics.office,
      backgroundColor: `${theme.colors.metrics.office}15`,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'white',
      pointBorderColor: theme.colors.metrics.office,
      pointHoverBackgroundColor: theme.colors.metrics.office,
      pointHoverBorderColor: 'white',
    }]
  };
}

export function createCaloriesData(entries: EntryWithTimestamp[], labels: string[]): ChartDataset {
  return {
    labels,
    datasets: [{
      label: 'Calories',
      data: entries.map(entry => entry.calories),
      borderColor: theme.colors.metrics.calories,
      backgroundColor: theme.colors.metrics.calories + '20',
      tension: 0.4,
      fill: true,
    }]
  };
}

export function createProteinData(entries: EntryWithTimestamp[], labels: string[]): ChartDataset {
  return {
    labels,
    datasets: [{
      label: 'Protein (g)',
      data: entries.map(entry => entry.protein),
      borderColor: theme.colors.metrics.protein,
      backgroundColor: theme.colors.metrics.protein + '20',
      tension: 0.4,
      fill: true,
    }]
  };
}

export function createGripStrengthData(entries: EntryWithTimestamp[], labels: string[]): ChartDataset {
  return {
    labels,
    datasets: [{
      label: 'Grip Strength (kg)',
      data: entries.map(entry => entry.gripStrength),
      borderColor: theme.colors.primary[500],
      backgroundColor: theme.colors.primary[500] + '20',
      tension: 0.4,
      fill: true,
    }]
  };
}

export function createBodyWeightData(entries: EntryWithTimestamp[], labels: string[]): ChartDataset {
  return {
    labels,
    datasets: [{
      label: 'Body Weight (lbs)',
      data: entries.map(entry => entry.bodyWeight),
      borderColor: theme.colors.primary[500],
      backgroundColor: theme.colors.primary[500] + '20',
      tension: 0.4,
      fill: true,
    }]
  };
}

// Similar functions for other datasets...
