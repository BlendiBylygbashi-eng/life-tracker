'use client';
import dynamic from 'next/dynamic';
import DailyEntryForm from './DailyEntryForm';

// This wrapper ensures the component only renders on client side
export default dynamic(() => Promise.resolve(DailyEntryForm), { 
  ssr: false 
});
