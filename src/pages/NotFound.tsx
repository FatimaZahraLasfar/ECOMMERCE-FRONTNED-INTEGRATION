import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 text-center space-y-6">
      <p className="font-mono text-xs font-medium text-[#E5A93C]">404</p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F4F5]">
        Page Not Found
      </h1>
      <p className="mx-auto max-w-md text-sm text-[#A1A1AA] leading-relaxed">
        The requested route does not exist in Vero Movies. Return to
        personalized recommendations or explore the MovieLens catalog.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#E5A93C] px-4 py-2.5 text-xs font-semibold text-[#09090B] hover:bg-[#F0B952] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to Discover</span>
        </Link>
        <Link
          to="/discover"
          className="rounded-lg border border-white/12 bg-[#121216] px-4 py-2.5 text-xs font-medium text-[#F4F4F5] hover:border-white/25 transition-colors"
        >
          Browse Catalog
        </Link>
      </div>
    </div>
  );
}
