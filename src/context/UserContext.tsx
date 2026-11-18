import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { normalizeApiError } from '../services/api';
import { getConfig, getHealth, getReady } from '../services/recommendationService';
import type {
  ApiErrorInfo,
  BackendConfigResponse,
  HealthResponse,
  ReadyResponse,
} from '../types';

const USER_ID_STORAGE_KEY = 'vero_movies_movielens_user_id_v1';
export const MIN_MOVIELENS_USER_ID = 1;
export const MAX_MOVIELENS_USER_ID = 943;

export interface BackendStatusSnapshot {
  health: HealthResponse | null;
  ready: ReadyResponse | null;
  config: BackendConfigResponse | null;
  checking: boolean;
  error: ApiErrorInfo | null;
  lastCheckedAt: number | null;
}

interface UserContextValue {
  userId: number;
  setUserId: (id: number) => void;
  backendStatus: BackendStatusSnapshot;
  refreshBackendStatus: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

function readInitialUserId(): number {
  try {
    const raw = window.localStorage.getItem(USER_ID_STORAGE_KEY);
    if (!raw) return 1;
    const parsed = Number.parseInt(raw, 10);
    if (
      Number.isInteger(parsed) &&
      parsed >= MIN_MOVIELENS_USER_ID &&
      parsed <= MAX_MOVIELENS_USER_ID
    ) {
      return parsed;
    }
  } catch {
    // Ignore storage read errors
  }
  return 1;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserIdState] = useState<number>(readInitialUserId);
  const [backendStatus, setBackendStatus] = useState<BackendStatusSnapshot>({
    health: null,
    ready: null,
    config: null,
    checking: true,
    error: null,
    lastCheckedAt: null,
  });

  const setUserId = useCallback((nextId: number) => {
    const clamped = Math.max(
      MIN_MOVIELENS_USER_ID,
      Math.min(MAX_MOVIELENS_USER_ID, Math.trunc(nextId)),
    );
    setUserIdState(clamped);
    try {
      window.localStorage.setItem(USER_ID_STORAGE_KEY, String(clamped));
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const refreshBackendStatus = useCallback(async () => {
    setBackendStatus((prev) => ({ ...prev, checking: true }));
    try {
      const [healthRes, readyRes, configRes] = await Promise.allSettled([
        getHealth(),
        getReady(),
        getConfig(),
      ]);

      const health = healthRes.status === 'fulfilled' ? healthRes.value : null;
      const ready = readyRes.status === 'fulfilled' ? readyRes.value : null;
      const config = configRes.status === 'fulfilled' ? configRes.value : null;

      let error: ApiErrorInfo | null = null;
      if (!health && healthRes.status === 'rejected') {
        error = normalizeApiError(healthRes.reason);
      } else if (!ready && readyRes.status === 'rejected') {
        error = normalizeApiError(readyRes.reason);
      }

      setBackendStatus({
        health,
        ready,
        config,
        checking: false,
        error,
        lastCheckedAt: Date.now(),
      });
    } catch (err) {
      setBackendStatus({
        health: null,
        ready: null,
        config: null,
        checking: false,
        error: normalizeApiError(err),
        lastCheckedAt: Date.now(),
      });
    }
  }, []);

  useEffect(() => {
    void refreshBackendStatus();
  }, [refreshBackendStatus]);

  const value = useMemo<UserContextValue>(
    () => ({
      userId,
      setUserId,
      backendStatus,
      refreshBackendStatus,
    }),
    [userId, setUserId, backendStatus, refreshBackendStatus],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
}
