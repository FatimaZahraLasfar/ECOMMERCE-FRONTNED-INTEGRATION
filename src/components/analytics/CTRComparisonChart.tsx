import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { AbSummaryResponse } from '../../types';

interface CTRComparisonChartProps {
  summary: AbSummaryResponse;
}

export function CTRComparisonChart({ summary }: CTRComparisonChartProps) {
  const { control, challenger } = summary.arms;

  const ctrData = [
    {
      name: `Control (${control.algo.toUpperCase()})`,
      ctrPercent: Number((control.ctr * 100).toFixed(2)),
      color: '#38BDF8',
    },
    {
      name: `Challenger (${challenger.algo.toUpperCase()})`,
      ctrPercent: Number((challenger.ctr * 100).toFixed(2)),
      color: '#E5A93C',
    },
  ];

  const volumeData = [
    {
      name: `Control (${control.algo.toUpperCase()})`,
      Impressions: control.impressions,
      Clicks: control.clicks,
    },
    {
      name: `Challenger (${challenger.algo.toUpperCase()})`,
      Impressions: challenger.impressions,
      Clicks: challenger.clicks,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* CTR Comparison Chart */}
      <div className="rounded-xl border border-white/8 bg-[#121216] p-5 sm:p-6">
        <div className="mb-5 space-y-1">
          <h3 className="text-base font-semibold text-[#F4F4F5]">
            Click-Through Rate (CTR) Comparison
          </h3>
          <p className="text-xs text-[#A1A1AA]">
            Percentage of recommendation impressions resulting in a recorded
            click via <code className="font-mono">/feedback</code>.
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ctrData}
              margin={{ top: 12, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.07)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#A1A1AA"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis
                stroke="#A1A1AA"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                unit="%"
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                contentStyle={{
                  backgroundColor: '#18181D',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  color: '#F4F4F5',
                  fontSize: '12px',
                }}
                formatter={(value) => [`${Number(value ?? 0).toFixed(2)}%`, 'CTR']}
              />
              <Bar dataKey="ctrPercent" radius={[6, 6, 0, 0]} maxBarSize={72}>
                {ctrData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impressions vs Clicks Chart */}
      <div className="rounded-xl border border-white/8 bg-[#121216] p-5 sm:p-6">
        <div className="mb-5 space-y-1">
          <h3 className="text-base font-semibold text-[#F4F4F5]">
            Impressions & Clicks Volume
          </h3>
          <p className="text-xs text-[#A1A1AA]">
            Total served recommendation responses vs attributed user clicks per
            experiment arm.
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={volumeData}
              margin={{ top: 12, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.07)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#A1A1AA"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis
                stroke="#A1A1AA"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                contentStyle={{
                  backgroundColor: '#18181D',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  color: '#F4F4F5',
                  fontSize: '12px',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: '#A1A1AA' }}
              />
              <Bar
                dataKey="Impressions"
                fill="#52525B"
                radius={[6, 6, 0, 0]}
                maxBarSize={52}
              />
              <Bar
                dataKey="Clicks"
                fill="#E5A93C"
                radius={[6, 6, 0, 0]}
                maxBarSize={52}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
