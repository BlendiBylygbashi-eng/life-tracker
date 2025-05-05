import { DailyEntryForm } from '@/components/forms/daily-entry';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Life Tracker</h1>
      <DailyEntryForm />
    </div>
  );
}
