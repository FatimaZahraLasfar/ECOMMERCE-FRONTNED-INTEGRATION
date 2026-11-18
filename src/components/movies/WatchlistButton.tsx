import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useWatchlist } from '../../context/WatchlistContext';
import type { Movie } from '../../types';

interface WatchlistButtonProps {
  movie: Movie;
  variant?: 'icon' | 'full';
  className?: string;
}

export function WatchlistButton({
  movie,
  variant = 'full',
  className = '',
}: WatchlistButtonProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const saved = isInWatchlist(movie.item_id);

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWatchlist(movie);
        }}
        aria-pressed={saved}
        aria-label={
          saved
            ? `Remove ${movie.title} from watchlist`
            : `Add ${movie.title} to watchlist`
        }
        title={saved ? 'Remove from watchlist' : 'Save to watchlist'}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93C] ${
          saved
            ? 'border-[#E5A93C]/50 bg-[#E5A93C] text-[#09090B]'
            : 'border-white/15 bg-[#09090B]/80 text-[#F4F4F5] hover:border-white/30 hover:bg-[#18181D]'
        } ${className}`}
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Bookmark className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleWatchlist(movie)}
      aria-pressed={saved}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93C] ${
        saved
          ? 'border-[#E5A93C]/50 bg-[#E5A93C]/15 text-[#E5A93C] hover:bg-[#E5A93C]/25'
          : 'border-white/15 bg-[#18181D] text-[#F4F4F5] hover:border-white/30 hover:bg-white/5'
      } ${className}`}
    >
      {saved ? (
        <>
          <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
          <span>In Watchlist</span>
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" aria-hidden="true" />
          <span>Add to Watchlist</span>
        </>
      )}
    </button>
  );
}
