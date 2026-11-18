import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#121216] px-6 py-12 text-center">
      {icon && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#18181D] text-[#A1A1AA]">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#F4F4F5]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#A1A1AA] leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
