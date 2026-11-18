import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react';
import { API_BASE_URL } from '../../services/api';
import type { ApiErrorInfo } from '../../types';

interface ErrorStateProps {
  title?: string;
  error: ApiErrorInfo;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Backend Request Unavailable',
  error,
  onRetry,
}: ErrorStateProps) {
  const isCorsOrNetwork = error.kind === 'cors_or_network';

  return (
    <div
      role="alert"
      className="rounded-xl border border-red-500/25 bg-[#121216] p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-400">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="flex-1 space-y-3 min-w-0">
          <div>
            <h3 className="text-base font-semibold text-[#F4F4F5]">{title}</h3>
            <p className="mt-1 text-sm text-[#A1A1AA] leading-relaxed">
              {error.message}
            </p>
          </div>

          {error.details && (
            <p className="text-xs text-[#A1A1AA]/90 leading-relaxed">
              {error.details}
            </p>
          )}

          {isCorsOrNetwork && (
            <div className="rounded-lg border border-white/8 bg-[#09090B] p-4 text-xs text-[#A1A1AA] space-y-2">
              <div className="flex items-center gap-2 font-medium text-[#F4F4F5]">
                <Terminal className="h-3.5 w-3.5 text-[#E5A93C]" aria-hidden="true" />
                <span>FastAPI Local Connectivity Checklist</span>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Confirm FastAPI is serving at{' '}
                  <code className="font-mono text-[#E5A93C]">{API_BASE_URL}</code>
                </li>
                <li>
                  Ensure <code className="font-mono text-[#F4F4F5]">CORSMiddleware</code> in
                  FastAPI allows this frontend origin (e.g.{' '}
                  <code className="font-mono text-[#F4F4F5]">http://localhost:3000</code> or{' '}
                  <code className="font-mono text-[#F4F4F5]">*</code> in local dev).
                </li>
                <li>
                  Verify <code className="font-mono text-[#F4F4F5]">GET /health</code> and{' '}
                  <code className="font-mono text-[#F4F4F5]">GET /ready</code> respond with HTTP 200.
                </li>
              </ul>
            </div>
          )}

          {onRetry && (
            <div className="pt-1">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 rounded-lg bg-[#E5A93C] px-4 py-2.5 text-xs font-semibold text-[#09090B] hover:bg-[#F0B952] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93C] cursor-pointer whitespace-nowrap shrink-0"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Retry Connection</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
