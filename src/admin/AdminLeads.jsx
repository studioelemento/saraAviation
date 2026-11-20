import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  LEAD_SOURCES,
  LEAD_STATUSES,
  fetchLeads,
  sourceLabel,
  updateLeadStatus,
} from './leadsApi';
import AdminPagination, { ADMIN_PAGE_SIZE, paginateItems } from './AdminPagination';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [source, setSource] = useState('all');
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [page, setPage] = useState(1);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError('');

    if (!isSupabaseConfigured) {
      setLeads([]);
      setError('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local, then run supabase/leads.sql in Supabase.');
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await fetchLeads({ source, status, search });
    if (fetchError) {
      setError(fetchError.message || 'Could not load leads');
      setLeads([]);
    } else {
      setLeads(data);
    }
    setLoading(false);
  }, [source, status, search]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  useEffect(() => {
    setPage(1);
  }, [source, status, search, leads.length]);

  const { page: safePage, pageItems } = useMemo(
    () => paginateItems(leads, page, ADMIN_PAGE_SIZE),
    [leads, page]
  );

  const handleStatusChange = async (lead, nextStatus) => {
    setUpdatingId(lead.id);
    const { error: updateError } = await updateLeadStatus(lead.id, nextStatus);
    setUpdatingId(null);

    if (updateError) {
      alert('Could not update status. Check the console.');
      return;
    }

    setLeads((prev) => prev.map((row) => (row.id === lead.id ? { ...row, status: nextStatus } : row)));
    setSelected((prev) => (prev?.id === lead.id ? { ...prev, status: nextStatus } : prev));
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-2xl font-heading font-bold text-primary">Leads</h2>
        <p className="mt-1 text-sm text-slate-500">
          Form submissions from the website. Sheets still receive a copy; admin reads from Supabase.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone…"
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          {LEAD_SOURCES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          {LEAD_STATUSES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-slate-500">Loading leads…</p>
        ) : leads.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No leads found yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Source</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((lead) => (
                    <tr key={lead.id} className="border-t border-slate-100 hover:bg-slate-50/80">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{lead.name || '—'}</p>
                        <p className="text-xs text-slate-500">{lead.email || lead.phone || ''}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{sourceLabel(lead.source)}</td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.status}
                          disabled={updatingId === lead.id}
                          onChange={(e) => handleStatusChange(lead, e.target.value)}
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                        >
                          <option value="new">new</option>
                          <option value="contacted">contacted</option>
                          <option value="closed">closed</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                        {lead.created_at ? new Date(lead.created_at).toLocaleString() : '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelected(lead)}
                          className="text-primary font-medium hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AdminPagination
              page={safePage}
              total={leads.length}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setSelected(null)}>
          <aside
            className="h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-primary">{selected.name || 'Lead'}</h3>
                <p className="text-xs text-slate-500 mt-1">{sourceLabel(selected.source)}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
              >
                Close
              </button>
            </div>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-slate-400">Email</dt>
                <dd className="font-medium text-slate-800">{selected.email || '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Phone</dt>
                <dd className="font-medium text-slate-800">{selected.phone || '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Subject</dt>
                <dd className="font-medium text-slate-800">{selected.subject || '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Course</dt>
                <dd className="font-medium text-slate-800">{selected.course || '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Education</dt>
                <dd className="font-medium text-slate-800">{selected.education || '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Message</dt>
                <dd className="font-medium text-slate-800 whitespace-pre-wrap">{selected.message || '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Status</dt>
                <dd className="mt-1">
                  <select
                    value={selected.status}
                    disabled={updatingId === selected.id}
                    onChange={(e) => handleStatusChange(selected, e.target.value)}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                  >
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="closed">closed</option>
                  </select>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      ) : null}
    </div>
  );
};

export default AdminLeads;
