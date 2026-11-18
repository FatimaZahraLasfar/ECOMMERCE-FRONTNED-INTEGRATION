/**
 * Extracts a trailing 4-digit release year from MovieLens titles such as
 * "Trainspotting (1996)" or "Toy Story (1995)" without fabricating missing data.
 */
export function parseMovieLensTitle(rawTitle: string): {
  cleanTitle: string;
  releaseYear?: number;
} {
  const trimmed = rawTitle.trim();
  const match = trimmed.match(/^(.*?)\s*\((\d{4})\)\s*$/);
  if (!match) {
    return { cleanTitle: trimmed };
  }
  const year = Number.parseInt(match[2], 10);
  return {
    cleanTitle: match[1].trim(),
    releaseYear: Number.isFinite(year) ? year : undefined,
  };
}

export function formatCtrPercent(ctr: number): string {
  if (!Number.isFinite(ctr)) return '0.00%';
  return `${(ctr * 100).toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '0';
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatAlgoLabel(algo: string): string {
  const normalized = algo.trim().toLowerCase();
  if (normalized === 'svd') return 'SVD (Collaborative)';
  if (normalized === 'hybrid') return 'Hybrid (SVD + Content)';
  if (normalized === 'popularity') return 'Popularity Fallback';
  return algo.toUpperCase();
}

export function formatArmLabel(arm: 'control' | 'challenger'): string {
  return arm === 'control' ? 'Control Group' : 'Challenger Group';
}
