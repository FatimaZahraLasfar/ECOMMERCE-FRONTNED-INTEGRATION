import { Link } from 'react-router-dom';
import type { Movie, RecommendationContextState } from '../../types';
import { parseMovieLensTitle } from '../../utils/movieTitle';
import { MoviePoster } from './MoviePoster';
import { WatchlistButton } from './WatchlistButton';

interface MovieCardProps {
  movie: Movie;
  recommendationContext?: RecommendationContextState;
  rank?: number;
  className?: string;
}

export function MovieCard({
  movie,
  recommendationContext,
  rank,
  className = '',
}: MovieCardProps) {
  const parsed = parseMovieLensTitle(movie.title);
  const year = movie.releaseYear ?? parsed.releaseYear;
  const genreSummary = movie.genres?.slice(0, 2).join(' / ');

  const linkState = recommendationContext
    ? { movie, recommendationContext }
    : { movie };

  return (
    <article className={`group relative flex flex-col ${className}`}>
      <div className="relative">
        <Link
          to={`/movies/${movie.item_id}`}
          state={linkState}
          aria-label={`View details for ${parsed.cleanTitle}`}
          className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A93C]"
        >
          <MoviePoster
            itemId={movie.item_id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            releaseYear={year}
          />
          {/* Subtle hover scrim */}
          <div
            className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-hidden="true"
          />
          {typeof rank === 'number' && (
            <span className="pointer-events-none absolute top-2.5 left-2.5 rounded bg-[#09090B]/85 px-2 py-0.5 font-mono text-[11px] font-medium text-[#E5A93C] border border-white/10">
              #{String(rank).padStart(2, '0')}
            </span>
          )}
        </Link>

        <div className="absolute top-2.5 right-2.5 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-opacity duration-150">
          <WatchlistButton movie={movie} variant="icon" />
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <Link
          to={`/movies/${movie.item_id}`}
          state={linkState}
          className="block text-sm font-semibold text-[#F4F4F5] group-hover:text-[#E5A93C] transition-colors line-clamp-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93C]"
          title={parsed.cleanTitle}
        >
          {parsed.cleanTitle}
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA] truncate">
          {year ? (
            <span className="font-mono shrink-0">{year}</span>
          ) : (
            <span className="font-mono shrink-0">ID {movie.item_id}</span>
          )}
          {genreSummary && (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate">{genreSummary}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
