import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Movie } from '../types';

const WATCHLIST_STORAGE_KEY = 'vero_movies_watchlist_v1';

interface WatchlistContextValue {
  items: Movie[];
  isInWatchlist: (itemId: number) => boolean;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (itemId: number) => void;
  toggleWatchlist: (movie: Movie) => void;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(
  undefined,
);

function loadWatchlist(): Movie[] {
  try {
    const raw = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Movie =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.item_id === 'number' &&
        typeof item.title === 'string',
    );
  } catch {
    return [];
  }
}

function saveWatchlist(items: Movie[]): void {
  try {
    window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage write errors
  }
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Movie[]>(loadWatchlist);

  const isInWatchlist = useCallback(
    (itemId: number) => items.some((movie) => movie.item_id === itemId),
    [items],
  );

  const addToWatchlist = useCallback((movie: Movie) => {
    setItems((prev) => {
      if (prev.some((existing) => existing.item_id === movie.item_id)) {
        return prev;
      }
      const next = [movie, ...prev];
      saveWatchlist(next);
      return next;
    });
  }, []);

  const removeFromWatchlist = useCallback((itemId: number) => {
    setItems((prev) => {
      const next = prev.filter((movie) => movie.item_id !== itemId);
      saveWatchlist(next);
      return next;
    });
  }, []);

  const toggleWatchlist = useCallback((movie: Movie) => {
    setItems((prev) => {
      const exists = prev.some((existing) => existing.item_id === movie.item_id);
      const next = exists
        ? prev.filter((existing) => existing.item_id !== movie.item_id)
        : [movie, ...prev];
      saveWatchlist(next);
      return next;
    });
  }, []);

  const clearWatchlist = useCallback(() => {
    setItems([]);
    saveWatchlist([]);
  }, []);

  const value = useMemo<WatchlistContextValue>(
    () => ({
      items,
      isInWatchlist,
      addToWatchlist,
      removeFromWatchlist,
      toggleWatchlist,
      clearWatchlist,
    }),
    [
      items,
      isInWatchlist,
      addToWatchlist,
      removeFromWatchlist,
      toggleWatchlist,
      clearWatchlist,
    ],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist(): WatchlistContextValue {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return ctx;
}
