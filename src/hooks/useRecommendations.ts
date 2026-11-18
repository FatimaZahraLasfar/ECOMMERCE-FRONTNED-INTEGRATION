import { useCallback, useEffect, useState } from 'react';
import { normalizeApiError } from '../services/api';
import { adaptBackendItemToMovie } from '../services/movieMetadataService';
import { getRecommendations } from '../services/recommendationService';
import type { ApiErrorInfo, Movie, RecommendationResponse } from '../types';

export interface UseRecommendationsResult {
  data: RecommendationResponse | null;
  movies: Movie[];
  loading: boolean;
  error: ApiErrorInfo | null;
  refetch: () => Promise<void>;
}

export function useRecommendations(
  userId: number,
  k = 10,
): UseRecommendationsResult {
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiErrorInfo | null>(null);

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRecommendations(userId, k);
      setData(response);
      setMovies(response.items.map(adaptBackendItemToMovie));
    } catch (err) {
      setError(normalizeApiError(err));
      setData(null);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [userId, k]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await getRecommendations(userId, k);
        if (!active) return;
        setData(response);
        setMovies(response.items.map(adaptBackendItemToMovie));
      } catch (err) {
        if (!active) return;
        setError(normalizeApiError(err));
        setData(null);
        setMovies([]);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [userId, k]);

  return {
    data,
    movies,
    loading,
    error,
    refetch: fetchRecommendations,
  };
}
