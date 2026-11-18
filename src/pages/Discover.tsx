import { useMemo, useState } from 'react';
import { Film, Search, X } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { MovieGrid } from '../components/movies/MovieGrid';
import { AVAILABLE_GENRES } from '../data/movies';
import { getLocalCatalogMovies } from '../services/movieMetadataService';
import { parseMovieLensTitle } from '../utils/movieTitle';

type SortOption = 'title-asc' | 'title-desc' | 'year-desc' | 'year-asc' | 'id-asc';

export function Discover() {
  const allMovies = useMemo(() => getLocalCatalogMovies(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');

  const filteredMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = allMovies.filter((movie) => {
      const matchesSearch =
        !query ||
        movie.title.toLowerCase().includes(query) ||
        String(movie.item_id).includes(query);

      const matchesGenre =
        selectedGenre === 'ALL' ||
        Boolean(movie.genres?.includes(selectedGenre));

      return matchesSearch && matchesGenre;
    });

    return [...filtered].sort((a, b) => {
      const titleA = parseMovieLensTitle(a.title).cleanTitle;
      const titleB = parseMovieLensTitle(b.title).cleanTitle;
      const yearA = a.releaseYear ?? parseMovieLensTitle(a.title).releaseYear ?? 0;
      const yearB = b.releaseYear ?? parseMovieLensTitle(b.title).releaseYear ?? 0;

      switch (sortBy) {
        case 'title-desc':
          return titleB.localeCompare(titleA);
        case 'year-desc':
          return yearB - yearA || titleA.localeCompare(titleB);
        case 'year-asc':
          return yearA - yearB || titleA.localeCompare(titleB);
        case 'id-asc':
          return a.item_id - b.item_id;
        case 'title-asc':
        default:
          return titleA.localeCompare(titleB);
      }
    });
  }, [allMovies, searchQuery, selectedGenre, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('ALL');
    setSortBy('title-asc');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <header className="border-b border-white/8 pb-6 space-y-2">
        <p className="text-xs font-medium text-[#E5A93C]">
          Local MovieLens 100K Metadata Catalog
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F4F5]">
          Movie Catalog
        </h1>
        <p className="max-w-2xl text-sm text-[#A1A1AA] leading-relaxed">
          Browse curated films from the local MovieLens 100K metadata adapter.
          Catalog browsing is client-side only and does not invoke personalized
          ML inference or A/B feedback tracking.
        </p>
      </header>

      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by movie title or MovieLens ID…"
            aria-label="Search movie catalog"
            className="w-full rounded-lg border border-white/12 bg-[#121216] py-2.5 pl-10 pr-9 text-sm text-[#F4F4F5] placeholder:text-[#A1A1AA]/70 focus:border-[#E5A93C] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[#A1A1AA] hover:text-[#F4F4F5] cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="catalog-sort"
            className="text-xs font-medium text-[#A1A1AA] whitespace-nowrap"
          >
            Sort by
          </label>
          <select
            id="catalog-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-white/12 bg-[#121216] px-3 py-2 text-sm text-[#F4F4F5] focus:border-[#E5A93C] focus:outline-none cursor-pointer"
          >
            <option value="title-asc">Title (A–Z)</option>
            <option value="title-desc">Title (Z–A)</option>
            <option value="year-desc">Release Year (Newest)</option>
            <option value="year-asc">Release Year (Oldest)</option>
            <option value="id-asc">MovieLens ID (Asc)</option>
          </select>
        </div>
      </div>

      {/* Interactive Genre Filter Bar */}
      <div
        role="group"
        aria-label="Filter catalog by genre"
        className="flex flex-wrap items-center gap-1.5"
      >
        <button
          type="button"
          onClick={() => setSelectedGenre('ALL')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            selectedGenre === 'ALL'
              ? 'bg-[#E5A93C] text-[#09090B] font-semibold'
              : 'bg-[#121216] text-[#A1A1AA] border border-white/8 hover:text-[#F4F4F5]'
          }`}
        >
          All Genres
        </button>
        {AVAILABLE_GENRES.map((genre) => (
          <button
            key={genre}
            type="button"
            onClick={() => setSelectedGenre(genre)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              selectedGenre === genre
                ? 'bg-[#E5A93C] text-[#09090B] font-semibold'
                : 'bg-[#121216] text-[#A1A1AA] border border-white/8 hover:text-[#F4F4F5]'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="text-xs text-[#A1A1AA]">
        Showing{' '}
        <span className="font-mono text-[#F4F4F5]">{filteredMovies.length}</span>{' '}
        of <span className="font-mono text-[#F4F4F5]">{allMovies.length}</span>{' '}
        cataloged films
      </div>

      {filteredMovies.length === 0 ? (
        <EmptyState
          icon={<Film className="h-6 w-6" aria-hidden="true" />}
          title="No matching films found"
          description="Try clearing your search query or selecting a different MovieLens genre filter."
          action={
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg bg-[#E5A93C] px-4 py-2 text-xs font-semibold text-[#09090B] cursor-pointer"
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <MovieGrid movies={filteredMovies} />
      )}
    </div>
  );
}
