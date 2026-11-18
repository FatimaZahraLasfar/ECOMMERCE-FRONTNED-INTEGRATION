import { ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HERO_BACKDROP_URL } from '../../data/movies';
import { useUser } from '../../context/UserContext';
import { BackendStatusIndicator } from '../common/BackendStatusIndicator';

interface HeroSectionProps {
  onJumpToRecommendations: () => void;
}

export function HeroSection({ onJumpToRecommendations }: HeroSectionProps) {
  const { userId } = useUser();

  return (
    <section className="relative overflow-hidden border-b border-white/8 bg-[#09090B]">
      {/* Background image with measured dark editorial scrim */}
      <div className="absolute inset-0">
        <img
          src={HERO_BACKDROP_URL}
          alt="Cinema projection room casting warm light onto an obsidian screen"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-45"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/88 to-[#09090B]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]/60"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-2xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#A1A1AA]">
            <span className="font-medium text-[#E5A93C]">
              MovieLens 100K Platform
            </span>
            <span aria-hidden="true">·</span>
            <BackendStatusIndicator compact />
          </div>

          <h1
            className="font-display text-4xl font-semibold tracking-tight text-[#F4F4F5] sm:text-5xl lg:text-[3.5rem] leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            Curated cinema powered by live recommendation experiments.
          </h1>

          <p className="max-w-xl text-base text-[#A1A1AA] leading-relaxed sm:text-lg">
            Explore personalized film rankings served by a FastAPI inference
            engine for MovieLens User{' '}
            <span className="font-mono text-[#F4F4F5]">#{userId}</span>, while
            observing real-time online A/B testing between SVD and Hybrid
            algorithms.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onJumpToRecommendations}
              className="inline-flex items-center gap-2 rounded-lg bg-[#E5A93C] px-5 py-3 text-sm font-semibold text-[#09090B] hover:bg-[#F0B952] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93C]"
            >
              <span>View Recommendations</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <Link
              to="/experiment"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#121216]/85 px-5 py-3 text-sm font-medium text-[#F4F4F5] hover:border-white/30 hover:bg-[#18181D] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93C]"
            >
              <BarChart3 className="h-4 w-4 text-[#E5A93C]" aria-hidden="true" />
              <span>A/B Experiment Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
