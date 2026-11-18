import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackendStatusIndicator } from '../components/common/BackendStatusIndicator';
import { HeroSection } from '../components/layout/HeroSection';
import { MovieGrid } from '../components/movies/MovieGrid';
import { RecommendationSection } from '../components/recommendations/RecommendationSection';
import { getLocalCatalogMovies } from '../services/movieMetadataService';

export function Home() {
  const featuredCatalog = getLocalCatalogMovies().slice(0, 5);

  const scrollToRecommendations = () => {
    const el = document.getElementById('personalized-recommendations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <HeroSection onJumpToRecommendations={scrollToRecommendations} />

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <BackendStatusIndicator />
      </div>

      {/* Personalized Backend Recommendations (GET /recommend/{user_id}?k=10) */}
      <RecommendationSection />

      {/* Local MovieLens Catalog Preview */}
      <section
        aria-labelledby="catalog-preview-heading"
        className="border-t border-white/8 bg-[#0C0C0F]"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-[#A1A1AA]">
                Local MovieLens Metadata Catalog
              </p>
              <h2
                id="catalog-preview-heading"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F4F5]"
              >
                Curated MovieLens Selection
              </h2>
            </div>

            <Link
              to="/discover"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E5A93C] hover:text-[#F0B952] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Browse Full Catalog</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <MovieGrid movies={featuredCatalog} />
        </div>
      </section>

      {/* Academic MLOps & Experimentation Architecture Explanation */}
      <section
        aria-labelledby="architecture-heading"
        className="border-t border-white/8 bg-[#09090B]"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl space-y-2">
            <p className="text-xs font-medium text-[#E5A93C]">
              Methodology & System Architecture
            </p>
            <h2
              id="architecture-heading"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F4F5]"
            >
              How Vero Movies Evaluates Recommendation Strategies
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Every recommendation request is routed through a backend A/B
              experiment comparing two production models trained on MovieLens
              100K.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/8 pt-8">
            <div className="space-y-2.5">
              <p className="font-mono text-xs text-[#E5A93C]">
                01. Control Strategy
              </p>
              <h3 className="text-base font-semibold text-[#F4F4F5]">
                SVD Collaborative Filtering
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Singular Value Decomposition factorizes the sparse user-item
                rating matrix into latent taste vectors, capturing implicit
                preferences shared across MovieLens users.
              </p>
            </div>

            <div className="space-y-2.5">
              <p className="font-mono text-xs text-[#E5A93C]">
                02. Challenger Strategy
              </p>
              <h3 className="text-base font-semibold text-[#F4F4F5]">
                Hybrid Recommendation
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Combines collaborative latent factor predictions with
                content-based genre and item similarity signals to improve
                ranking relevance and cold-start resilience.
              </p>
            </div>

            <div className="space-y-2.5">
              <p className="font-mono text-xs text-[#E5A93C]">
                03. Online Evaluation
              </p>
              <h3 className="text-base font-semibold text-[#F4F4F5]">
                CTR & Statistical Significance
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Click-Through Rate measures the ratio of attributed clicks to
                impressions. The backend evaluates differences via a
                two-proportion z-test at α = 0.05 before declaring a winner.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
