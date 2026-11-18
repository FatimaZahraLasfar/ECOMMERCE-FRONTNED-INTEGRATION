import { Activity, CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface BackendStatusIndicatorProps {
  compact?: boolean;
}

export function BackendStatusIndicator({
  compact = false,
}: BackendStatusIndicatorProps) {
  const { backendStatus, refreshBackendStatus } = useUser();
  const { health, ready, checking } = backendStatus;

  const isHealthy = health?.status === 'ok';
  const isReady = ready?.status === 'ready';

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2.5 text-xs text-[#A1A1AA]">
        {checking ? (
          <>
            <Activity className="h-3.5 w-3.5 text-[#E5A93C]" aria-hidden="true" />
            <span>Checking backend…</span>
          </>
        ) : isHealthy && isReady ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            <span className="text-[#F4F4F5]">FastAPI Ready</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[#A1A1AA]">
              {ready.algos.control.toUpperCase()} vs {ready.algos.challenger.toUpperCase()}
            </span>
          </>
        ) : isHealthy ? (
          <>
            <Activity className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            <span className="text-amber-300">Connected (Models Loading)</span>
          </>
        ) : (
          <>
            <XCircle className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
            <span className="text-red-300">Backend Offline</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/8 bg-[#121216] px-4 py-3 text-xs">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          {checking ? (
            <Activity className="h-4 w-4 text-[#E5A93C]" aria-hidden="true" />
          ) : isHealthy ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
          ) : (
            <XCircle className="h-4 w-4 text-red-400" aria-hidden="true" />
          )}
          <span className="font-medium text-[#F4F4F5]">
            API Health:{' '}
            <span className={isHealthy ? 'text-emerald-400' : 'text-red-400'}>
              {checking ? 'Checking' : isHealthy ? 'OK' : 'Unreachable'}
            </span>
          </span>
        </div>

        <span className="text-white/15" aria-hidden="true">
          |
        </span>

        <div className="flex items-center gap-2">
          <span className="font-medium text-[#F4F4F5]">
            Models:{' '}
            <span className={isReady ? 'text-emerald-400' : 'text-[#A1A1AA]'}>
              {checking ? 'Checking' : isReady ? 'Ready' : 'Not Ready'}
            </span>
          </span>
          {isReady && ready?.algos && (
            <span className="font-mono text-[#A1A1AA]">
              ({ready.algos.control} / {ready.algos.challenger})
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => void refreshBackendStatus()}
        disabled={checking}
        className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-[#18181D] px-3 py-1.5 text-xs font-medium text-[#F4F4F5] hover:border-white/20 hover:bg-white/5 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
      >
        <RefreshCw
          className={`h-3 w-3 ${checking ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        <span>Refresh Status</span>
      </button>
    </div>
  );
}
