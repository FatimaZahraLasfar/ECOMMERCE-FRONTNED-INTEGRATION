import { FlaskConical } from 'lucide-react';
import type { ExperimentArm } from '../../types';
import { formatArmLabel } from '../../utils/movieTitle';

interface ExperimentArmBadgeProps {
  arm: ExperimentArm;
}

export function ExperimentArmBadge({ arm }: ExperimentArmBadgeProps) {
  const isChallenger = arm === 'challenger';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 ${
        isChallenger
          ? 'border-[#E5A93C]/40 bg-[#E5A93C]/12 text-[#E5A93C]'
          : 'border-sky-400/35 bg-sky-400/10 text-sky-300'
      }`}
    >
      <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Arm: {formatArmLabel(arm)}</span>
    </span>
  );
}
