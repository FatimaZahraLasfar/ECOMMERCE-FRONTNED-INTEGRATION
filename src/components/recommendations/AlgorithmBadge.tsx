import { Cpu } from 'lucide-react';
import { formatAlgoLabel } from '../../utils/movieTitle';

interface AlgorithmBadgeProps {
  algo: string;
}

export function AlgorithmBadge({ algo }: AlgorithmBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-[#18181D] px-2.5 py-1 text-xs font-medium text-[#F4F4F5] whitespace-nowrap shrink-0">
      <Cpu className="h-3.5 w-3.5 text-[#A1A1AA]" aria-hidden="true" />
      <span>Model: {formatAlgoLabel(algo)}</span>
    </span>
  );
}
