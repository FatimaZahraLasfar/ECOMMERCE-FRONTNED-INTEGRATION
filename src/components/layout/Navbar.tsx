import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useWatchlist } from '../../context/WatchlistContext';

const NAV_LINKS = [
  { to: '/', label: 'Discover' },
  { to: '/discover', label: 'Catalog' },
  { to: '/watchlist', label: 'Watchlist' },
  { to: '/experiment', label: 'Experiment' },
  { to: '/profile', label: 'Profile' },
];

export function Navbar() {
  const { userId } = useUser();
  const { items: watchlistItems } = useWatchlist();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#09090B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="font-display text-xl font-semibold tracking-tight text-[#F4F4F5] hover:text-[#E5A93C] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A93C]"
        >
          Vero Movies
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A93C] ${
                  isActive
                    ? 'text-[#F4F4F5] after:absolute after:inset-x-0 after:-bottom-[1px] after:h-[1.5px] after:bg-[#E5A93C]'
                    : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                }`
              }
            >
              {link.to === '/watchlist' && watchlistItems.length > 0
                ? `${link.label} (${watchlistItems.length})`
                : link.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/profile"
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-[#E5A93C] px-4 py-2 text-xs font-semibold text-[#09090B] hover:bg-[#F0B952] transition-colors whitespace-nowrap shrink-0 font-mono focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93C]"
          >
            User #{userId}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#121216] text-[#F4F4F5] hover:bg-white/5 transition-colors cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-white/8 bg-[#09090B] px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#18181D] text-[#E5A93C]'
                    : 'text-[#A1A1AA] hover:bg-white/5 hover:text-[#F4F4F5]'
                }`
              }
            >
              <span>{link.label}</span>
              {link.to === '/watchlist' && watchlistItems.length > 0 && (
                <span className="font-mono text-xs text-[#A1A1AA]">
                  {watchlistItems.length}
                </span>
              )}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-white/8">
            <Link
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-lg bg-[#E5A93C] px-4 py-3 text-sm font-semibold text-[#09090B] font-mono"
            >
              Active MovieLens User #{userId}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
