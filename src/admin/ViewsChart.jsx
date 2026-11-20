import React from 'react';

/**
 * Simple CSS bar chart — no extra chart library.
 */
const ViewsChart = ({ buckets = [], loading = false }) => {
  const max = Math.max(1, ...buckets.map((b) => b.count));

  if (loading) {
    return <p className="text-sm text-slate-500 py-10 text-center">Loading chart…</p>;
  }

  if (!buckets.length) {
    return <p className="text-sm text-slate-500 py-10 text-center">No view data yet.</p>;
  }

  return (
    <div className="w-full">
      <div className="flex items-end gap-1 sm:gap-1.5 h-48 md:h-56">
        {buckets.map((bucket) => {
          const heightPct = Math.max(4, Math.round((bucket.count / max) * 100));
          return (
            <div key={bucket.key} className="flex-1 min-w-0 flex flex-col items-center justify-end h-full group">
              <span className="mb-1 text-[10px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {bucket.count}
              </span>
              <div
                className="w-full rounded-t-md bg-primary/80 group-hover:bg-accent transition-colors"
                style={{ height: `${heightPct}%` }}
                title={`${bucket.label}: ${bucket.count} views`}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-1 sm:gap-1.5">
        {buckets.map((bucket, index) => {
          const show =
            buckets.length <= 8 ||
            index === 0 ||
            index === buckets.length - 1 ||
            index % Math.ceil(buckets.length / 6) === 0;
          return (
            <div key={`label-${bucket.key}`} className="flex-1 min-w-0 text-center">
              {show ? (
                <span className="block text-[9px] sm:text-[10px] text-slate-400 truncate">{bucket.label}</span>
              ) : (
                <span className="block text-[9px] text-transparent">.</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewsChart;
