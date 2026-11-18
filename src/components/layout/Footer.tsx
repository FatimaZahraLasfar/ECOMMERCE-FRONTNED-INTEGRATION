import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-lg font-semibold text-[#F4F4F5]">
              Vero Movies
            </p>
            <p className="max-w-sm text-sm text-[#A1A1AA] leading-relaxed">
              Editorial movie discovery and online A/B experimentation console
              for an academic DevOps and MLOps recommendation platform built on
              FastAPI, MovieLens 100K, MLflow, DVC, and Prometheus.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#F4F4F5]">
              Platform
            </p>
            <ul className="space-y-2 text-sm text-[#A1A1AA]">
              <li>
                <Link to="/" className="hover:text-[#F4F4F5] transition-colors">
                  Discover Recommendations
                </Link>
              </li>
              <li>
                <Link
                  to="/discover"
                  className="hover:text-[#F4F4F5] transition-colors"
                >
                  MovieLens Catalog
                </Link>
              </li>
              <li>
                <Link
                  to="/watchlist"
                  className="hover:text-[#F4F4F5] transition-colors"
                >
                  Personal Watchlist
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#F4F4F5]">
              MLOps & Experimentation
            </p>
            <ul className="space-y-2 text-sm text-[#A1A1AA]">
              <li>
                <Link
                  to="/experiment"
                  className="hover:text-[#F4F4F5] transition-colors"
                >
                  A/B Experiment Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-[#F4F4F5] transition-colors"
                >
                  MovieLens User Profile (1–943)
                </Link>
              </li>
              <li className="text-xs text-[#A1A1AA]/80 pt-1">
                Control: SVD Collaborative Filtering · Challenger: Hybrid
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-[#A1A1AA]">
          <p>
            Vero Movies · Master Program in Distributed Systems and Artificial
            Intelligence
          </p>
          <p>MovieLens 100K Research Dataset</p>
        </div>
      </div>
    </footer>
  );
}
