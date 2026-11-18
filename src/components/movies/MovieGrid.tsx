import type { Movie } from '../../types';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
      {movies.map((movie) => (
        <MovieCard key={movie.item_id} movie={movie} />
      ))}
    </div>
  );
}
