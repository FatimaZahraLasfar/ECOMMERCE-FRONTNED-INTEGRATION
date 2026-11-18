import { AlertCircle, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useRecommendations } from '../../hooks/useRecommendations';
import { EmptyState } from '../common/EmptyState';
import { ErrorState } from '../common/ErrorState';
import { LoadingSkeleton } from '../common/LoadingSkeleton';
import { MovieCarousel } from '../movies/MovieCarousel';
import { AlgorithmBadge } from './AlgorithmBadge';
import { ExperimentArmBadge } from './ExperimentArmBadge';

export function RecommendationSection() {
  const { userId } = useUser();
  const { data, movies, loading, error, refetch } = useRecommendations(userId, 10);

  return (
    <section
      id="personalized-recommendations"
      aria-labelledby="recommendations-heading"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between border-b border-white/8 pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
            <span>Personalized Inference</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[#F4F4F5]">
              MovieLens User #{userId}
            </span>
            <Link
              to="/profile"
              className="inline-flex items-center gap-1 text-[#E5A93C] hover:underline ml-1"
            >
              <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />
              <span>Change User</span>
            </Link>
          </div>

          <h2
            id="recommendations-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F4F5]"
          >
            Recommended for User #{userId}
          </h2>
          <p className="max-w-2xl text-sm text-[#A1A1AA] leading-relaxed">
            Ranked live by the FastAPI serving endpoint. Your experiment arm
            and algorithm are assigned deterministically on the server; clicking
            any film logs an attributed click via{' '}
            <code className="font-mono text-xs text-[#F4F4F5]">
              POST /feedback
            </code>
            .
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {data && (
            <>
              <ExperimentArmBadge arm={data.arm} />
              <AlgorithmBadge algo={data.algo} />
            </>
          )}
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-[#121216] px-3 py-1.5 text-xs font-medium text-[#F4F4F5] hover:border-white/25 hover:bg-[#18181D] transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {data?.fallback && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" aria-hidden="true" />
          <p>
            <strong>Fallback mode active:</strong> The backend returned{' '}
            <code className="font-mono">fallback: true</code> for this request
            (request ID <code className="font-mono">{data.request_id}</code>).
          </p>
        </div>
      )}

      {data && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#A1A1AA]">
          <span>
            Showing <strong className="font-mono text-[#F4F4F5]">{movies.length}</strong>{' '}
            ranked recommendations
          </span>
          <span className="font-mono">
            request_id: <span className="text-[#F4F4F5]">{data.request_id}</span>
          </span>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton variant="carousel" count={6} />
      ) : error ? (
        <ErrorState
          title="Could not load personalized recommendations"
          error={error}
          onRetry={() => void refetch()}
        />
      ) : movies.length === 0 ? (
        <EmptyState
          title="No recommendations returned"
          description="The backend responded successfully, but returned an empty recommendation list for this MovieLens user ID."
          action={
            <button
              type="button"
              onClick={() => void refetch()}
              className="rounded-lg bg-[#E5A93C] px-4 py-2 text-xs font-semibold text-[#09090B] cursor-pointer"
            >
              Retry Request
            </button>
          }
        />
      ) : (
        <MovieCarousel
          movies={movies}
          ariaLabel={`Personalized recommendations for User ${userId}`}
          recommendationBase={
            data
              ? {
                  fromRecommendation: true,
                  request_id: data.request_id,
                  user_id: data.user_id,
                  arm: data.arm,
                  algo: data.algo,
                  fallback: data.fallback,
                }
              : undefined
          }
        />
      )}
    </section>
  );
}
