import { useState } from 'react';
import { Film } from 'lucide-react';
import { parseMovieLensTitle } from '../../utils/movieTitle';

interface MoviePosterProps {
  itemId: number;
  title: string;
  posterUrl?: string;
  releaseYear?: number;
  className?: string;
}

export function MoviePoster({
  itemId,
  title,
  posterUrl,
  releaseYear,
  className = '',
}: MoviePosterProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const parsed = parseMovieLensTitle(title);
  const displayYear = releaseYear ?? parsed.releaseYear;

  const showImage = Boolean(posterUrl) && !imgFailed;

  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#141418] border border-white/8 ${className}`}
    >
      {showImage ? (
        <img
          src={posterUrl}
          alt={parsed.cleanTitle}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#1C1C22] via-[#121216] to-[#0A0A0D] p-4 sm:p-5 select-none">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
            <span>ML-{String(itemId).padStart(4, '0')}</span>
            <Film className="h-3.5 w-3.5 text-[#E5A93C]/70" aria-hidden="true" />
          </div>

          <div className="my-auto py-3">
            <p className="font-display text-base sm:text-lg font-semibold leading-snug text-[#F4F4F5] line-clamp-4">
              {parsed.cleanTitle}
            </p>
            {displayYear && (
              <p className="mt-2 font-mono text-xs text-[#E5A93C]">
                {displayYear}
              </p>
            )}
          </div>

          <div className="border-t border-white/8 pt-2.5 flex items-center justify-between text-[11px] text-[#A1A1AA]">
            <span>MovieLens 100K</span>
            <span>No Poster</span>
          </div>
        </div>
      )}
    </div>
  );
}
