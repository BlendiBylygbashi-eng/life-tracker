import type { PersonalRecords } from '../utils/types';
import { StrengthStandards } from './StrengthStandards';

interface StrengthSectionProps {
  personalRecords: PersonalRecords;
  latestBodyWeight: number | undefined;
}

export function StrengthSection({ personalRecords, latestBodyWeight }: StrengthSectionProps) {
  if (!latestBodyWeight) {
    return null;
  }

  return (
    <div className="mb-8">
      <StrengthStandards 
        personalRecords={personalRecords}
        bodyWeight={latestBodyWeight}
      />
    </div>
  );
}
