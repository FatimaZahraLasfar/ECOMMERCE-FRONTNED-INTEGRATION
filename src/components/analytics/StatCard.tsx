import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: ReactNode;
  accent?: 'default' | 'amber' | 'sky' | 'emerald';
}

export function StatCard({
  label,
  value,
  sublabel,
  icon,
  accent = 'default',
}: StatCardProps) {
  const valueColor =
    accent === 'amber'
      ? 'text-[#E5A93C]'
      : accent === 'sky'
        ? 'text-sky-300'
        : accent === 'emerald'
          ? 'text-emerald-400'
          : 'text-[#F4F4F5]';

  return (
    <div className="rounded-xl border border-white/8 bg-[#121216] p-5 space-y-2.5">
      <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#A1A1AA]">
        <span>{label}</span>
        {icon && <span className="text-[#A1A1AA]">{icon}</span>}
      </div>
      <div
        className={`font-mono text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums ${valueColor}`}
      >
        {value}
      </div>
      {sublabel && (
        <p className="text-xs text-[#A1A1AA] leading-relaxed">{sublabel}</p>
      )}
    </div>
  );
}
