import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { MoviePoster } from '../components/movies/MoviePoster';
import { WatchlistButton } from '../components/movies/WatchlistButton';
import { AlgorithmBadge } from '../components/recommendations/AlgorithmBadge';
import { ExperimentArmBadge } from '../components/recommendations/ExperimentArmBadge';
import { RecommendationBadge } from '../components/recommendations/RecommendationBadge';
import { normalizeApiError } from '../services/api';
import {
  hasFeedbackBeenSubmitted,
  submitFeedback,
} from '../services/feedbackService';
import { resolveMovieMetadata } from '../services/movieMetadataService';
import type { Movie, RecommendationContextState } from '../types';
import { parseMovieLensTitle } from '../utils/movieTitle';

interface LocationState {
  movie?: Movie;
  recommendationContext?: RecommendationContextState;
}

export function MovieDetails() {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? null;
  const recContext = state?.recommendationContext;

  const numericId = Number.parseInt(itemId ?? '', 10);

  const [movie, setMovie] = useState<Movie | null>(state?.movie ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [feedbackStatus, setFeedbackStatus] = useState<
    'idle' | 'submitting' | 'recorded' | 'already_recorded' | 'error'
  >('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadDetails() {
      if (!Number.isInteger(numericId) || numericId <= 0) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const resolved = await resolveMovieMetadata(
        numericId,
        state?.movie?.title,
      );
      if (active) {
        setMovie(resolved);
        setLoading(false);
      }
    }

    void loadDetails();
    return () => {
      active = false;
    };
  }, [numericId, state?.movie?.title]);

  useEffect(() => {
    if (!recContext?.fromRecommendation || !Number.isInteger(numericId)) {
      return;
    }

    const payload = {
      user_id: recContext.user_id,
      item_id: numericId,
      request_id: recContext.request_id,
    };

    if (hasFeedbackBeenSubmitted(payload)) {
      setFeedbackStatus('already_recorded');
      setFeedbackMessage(
        `Click feedback already recorded for request_id ${recContext.request_id}.`,
      );
      return;
    }

    let active = true;
    setFeedbackStatus('submitting');

    submitFeedback(payload)
      .then((res) => {
        if (!active) return;
        if (res) {
          setFeedbackStatus('recorded');
          setFeedbackMessage(
            `Recorded attributed click for arm "${res.arm}" (request_id: ${recContext.request_id}).`,
          );
        } else {
          setFeedbackStatus('already_recorded');
          setFeedbackMessage(
            `Click feedback already recorded for request_id ${recContext.request_id}.`,
          );
        }
      })
      .catch((err) => {
        if (!active) return;
        const apiErr = normalizeApiError(err);
        setFeedbackStatus('error');
        setFeedbackMessage(apiErr.message);
      });

    return () => {
      active = false;
    };
  }, [recContext, numericId]);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-4">
        <h1 className="font-display text-2xl font-semibold text-[#F4F4F5]">
          Invalid Movie ID
        </h1>
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 text-sm text-[#E5A93C] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return to Movie Catalog</span>
        </Link>
      </div>
    );
  }

  const parsed = parseMovieLensTitle(
    movie?.title ?? `MovieLens Item #${numericId}`,
  );
  const displayYear = movie?.releaseYear ?? parsed.releaseYear;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>Back</span>
      </button>

      {loading ? (
        <LoadingSkeleton variant="details" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="md:col-span-4 lg:col-span-4 max-w-xs w-full">
            <MoviePoster
              itemId={numericId}
              title={movie?.title ?? `MovieLens Item #${numericId}`}
              posterUrl={movie?.posterUrl}
              releaseYear={displayYear}
            />
          </div>

          <div className="md:col-span-8 lg:col-span-8 space-y-6">
            {recContext?.fromRecommendation && (
              <div className="flex flex-wrap items-center gap-2.5">
                <RecommendationBadge
                  arm={recContext.arm}
                  algo={recContext.algo}
                  fallback={recContext.fallback}
                  rank={recContext.rank}
                />
                <ExperimentArmBadge arm={recContext.arm} />
                <AlgorithmBadge algo={recContext.algo} />
              </div>
            )}

            <div className="space-y-3">
              <h1
                className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F4F5] leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {parsed.cleanTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-sm text-[#A1A1AA]">
                <span className="font-mono text-[#F4F4F5]">
                  MovieLens ID #{numericId}
                </span>
                {displayYear && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{displayYear}</span>
                  </>
                )}
                {movie?.genres && movie.genres.length > 0 && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{movie.genres.join(' / ')}</span>
                  </>
                )}
              </div>
            </div>

            {movie?.overview ? (
              <div className="space-y-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
                  Synopsis
                </h2>
                <p className="text-base text-[#F4F4F5]/90 leading-relaxed max-w-2xl">
                  {movie.overview}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-white/8 bg-[#121216] p-4 text-xs text-[#A1A1AA] leading-relaxed">
                No synopsis or extended metadata is available in the local
                MovieLens catalog for item{' '}
                <span className="font-mono text-[#F4F4F5]">#{numericId}</span>.
                The recommendation API returns only{' '}
                <code className="font-mono text-[#F4F4F5]">item_id</code> and{' '}
                <code className="font-mono text-[#F4F4F5]">title</code>.
              </div>
            )}

            {movie && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <WatchlistButton movie={movie} variant="full" />
                <Link
                  to="/experiment"
                  className="inline-flex items-center justify-center rounded-lg border border-white/12 bg-[#121216] px-4 py-2.5 text-sm font-medium text-[#F4F4F5] hover:border-white/25 hover:bg-[#18181D] transition-colors whitespace-nowrap shrink-0"
                >
                  View Experiment Metrics
                </Link>
              </div>
            )}

            {/* Recommendation Feedback Attribution Status */}
            <div className="border-t border-white/8 pt-6">
              {recContext?.fromRecommendation ? (
                <div className="rounded-xl border border-white/8 bg-[#121216] p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#F4F4F5]">
                    {feedbackStatus === 'recorded' ||
                    feedbackStatus === 'already_recorded' ? (
                      <CheckCircle2
                        className="h-4 w-4 text-emerald-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <Info
                        className="h-4 w-4 text-[#E5A93C]"
                        aria-hidden="true"
                      />
                    )}
                    <span>A/B Feedback Attribution (POST /feedback)</span>
                  </div>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {feedbackStatus === 'submitting'
                      ? 'Submitting attributed click feedback to FastAPI…'
                      : feedbackMessage}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                    <div className="rounded-lg bg-[#09090B] border border-white/8 px-3 py-2">
                      <span className="block text-[10px] text-[#A1A1AA]">
                        user_id
                      </span>
                      <span className="text-[#F4F4F5]">
                        {recContext.user_id}
                      </span>
                    </div>
                    <div className="rounded-lg bg-[#09090B] border border-white/8 px-3 py-2">
                      <span className="block text-[10px] text-[#A1A1AA]">
                        item_id
                      </span>
                      <span className="text-[#F4F4F5]">{numericId}</span>
                    </div>
                    <div className="rounded-lg bg-[#09090B] border border-white/8 px-3 py-2 truncate">
                      <span className="block text-[10px] text-[#A1A1AA]">
                        request_id
                      </span>
                      <span
                        className="text-[#E5A93C]"
                        title={recContext.request_id}
                      >
                        {recContext.request_id}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/8 bg-[#121216] p-4 text-xs text-[#A1A1AA] leading-relaxed">
                  Opened directly from the local catalog or watchlist. No{' '}
                  <code className="font-mono text-[#F4F4F5]">
                    POST /feedback
                  </code>{' '}
                  event was emitted because this view did not originate from a
                  backend recommendation{' '}
                  <code className="font-mono text-[#F4F4F5]">request_id</code>.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
