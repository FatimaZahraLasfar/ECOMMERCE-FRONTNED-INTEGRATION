import { useCallback, useEffect, useState } from 'react';
import {
  Activity,
  BarChart3,
  Clock,
  MousePointerClick,
  RefreshCw,
  Server,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTRComparisonChart } from '../components/analytics/CTRComparisonChart';
import { ExperimentResultsPanel } from '../components/analytics/ExperimentResultsPanel';
import { StatCard } from '../components/analytics/StatCard';
import { BackendStatusIndicator } from '../components/common/BackendStatusIndicator';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { useUser } from '../context/UserContext';
import { useExperimentSummary } from '../hooks/useExperimentSummary';
import { normalizeApiError } from '../services/api';
import { getPrometheusMetrics } from '../services/recommendationService';
import type { ApiErrorInfo } from '../types';
import { formatCtrPercent, formatNumber } from '../utils/movieTitle';

export function ExperimentDashboard() {
  const { backendStatus } = useUser();
  const {
    summary,
    loading,
    refreshing,
    error,
    lastUpdatedAt,
    autoRefresh,
    setAutoRefresh,
    refresh,
  } = useExperimentSummary();

  const [metricsText, setMetricsText] = useState<string | null>(null);
  const [metricsLoading, setMetricsLoading] = useState<boolean>(false);
  const [metricsError, setMetricsError] = useState<ApiErrorInfo | null>(null);

  const loadPrometheus = useCallback(async () => {
    setMetricsLoading(true);
    setMetricsError(null);
    try {
      const text = await getPrometheusMetrics();
      setMetricsText(text);
    } catch (err) {
      setMetricsError(normalizeApiError(err));
      setMetricsText(null);
    } finally {
      setMetricsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPrometheus();
  }, [loadPrometheus]);

  const totalImpressions = summary
    ? summary.arms.control.impressions + summary.arms.challenger.impressions
    : 0;
  const totalClicks = summary
    ? summary.arms.control.clicks + summary.arms.challenger.clicks
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header & Controls */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/8 pb-6">
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#E5A93C]">
            Online A/B Testing & MLOps Telemetry
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F4F5]">
            Experiment Analytics Dashboard
          </h1>
          <p className="max-w-2xl text-sm text-[#A1A1AA] leading-relaxed">
            Real-time online experiment evaluation comparing{' '}
            <strong className="text-[#F4F4F5]">Control (SVD)</strong> against{' '}
            <strong className="text-[#F4F4F5]">Challenger (Hybrid)</strong> via{' '}
            <code className="font-mono text-xs text-[#F4F4F5]">
              GET /ab/summary
            </code>
            .
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {lastUpdatedAt && (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#A1A1AA] font-mono">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                Updated {new Date(lastUpdatedAt).toLocaleTimeString()}
              </span>
            </span>
          )}

          <button
            type="button"
            role="switch"
            aria-checked={autoRefresh}
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              autoRefresh
                ? 'border-[#E5A93C]/45 bg-[#E5A93C]/15 text-[#E5A93C]'
                : 'border-white/12 bg-[#121216] text-[#A1A1AA] hover:text-[#F4F4F5]'
            }`}
          >
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Auto-refresh (15s): {autoRefresh ? 'On' : 'Off'}</span>
          </button>

          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 rounded-lg bg-[#E5A93C] px-4 py-2 text-xs font-semibold text-[#09090B] hover:bg-[#F0B952] transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            <span>Refresh Summary</span>
          </button>
        </div>
      </header>

      <BackendStatusIndicator />

      {/* Main Experiment Summary Section */}
      {loading ? (
        <LoadingSkeleton variant="dashboard" />
      ) : error ? (
        <ErrorState
          title="Could not load A/B experiment summary"
          error={error}
          onRetry={() => void refresh()}
        />
      ) : !summary || totalImpressions === 0 ? (
        <EmptyState
          icon={<BarChart3 className="h-6 w-6" aria-hidden="true" />}
          title="No experiment interactions recorded yet"
          description="Request personalized recommendations on the Home page and click a recommended movie to generate attributed impressions and clicks."
          action={
            <Link
              to="/"
              className="rounded-lg bg-[#E5A93C] px-4 py-2.5 text-xs font-semibold text-[#09090B] hover:bg-[#F0B952] transition-colors"
            >
              Generate Recommendations
            </Link>
          }
        />
      ) : (
        <div className="space-y-8">
          {/* Top KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label={`Control CTR (${summary.arms.control.algo.toUpperCase()})`}
              value={formatCtrPercent(summary.arms.control.ctr)}
              sublabel={`${formatNumber(summary.arms.control.clicks)} clicks / ${formatNumber(summary.arms.control.impressions)} impressions`}
              icon={<TrendingUp className="h-4 w-4 text-sky-300" aria-hidden="true" />}
              accent="sky"
            />
            <StatCard
              label={`Challenger CTR (${summary.arms.challenger.algo.toUpperCase()})`}
              value={formatCtrPercent(summary.arms.challenger.ctr)}
              sublabel={`${formatNumber(summary.arms.challenger.clicks)} clicks / ${formatNumber(summary.arms.challenger.impressions)} impressions`}
              icon={<TrendingUp className="h-4 w-4 text-[#E5A93C]" aria-hidden="true" />}
              accent="amber"
            />
            <StatCard
              label="Total Impressions"
              value={formatNumber(totalImpressions)}
              sublabel="Combined GET /recommend responses served"
              icon={<BarChart3 className="h-4 w-4" aria-hidden="true" />}
            />
            <StatCard
              label="Total Attributed Clicks"
              value={formatNumber(totalClicks)}
              sublabel="Recorded via POST /feedback with request_id"
              icon={<MousePointerClick className="h-4 w-4" aria-hidden="true" />}
              accent={totalClicks > 0 ? 'emerald' : 'default'}
            />
          </div>

          {/* Recharts Visualizations */}
          <CTRComparisonChart summary={summary} />

          {/* Statistical Decision & Offline vs Online Panel */}
          <ExperimentResultsPanel summary={summary} />
        </div>
      )}

      {/* Technical Monitoring: /config & Prometheus /metrics */}
      <section
        aria-labelledby="technical-monitoring-heading"
        className="border-t border-white/8 pt-10 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-[#E5A93C]">
              <Server className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Technical Observability</span>
            </div>
            <h2
              id="technical-monitoring-heading"
              className="font-display text-2xl font-semibold text-[#F4F4F5]"
            >
              Serving Configuration & Prometheus Metrics
            </h2>
          </div>

          <button
            type="button"
            onClick={() => void loadPrometheus()}
            disabled={metricsLoading}
            className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-[#121216] px-3.5 py-2 text-xs font-medium text-[#F4F4F5] hover:border-white/25 hover:bg-[#18181D] transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${metricsLoading ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            <span>Refresh /metrics</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* /config JSON */}
          <div className="lg:col-span-5 rounded-xl border border-white/8 bg-[#121216] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#F4F4F5]">
                Serving Config (GET /config)
              </h3>
              <span className="font-mono text-[11px] text-[#A1A1AA]">JSON</span>
            </div>
            {backendStatus.config ? (
              <pre className="h-72 overflow-auto rounded-lg border border-white/8 bg-[#09090B] p-4 font-mono text-xs text-[#F4F4F5] leading-relaxed">
                {JSON.stringify(backendStatus.config, null, 2)}
              </pre>
            ) : (
              <div className="flex h-72 items-center justify-center rounded-lg border border-white/8 bg-[#09090B] p-4 text-xs text-[#A1A1AA]">
                {backendStatus.checking
                  ? 'Loading configuration…'
                  : 'Configuration unavailable while FastAPI is offline.'}
              </div>
            )}
          </div>

          {/* /metrics Prometheus */}
          <div className="lg:col-span-7 rounded-xl border border-white/8 bg-[#121216] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#F4F4F5]">
                Prometheus Exposition (GET /metrics)
              </h3>
              <span className="font-mono text-[11px] text-[#A1A1AA]">
                text/plain
              </span>
            </div>

            {metricsLoading ? (
              <div className="h-72 rounded-lg border border-white/8 bg-[#09090B] animate-pulse" />
            ) : metricsError ? (
              <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-lg border border-red-500/20 bg-[#09090B] p-6 text-center">
                <p className="text-xs text-red-300">{metricsError.message}</p>
                <button
                  type="button"
                  onClick={() => void loadPrometheus()}
                  className="rounded-md border border-white/15 bg-[#18181D] px-3 py-1.5 text-xs text-[#F4F4F5] hover:bg-white/5 cursor-pointer"
                >
                  Retry /metrics
                </button>
              </div>
            ) : (
              <pre className="h-72 overflow-auto rounded-lg border border-white/8 bg-[#09090B] p-4 font-mono text-[11px] text-[#A1A1AA] leading-relaxed whitespace-pre">
                {metricsText || 'No Prometheus metrics output returned.'}
              </pre>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
