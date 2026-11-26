import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabase';
import { fetchLeadStats, sourceLabel } from './leadsApi';
import { VIEW_RANGES, fetchViewAnalytics } from './analyticsApi';
import PageViewTable from './PageViewTable';
import ViewsChart from './ViewsChart';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    newCount: 0,
    bySource: {},
    latest: [],
  });
  const [views, setViews] = useState({
    uniqueAllTime: 0,
    uniqueToday: 0,
    uniqueInRange: 0,
    pageViewsAllTime: 0,
    pageViewsInRange: 0,
    buckets: [],
    topPaths: [],
  });
  const [rangeId, setRangeId] = useState('weekly');
  const [loading, setLoading] = useState(true);
  const [viewsLoading, setViewsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [viewsError, setViewsError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const hasViewsRef = useRef(false);

  const loadLeads = useCallback(async () => {
    const result = await fetchLeadStats();

    if (result.error && !isSupabaseConfigured) {
      setError('Supabase keys missing — configure .env.local');
    } else if (result.error) {
      setError(result.error.message || 'Could not load lead stats');
    } else {
      setError('');
    }

    setStats({
      total: result.total,
      newCount: result.newCount,
      bySource: result.bySource,
      latest: result.latest,
    });
    setLoading(false);
  }, []);

  const loadViews = useCallback(
    async ({ silent = false } = {}) => {
      // Avoid "Loading…" flicker on background refresh / polling
      if (!silent && !hasViewsRef.current) setViewsLoading(true);
      if (silent) setRefreshing(true);

      const result = await fetchViewAnalytics(rangeId);

      if (result.error) {
        const msg = result.error.message || '';
        if (
          msg.includes('page_views') ||
          msg.includes('visitor_id') ||
          msg.includes('count_unique') ||
          msg.includes('schema cache') ||
          msg.includes('does not exist')
        ) {
          setViewsError(
            'Analytics table missing. Open Supabase → SQL Editor, paste supabase/analytics_all.sql, click Run. Then open the public website once.'
          );
        } else if (!isSupabaseConfigured) {
          setViewsError('Supabase not configured');
        } else {
          setViewsError(msg || 'Could not load views');
        }
      } else {
        setViewsError('');
      }

      setViews({
        uniqueAllTime: result.uniqueAllTime,
        uniqueToday: result.uniqueToday,
        uniqueInRange: result.uniqueInRange,
        pageViewsAllTime: result.pageViewsAllTime,
        pageViewsInRange: result.pageViewsInRange,
        buckets: result.buckets,
        topPaths: result.topPaths,
      });
      hasViewsRef.current = true;
      setViewsLoading(false);
      setRefreshing(false);
      setLastUpdated(new Date());
    },
    [rangeId]
  );

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  useEffect(() => {
    // First load for this range can show loading; later polls stay silent
    hasViewsRef.current = false;
    loadViews({ silent: false });

    const timer = setInterval(() => {
      loadViews({ silent: true });
      loadLeads();
    }, 30000);

    return () => clearInterval(timer);
  }, [loadViews, loadLeads]);

  const cards = [
    {
      label: 'Unique users',
      value: viewsLoading ? '…' : String(views.uniqueAllTime),
      note: 'All time (1 browser = 1 user)',
    },
    {
      label: 'Users today',
      value: viewsLoading ? '…' : String(views.uniqueToday),
      note: 'Unique visitors today',
    },
    {
      label: 'New leads',
      value: loading ? '…' : String(stats.newCount),
      note: 'Needs follow-up',
    },
    {
      label: 'Total leads',
      value: loading ? '…' : String(stats.total),
      note: 'All sources',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">
            Unique users and leads
            {lastUpdated ? ` · updated ${lastUpdated.toLocaleTimeString()}` : ''}
            {refreshing ? ' · refreshing…' : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              loadViews({ silent: true });
              loadLeads();
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Refresh
          </button>
          <Link
            to="/admin/leads"
            className="rounded-xl bg-primary text-white text-sm font-semibold px-4 py-2.5 hover:bg-primary/90"
          >
            Open leads inbox
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{card.label}</p>
            <p className="mt-3 text-3xl font-heading font-bold text-primary">{card.value}</p>
            <p className="mt-2 text-xs text-slate-400">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-heading font-bold text-primary">Unique users</h3>
            <p className="text-sm text-slate-500">
              {viewsLoading
                ? 'Loading…'
                : `${views.uniqueInRange} users · ${views.pageViewsInRange} page views in range`}
            </p>
          </div>
          <div className="flex rounded-xl border border-slate-200 overflow-hidden">
            {VIEW_RANGES.map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() => setRangeId(range.id)}
                className={`px-3 py-2 text-xs font-semibold ${
                  rangeId === range.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {viewsError ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {viewsError}
          </div>
        ) : null}

        <ViewsChart buckets={views.buckets} loading={viewsLoading} />

        {views.topPaths.length > 0 && <PageViewTable key={rangeId} pages={views.topPaths} />}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-lg font-heading font-bold text-primary">Latest leads</h3>
          <Link to="/admin/leads" className="text-sm text-primary font-medium hover:underline">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : stats.latest.length === 0 ? (
          <p className="text-sm text-slate-500">No leads yet. Submit a public form to test.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {stats.latest.map((lead) => (
              <li key={lead.id} className="py-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 truncate">{lead.name || '—'}</p>
                  <p className="text-xs text-slate-500">
                    {sourceLabel(lead.source)} · {lead.status}
                    {lead.email ? ` · ${lead.email}` : ''}
                  </p>
                </div>
                <p className="text-xs text-slate-400 whitespace-nowrap">
                  {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : ''}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
