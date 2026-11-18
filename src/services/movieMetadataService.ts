import axios from 'axios';
import { MOVIELENS_BY_ID, MOVIELENS_METADATA_CATALOG } from '../data/movies';
import type { BackendRecommendationItem, Movie } from '../types';
import { parseMovieLensTitle } from '../utils/movieTitle';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY?.trim() || '';
const tmdbCache = new Map<string, Partial<Movie>>();

/**
 * Merges a backend recommendation item (item_id + title) with local MovieLens
 * metadata without ever inventing missing fields.
 */
export function adaptBackendItemToMovie(item: BackendRecommendationItem): Movie {
  const local = MOVIELENS_BY_ID[item.item_id];
  const parsed = parseMovieLensTitle(item.title);

  if (local) {
    return {
      ...local,
      item_id: item.item_id,
      title: item.title,
      releaseYear: local.releaseYear ?? parsed.releaseYear,
    };
  }

  return {
    item_id: item.item_id,
    title: item.title,
    releaseYear: parsed.releaseYear,
    hasLocalMetadata: false,
  };
}

/**
 * Resolves a movie by MovieLens item_id for the Movie Details page.
 * Uses local metadata catalog first, and optionally enriches via TMDB if VITE_TMDB_API_KEY is configured.
 */
export async function resolveMovieMetadata(
  itemId: number,
  fallbackTitle?: string,
): Promise<Movie> {
  const local = MOVIELENS_BY_ID[itemId];
  const baseTitle = local?.title ?? fallbackTitle ?? `MovieLens Item #${itemId}`;
  const parsed = parseMovieLensTitle(baseTitle);

  const baseMovie: Movie = local
    ? {
        ...local,
        releaseYear: local.releaseYear ?? parsed.releaseYear,
      }
    : {
        item_id: itemId,
        title: baseTitle,
        releaseYear: parsed.releaseYear,
        hasLocalMetadata: false,
      };

  if (!TMDB_API_KEY || !parsed.cleanTitle) {
    return baseMovie;
  }

  const cacheKey = `${itemId}:${parsed.cleanTitle}:${parsed.releaseYear ?? ''}`;
  const cached = tmdbCache.get(cacheKey);
  if (cached) {
    return { ...baseMovie, ...cached };
  }

  try {
    const searchRes = await axios.get<{
      results?: Array<{
        poster_path?: string | null;
        overview?: string;
        release_date?: string;
      }>;
    }>('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: TMDB_API_KEY,
        query: parsed.cleanTitle,
        year: parsed.releaseYear,
      },
      timeout: 5000,
    });

    const match = searchRes.data?.results?.[0];
    if (match) {
      const enriched: Partial<Movie> = {
        posterUrl: match.poster_path
          ? `https://image.tmdb.org/t/p/w500${match.poster_path}`
          : baseMovie.posterUrl,
        overview: match.overview || baseMovie.overview,
        releaseYear:
          baseMovie.releaseYear ??
          (match.release_date
            ? Number.parseInt(match.release_date.slice(0, 4), 10)
            : undefined),
      };
      tmdbCache.set(cacheKey, enriched);
      return { ...baseMovie, ...enriched };
    }
  } catch {
    // Gracefully fall back to local metadata without blocking the UI
  }

  return baseMovie;
}

export function getLocalCatalogMovies(): Movie[] {
  return MOVIELENS_METADATA_CATALOG;
}
