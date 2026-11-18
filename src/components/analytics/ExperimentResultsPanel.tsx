import { AlertTriangle, CheckCircle2, Info, Scale } from 'lucide-react';
import type { AbSummaryResponse } from '../../types';
import { formatArmLabel, formatCtrPercent, formatNumber } from '../../utils/movieTitle';

interface ExperimentResultsPanelProps {
  summary: AbSummaryResponse;
}

export function ExperimentResultsPanel({
  summary,
}: ExperimentResultsPanelProps) {
  const { arms, z, p_value, alpha, significant, winner } = summary;
  const totalImpressions =
    arms.control.impressions + arms.challenger.impressions;
  const lowSampleWarning = totalImpressions < 30;

  return (
    <div className="space-y-6">
      {/* Statistical Decision Banner */}
      <div className="rounded-xl border border-white/8 bg-[#121216] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-[#A1A1AA]">
              <Scale className="h-4 w-4 text-[#E5A93C]" aria-hidden="true" />
              <span>Two-Proportion Hypothesis Test</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F4F4F5]">
              {winner
                ? `Statistically Significant Winner: ${formatArmLabel(winner)} (${arms[winner].algo.toUpperCase()})`
                : 'No statistically significant winner yet'}
            </h3>

            <p className="max-w-2xl text-sm text-[#A1A1AA] leading-relaxed">
              {significant && winner
                ? `The backend significance test returned p = ${p_value.toFixed(4)} below α = ${alpha}, rejecting the null hypothesis of equal CTR.`
                : `With p-value = ${p_value.toFixed(4)} against threshold α = ${alpha}, the observed difference in click-through rate is not yet statistically significant.`}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/8 pt-4 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-6 shrink-0">
            <div>
              <div className="text-[11px] text-[#A1A1AA]">z-Statistic</div>
              <div className="mt-1 font-mono text-lg font-semibold text-[#F4F4F5] tabular-nums">
                {Number.isFinite(z) ? z.toFixed(4) : '0.0000'}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#A1A1AA]">p-Value</div>
              <div className="mt-1 font-mono text-lg font-semibold text-[#F4F4F5] tabular-nums">
                {Number.isFinite(p_value) ? p_value.toFixed(4) : '1.0000'}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#A1A1AA]">Threshold (α)</div>
              <div className="mt-1 font-mono text-lg font-semibold text-[#F4F4F5] tabular-nums">
                {alpha}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#A1A1AA]">Significance</div>
              <div className="mt-1 flex items-center gap-1.5 font-mono text-sm font-semibold">
                {significant ? (
                  <>
                    <CheckCircle2
                      className="h-4 w-4 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span className="text-emerald-400">Significant</span>
                  </>
                ) : (
                  <>
                    <Info
                      className="h-4 w-4 text-[#A1A1AA]"
                      aria-hidden="true"
                    />
                    <span className="text-[#A1A1AA]">Inconclusive</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {lowSampleWarning && (
          <div className="mt-5 flex items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/10 p-3.5 text-xs text-amber-200 leading-relaxed">
            <AlertTriangle
              className="h-4 w-4 shrink-0 text-amber-400 mt-0.5"
              aria-hidden="true"
            />
            <p>
              <strong>Low sample size notice:</strong> Only{' '}
              <span className="font-mono">{totalImpressions}</span> total
              impressions have been recorded across both arms. Small sample
              sizes produce wide variance and make statistical conclusions
              unreliable until sufficient traffic accumulates.
            </p>
          </div>
        )}
      </div>

      {/* Arm Comparison Table */}
      <div className="overflow-hidden rounded-xl border border-white/8 bg-[#121216]">
        <div className="border-b border-white/8 px-5 py-4">
          <h3 className="text-sm font-semibold text-[#F4F4F5]">
            Experiment Arm Breakdown
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/8 bg-[#18181D]/60 text-xs text-[#A1A1AA]">
              <tr>
                <th className="px-5 py-3 font-medium">Experiment Arm</th>
                <th className="px-5 py-3 font-medium">Algorithm</th>
                <th className="px-5 py-3 font-medium text-right">Impressions</th>
                <th className="px-5 py-3 font-medium text-right">Clicks</th>
                <th className="px-5 py-3 font-medium text-right">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              <tr className="hover:bg-white/[0.02]">
                <td className="px-5 py-3.5 font-medium text-sky-300">
                  Control
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-[#F4F4F5]">
                  {arms.control.algo}
                </td>
                <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#F4F4F5]">
                  {formatNumber(arms.control.impressions)}
                </td>
                <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#F4F4F5]">
                  {formatNumber(arms.control.clicks)}
                </td>
                <td className="px-5 py-3.5 text-right font-mono tabular-nums font-semibold text-[#F4F4F5]">
                  {formatCtrPercent(arms.control.ctr)}
                </td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="px-5 py-3.5 font-medium text-[#E5A93C]">
                  Challenger
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-[#F4F4F5]">
                  {arms.challenger.algo}
                </td>
                <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#F4F4F5]">
                  {formatNumber(arms.challenger.impressions)}
                </td>
                <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#F4F4F5]">
                  {formatNumber(arms.challenger.clicks)}
                </td>
                <td className="px-5 py-3.5 text-right font-mono tabular-nums font-semibold text-[#F4F4F5]">
                  {formatCtrPercent(arms.challenger.ctr)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Offline vs Online Evaluation Distinction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/8 bg-[#121216] p-5 space-y-2">
          <h4 className="text-sm font-semibold text-[#F4F4F5]">
            Offline Model Evaluation (MLflow & DVC)
          </h4>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Measured during training and pipeline validation on historical
            MovieLens 100K splits using ranking and rating error metrics such as
            RMSE, Precision@K, Recall@K, and NDCG. Offline metrics validate
            model fit before deployment, not live user engagement.
          </p>
        </div>

        <div className="rounded-xl border border-white/8 bg-[#121216] p-5 space-y-2">
          <h4 className="text-sm font-semibold text-[#F4F4F5]">
            Online A/B Experiment Metrics (Live FastAPI)
          </h4>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Measured in production via{' '}
            <code className="font-mono text-[#F4F4F5]">GET /recommend</code>{' '}
            impressions and{' '}
            <code className="font-mono text-[#F4F4F5]">POST /feedback</code>{' '}
            clicks. CTR and the two-proportion z-test evaluate whether the
            Challenger (Hybrid) improves real user click behavior over Control
            (SVD).
          </p>
        </div>
      </div>
    </div>
  );
}
