import { Film } from 'lucide-react';
import type { ExperimentArm } from '../../types';

interface RecommendationBadgeProps {
  arm: ExperimentArm;
  algo: string;
  fallback?: boolean;
  rank?: number;
}

export function RecommendationBadge({
  arm,
  algo,
  fallback,
  rank,
}: RecommendationBadgeProps) {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-md border border-[#E5A93C]/30 bg-[#E5A93C]/10 px-3 py-1.5 text-xs text-[#F4F4F5]">
      <Film className="h-3.5 w-3.5 text-[#E5A93C]" aria-hidden="true" />
      <span>
        Recommended via{' '}
        <strong className="font-semibold text-[#E5A93C]">
          {algo.toUpperCase()}
        </strong>{' '}
        ({arm})
      </span>
      {typeof rank === 'number' && (
        <>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-[#A1A1AA]">Rank #{rank}</span>
        </>
      )}
      {fallback && (
        <>
          <span aria-hidden="true">·</span>
          <span className="text-amber-300">Fallback Active</span>
        </>
      )}
    </div>
  );
}
