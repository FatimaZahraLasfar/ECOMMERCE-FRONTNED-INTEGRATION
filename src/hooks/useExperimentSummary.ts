import { useCallback, useEffect, useState } from 'react';
import { normalizeApiError } from '../services/api';
import { getAbSummary } from '../services/experimentService';
import type { AbSummaryResponse, ApiErrorInfo } from '../types';

export interface UseExperimentSummaryResult {
  summary: AbSummaryResponse | null;
  loading: boolean;
  refreshing: boolean;
  error: ApiErrorInfo | null;
  lastUpdatedAt: number | null;
  autoRefresh: boolean;
  setAutoRefresh: (enabled: boolean) => void;
  refresh: () => Promise<void>;
}

const AUTO_REFRESH_INTERVAL_MS = 15000;

export function useExperimentSummary(): UseExperimentSummaryResult {
  const [summary, setSummary] = useState<AbSummaryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<ApiErrorInfo | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

  const loadSummary = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    setError(null);

    try {
      const data = await getAbSummary();
      setSummary(data);
      setLastUpdatedAt(Date.now());
    } catch (err) {
      setError(normalizeApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadSummary(true);
  }, [loadSummary]);

  useEffect(() => {
    if (!autoRefresh) return;

    const timerId = window.setInterval(() => {
      void loadSummary(false);
    }, AUTO_REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(timerId);
    };
  }, [autoRefresh, loadSummary]);

  return {
    summary,
    loading,
    refreshing,
    error,
    lastUpdatedAt,
    autoRefresh,
    setAutoRefresh,
    refresh: () => loadSummary(false),
  };
}
