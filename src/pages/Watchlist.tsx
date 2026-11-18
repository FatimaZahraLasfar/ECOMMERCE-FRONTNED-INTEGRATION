import { Bookmark, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { MovieGrid } from '../components/movies/MovieGrid';
import { useWatchlist } from '../context/WatchlistContext';

export function Watchlist() {
  const { items, clearWatchlist } = useWatchlist();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/8 pb-6">
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#E5A93C]">
            Saved Films · Stored Locally
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F4F5]">
            Personal Watchlist
          </h1>
          <p className="text-sm text-[#A1A1AA]">
            Movies you bookmark from recommendations or the MovieLens catalog
            are persisted locally in your browser.
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearWatchlist}
            className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-[#121216] px-4 py-2 text-xs font-medium text-[#A1A1AA] hover:border-red-500/35 hover:text-red-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Clear Watchlist</span>
          </button>
        )}
      </header>

      {items.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="h-6 w-6" aria-hidden="true" />}
          title="Your watchlist is empty"
          description="Save films from your personalized recommendations or browse the local MovieLens catalog to add titles here."
          action={
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="rounded-lg bg-[#E5A93C] px-4 py-2.5 text-xs font-semibold text-[#09090B] hover:bg-[#F0B952] transition-colors"
              >
                Explore Recommendations
              </Link>
              <Link
                to="/discover"
                className="rounded-lg border border-white/12 bg-[#18181D] px-4 py-2.5 text-xs font-medium text-[#F4F4F5] hover:border-white/25 transition-colors"
              >
                Browse Catalog
              </Link>
            </div>
          }
        />
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-[#A1A1AA]">
            <span className="font-mono text-[#F4F4F5]">{items.length}</span>{' '}
            {items.length === 1 ? 'film' : 'films'} saved
          </p>
          <MovieGrid movies={items} />
        </div>
      )}
    </div>
  );
}
