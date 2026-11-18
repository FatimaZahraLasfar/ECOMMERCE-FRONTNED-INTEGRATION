import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie, RecommendationContextState } from '../../types';
import { MovieCard } from './MovieCard';

interface MovieCarouselProps {
  movies: Movie[];
  recommendationBase?: Omit<RecommendationContextState, 'rank'>;
  ariaLabel?: string;
}

export function MovieCarousel({
  movies,
  recommendationBase,
  ariaLabel = 'Recommended movies',
}: MovieCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.75, 280);
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByAmount('left')}
          aria-label="Scroll movies left"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#121216] text-[#F4F4F5] hover:border-white/25 hover:bg-[#18181D] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93C]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount('right')}
          aria-label="Scroll movies right"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#121216] text-[#F4F4F5] hover:border-white/25 hover:bg-[#18181D] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93C]"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') scrollByAmount('right');
          if (e.key === 'ArrowLeft') scrollByAmount('left');
        }}
        className="cinema-scroll flex gap-5 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A93C]"
      >
        {movies.map((movie, index) => (
          <div key={movie.item_id} className="w-44 sm:w-48 md:w-52 shrink-0">
            <MovieCard
              movie={movie}
              rank={recommendationBase ? index + 1 : undefined}
              recommendationContext={
                recommendationBase
                  ? { ...recommendationBase, rank: index + 1 }
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
