interface LoadingSkeletonProps {
  variant?: 'carousel' | 'grid' | 'dashboard' | 'details';
  count?: number;
}

export function LoadingSkeleton({
  variant = 'grid',
  count = 5,
}: LoadingSkeletonProps) {
  if (variant === 'carousel') {
    return (
      <div
        className="flex gap-5 overflow-hidden"
        aria-busy="true"
        aria-label="Loading movie recommendations"
      >
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="w-48 sm:w-52 shrink-0 space-y-3">
            <div className="aspect-[3/4] w-full rounded-lg bg-[#18181D] animate-pulse border border-white/5" />
            <div className="h-4 w-4/5 rounded bg-[#18181D] animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-[#18181D] animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'dashboard') {
    return (
      <div
        className="space-y-6"
        aria-busy="true"
        aria-label="Loading experiment analytics"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-28 rounded-xl bg-[#121216] border border-white/8 animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 rounded-xl bg-[#121216] border border-white/8 animate-pulse" />
          <div className="h-80 rounded-xl bg-[#121216] border border-white/8 animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === 'details') {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12"
        aria-busy="true"
        aria-label="Loading movie details"
      >
        <div className="md:col-span-4 lg:col-span-3">
          <div className="aspect-[3/4] w-full rounded-xl bg-[#18181D] animate-pulse border border-white/8" />
        </div>
        <div className="md:col-span-8 lg:col-span-9 space-y-5">
          <div className="h-10 w-2/3 rounded bg-[#18181D] animate-pulse" />
          <div className="h-4 w-1/3 rounded bg-[#18181D] animate-pulse" />
          <div className="h-24 w-full rounded bg-[#18181D] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
      aria-busy="true"
      aria-label="Loading movies"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="space-y-3">
          <div className="aspect-[3/4] w-full rounded-lg bg-[#18181D] animate-pulse border border-white/5" />
          <div className="h-4 w-4/5 rounded bg-[#18181D] animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-[#18181D] animate-pulse" />
        </div>
      ))}
    </div>
  );
}
