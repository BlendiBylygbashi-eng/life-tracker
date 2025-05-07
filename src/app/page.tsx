import { DailyEntryForm } from '@/components/forms/daily-entry';

export default function Home() {
  return (
    <div className="container mx-auto px-4 -mt-4 pb-20 sm:py-8 sm:mt-0">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8">Life Tracker</h1>
      <DailyEntryForm />
    </div>
  );
}
