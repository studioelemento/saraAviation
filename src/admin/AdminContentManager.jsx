import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import { createRow, deleteRow, listRows, updateRow } from '../lib/contentApi';
import { getBundledAdminRows } from './bundledContent';
import { mergeLocalNews } from '../lib/localNewsPublishing';
import LearningPointsEditor from './LearningPointsEditor';
import SeoPreview from './SeoPreview';
import SeoPublicationStatus from './SeoPublicationStatus';
import { getSeoWarnings } from './seoChecks';
import { getNewsSeoOverride, getPageSeo } from '../data/pageSeo';
import { requestSeoDeployment } from './requestSeoDeployment';
import { isLocalAdminSession } from './adminAuth';
import { discardDraft, loadDrafts, loadRevisions, publishContent, saveDraft, usesContentWorkflow } from './contentWorkflow';
import { contentPreviewFrame, contentPreviewStorage } from '../lib/contentPreview';
import { uploadImage } from '../lib/uploadImage';
import { invalidatePublishedContent } from '../hooks/usePublishedContent';
import AdminPagination, { ADMIN_PAGE_SIZE, paginateItems } from './AdminPagination';

/**
 * Simple reusable CRUD screen for one Supabase table.
 * Keep field configs small and explicit per module page.
 */
const AdminContentManager = ({
  title,
  description,
  table,
  folder,
  emptyForm,
  fields,
  columns,
  toForm,
  toRow,
}) => {
  const workflow = usesContentWorkflow(table);
  const localTest = isLocalAdminSession();
  const localNews = localTest && table === 'news';
  const [drafts, setDrafts] = useState({});
  const [workflowReady, setWorkflowReady] = useState(false);
  const [previewError, setPreviewError] = useState('');
  const [newsPublication, setNewsPublication] = useState(null);
  const [deploymentError, setDeploymentError] = useState('');
  const [notice, setNotice] = useState('');
  const [history, setHistory] = useState(null);
  const [rows, setRows] = useState([]);
  const [remoteContent, setRemoteContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | row
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [showUrlPaste, setShowUrlPaste] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');

    if (localTest) {
      try {
        const base = remoteContent?.table === table ? remoteContent.rows : getBundledAdminRows(table);
        setRows(localNews ? mergeLocalNews(base, (row) => row, true) : base);
        if (workflow) setDrafts(await loadDrafts(table));
        setWorkflowReady(true);
      } catch (err) {
        setWorkflowReady(false);
        setError(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!isSupabaseConfigured) {
      setError('Supabase is not configured.');
      setRows([]);
      setLoading(false);
      return;
    }

    const [{ data, error: fetchError }, draftResult] = await Promise.all([
      listRows(table),
      workflow ? loadDrafts(table).then((items) => ({ items }), (error) => ({ error })) : null,
    ]);
    if (fetchError) {
      setError(fetchError.message || `Could not load ${table}. Run supabase/content.sql if tables are missing.`);
      setRows([]);
    } else {
      setRows(data);
    }
    if (draftResult) {
      setDrafts(draftResult.items || {});
      setWorkflowReady(!fetchError && !draftResult.error);
      if (!fetchError && draftResult.error) setError(draftResult.error.message);
    }
    setLoading(false);
  }, [table, workflow, localTest, localNews, remoteContent]);

  useEffect(() => {
    if (!localTest || !isSupabaseConfigured) return;
    let active = true;
    listRows(table, { publishedOnly: localNews }).then(({ data, error }) => {
      if (active && !error && data.length) setRemoteContent({ table, rows: data });
    }).catch(() => {});
    return () => { active = false; };
  }, [localNews, localTest, table]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [table, rows.length]);

  const listedRows = useMemo(() => {
    const liveIds = new Set(rows.map((row) => row.id));
    const newDrafts = Object.entries(drafts)
      .filter(([id]) => !liveIds.has(id))
      .map(([id, payload]) => ({ ...payload, id, published: false, draftOnly: true }));
    return [...rows, ...newDrafts];
  }, [rows, drafts]);

  const { page: safePage, pageItems } = useMemo(
    () => paginateItems(listedRows, page, ADMIN_PAGE_SIZE),
    [listedRows, page]
  );

  const comparablePost = (values) => {
    const payload = toRow(values);
    delete payload.published;
    return JSON.stringify(payload);
  };
  const changesToLivePost = table !== 'news' || !editing?.published
    || comparablePost(form) !== comparablePost(toForm(editing));
  const hasSavedDraft = Boolean(editing?.id && Object.hasOwn(drafts, editing.id));
  const hasPublishableChanges = changesToLivePost || (table === 'news' && hasSavedDraft);
  const articlePath = table === 'news' && editing?.id ? '/news/' + editing.id : null;
  const siteUrl = import.meta.env.VITE_SITE_URL || undefined;
  const articleOverride = articlePath ? getNewsSeoOverride(form, siteUrl) : null;
  const articlePreview = articlePath ? {
    ...getPageSeo(articlePath, siteUrl, { [articlePath]: articleOverride }),
    title: articleOverride.title,
    description: articleOverride.description,
  } : null;
  const allowPublish = (!localTest || localNews) && hasPublishableChanges;

  const openNew = () => {
    setForm({ ...emptyForm });
    setShowUrlPaste(false);
    setHistory(null);
    setEditing(workflow ? { id: crypto.randomUUID(), draftOnly: true } : 'new');
  };

  const openEdit = (row) => {
    setForm(toForm(drafts[row.id] || row));
    setHistory(null);
    setShowUrlPaste(false);
    setEditing(row);
  };

  const closeForm = () => {
    if (saving || uploading) return;
    if (workflow) sessionStorage.removeItem(contentPreviewStorage);
    setEditing(null);
    setShowUrlPaste(false);
    setForm({ ...emptyForm });
  };

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFile = async (file, imageKey = 'image_url') => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      setField(imageKey, url);
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);

    const payload = toRow(form);
    const result =
      editing === 'new'
        ? await createRow(table, payload)
        : await updateRow(table, editing.id, payload);

    setSaving(false);

    if (result.error) {
      alert(result.error.message || 'Save failed');
      return;
    }

    if (localTest && result.data) {
      setRemoteContent((previous) => ({
        table,
        rows: [
          result.data,
          ...(previous?.table === table ? previous.rows : []).filter((row) => row.id !== result.data.id),
        ],
      }));
    }
    invalidatePublishedContent(table);
    closeForm();
    load();
  };

  async function deployNewsSeo(publication = null) {
    if (publication) setNewsPublication({ ...publication, phase: 'saved' });
    setDeploymentError('');
    try {
      await requestSeoDeployment();
      if (publication) setNewsPublication({ ...publication, phase: 'deploying' });
      setNotice((previous) => previous + ' A build was requested to update news SEO and the sitemap.');
    } catch (err) {
      if (publication) setNewsPublication({ ...publication, phase: 'failed' });
      setDeploymentError(err.message || 'Could not request a build.');
    }
  }

  const updateWorkflow = async (action, item = editing) => {
    setSaving(true);
    setNotice('');
    setError('');
    try {
      if (action === 'draft') {
        await saveDraft(table, item.id, toRow(form));
        setNotice('Draft saved.');
      } else if (action === 'discard') {
        await discardDraft(table, item.id);
        setNotice('Draft discarded.');
      } else {
        const publishing = action === 'publish';
        await publishContent(table, item.id, publishing ? toRow(form) : localNews ? item : null, publishing);
        invalidatePublishedContent(table);
        setNotice(publishing
          ? localNews ? 'Published for this localhost browser.' : 'Published to the website.'
          : 'Unpublished.');
        if (table === 'news' && !import.meta.env.DEV) {
          const publication = publishing && articlePreview
            ? { id: crypto.randomUUID(), path: articlePath, expected: articlePreview }
            : null;
          if (!publication) setNewsPublication(null);
          await deployNewsSeo(publication);
        }
      }
      closeForm();
      await load();
    } catch (err) {
      if (editing) alert(err.message || 'Could not update content.');
      else setError(err.message || 'Could not update content.');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!workflow || !editing) return;
    try {
      const row = { ...toRow(form), id: editing.id };
      sessionStorage.setItem(contentPreviewStorage, JSON.stringify({ table, row }));
    } catch {
      setPreviewError('Browser storage is unavailable for this preview.');
    }
  }, [editing, form, table, toRow, workflow]);

  useEffect(() => () => {
    if (workflow) sessionStorage.removeItem(contentPreviewStorage);
  }, [workflow]);

  async function showHistory(row) {
    try {
      const revisions = await loadRevisions(table, row.id);
      if (revisions.length) {
        openEdit(row);
        setHistory(revisions);
      } else {
        setNotice('No recorded revisions yet.');
      }
    } catch (err) {
      setError(err.message);
    }
  }

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row.title || row.name || 'this item'}"?`)) return;
    const { error: deleteError } = await deleteRow(table, row.id);
    if (deleteError) {
      alert(deleteError.message || 'Delete failed');
      return;
    }
    if (localTest) {
      setRemoteContent((previous) => previous?.table === table
        ? { table, rows: previous.rows.filter((item) => item.id !== row.id) }
        : previous);
    }
    invalidatePublishedContent(table);
    if (editing && editing !== 'new' && editing.id === row.id) closeForm();
    load();
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {!editing && <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <button
          type="button"
          disabled={workflow && !workflowReady}
          onClick={openNew}
          className="rounded-xl bg-primary text-white text-sm font-semibold px-4 py-2.5 hover:bg-primary/90"
        >
          Add new
        </button>
      </div>

      {deploymentError && <p role="alert" className="text-sm text-red-700">
        News was saved. The SEO build could not be requested. {deploymentError}{' '}
        <button type="button" onClick={() => deployNewsSeo(newsPublication)} className="underline">Retry build</button>
      </p>}
      {localTest && !workflow && rows.some((row) => row.bundled) && (
        <p className="text-sm text-slate-600">Showing bundled items. Editing these items requires the Supabase records.</p>
      )}
      {newsPublication && <SeoPublicationStatus key={newsPublication.id + newsPublication.phase} publication={newsPublication} />}
      {notice && <p role="status" className="text-sm text-green-800">{notice}</p>}
      {workflow && localTest && <p className="text-sm text-slate-600">{localNews
        ? 'Local test mode. Drafts and published posts stay in this browser.'
        : 'Local testing saves drafts in this browser. Publishing requires the staff account.'}</p>}
      {error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-slate-500">Loading…</p>
        ) : listedRows.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No items yet. Click Add new.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-slate-500">
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key} className="px-4 py-3 font-medium">
                        {col.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((row) => (
                    <tr key={row.id} className="border-t border-slate-100">
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-3 text-slate-700">
                          {workflow && col.key === 'published' && row.published && drafts[row.id] ? 'Published - Draft saved' : col.render ? col.render(row) : row[col.key] ?? '—'}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right whitespace-nowrap space-x-3">
                        <button type="button" className="text-primary font-medium hover:underline disabled:opacity-40" disabled={(row.bundled && !workflow) || (workflow && (!workflowReady || saving))} onClick={() => openEdit(row)}>
                          Edit
                        </button>
                        {workflow ? (
                          <>
                            {row.published && (!localTest || localNews) && (
                              <button type="button" disabled={!workflowReady || saving} className="text-red-700 hover:underline" onClick={() => {
                                if (window.confirm('Unpublish this item from the website?')) updateWorkflow('unpublish', row);
                              }}>Unpublish</button>
                            )}
                            {drafts[row.id] && (
                              <button type="button" disabled={saving} className="text-red-700 hover:underline" onClick={() => {
                                if (window.confirm('Discard the saved draft?')) updateWorkflow('discard', row);
                              }}>Discard draft</button>
                            )}
                            {!row.draftOnly && !localTest && (
                              <button type="button" disabled={!workflowReady || saving} className="text-primary hover:underline" onClick={() => showHistory(row)}>History</button>
                            )}
                          </>
                        ) : (
                          <button type="button" className="text-red-600 font-medium hover:underline disabled:opacity-40" disabled={row.bundled} onClick={() => handleDelete(row)}>Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AdminPagination
              page={safePage}
              total={listedRows.length}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      </>}
      {editing ? (
        <section>

            <div className="mb-5">
              <button type="button" onClick={closeForm} disabled={saving || uploading} className="mb-3 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm">
                <span aria-hidden="true">&larr;</span> Back to {title}
              </button>
              <h3 className="text-2xl font-heading font-bold text-primary">
                {editing === 'new' || (editing.draftOnly && !drafts[editing.id]) ? 'Add ' + title : 'Edit ' + title}
              </h3>
            </div>

            {history && (
              <section className="mb-5 space-y-2 rounded-xl border border-slate-200 p-4">
                <h4 className="font-semibold">Version history</h4>
                {history.map((revision) => (
                  <div key={revision.revision_id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span>{new Date(revision.changed_at).toLocaleString()} ? {revision.action}</span>
                    <button type="button" onClick={() => {
                      setForm(toForm(revision.payload));
                      setHistory(null);
                    }} className="text-primary underline">Load into editor</button>
                  </div>
                ))}
              </section>
            )}
            <div className={workflow ? 'grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]' : 'max-w-3xl'}>
              <form onSubmit={workflow ? (event) => {
                event.preventDefault();
                if (allowPublish && !saving && !uploading) updateWorkflow('publish');
              } : handleSave} className="min-w-0 space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                {fields.filter((field) => !workflow || field.key !== 'published').map((field) => field.type === 'heading' ? (
                  <div key={field.key} className="border-t border-slate-200 pt-4">
                    <h4 className="font-semibold text-primary">{field.label}</h4>
                    <p className="mt-1 text-sm text-slate-600">{field.hint}</p>
                  </div>
                ) : (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>

                    {field.type === 'textarea' ? (
                      <textarea
                        value={form[field.key] ?? ''}
                        onChange={(e) => setField(field.key, e.target.value)}
                        rows={field.rows || 4}
                        required={field.required}
                        maxLength={field.maxLength}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    ) : field.type === 'checkbox' ? (
                      <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={Boolean(form[field.key])}
                          onChange={(e) => setField(field.key, e.target.checked)}
                        />
                        {field.checkboxLabel || 'Yes'}
                      </label>
                    ) : field.type === 'image' ? (
                      <div className="space-y-3">
                        {form[field.key] ? (
                          <div className="relative inline-block">
                            <img
                              src={form[field.key]}
                              alt=""
                              className="h-32 w-auto max-w-full rounded-xl border border-slate-200 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setField(field.key, '')}
                              className="absolute -right-2 -top-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white shadow"
                            >
                              Remove
                            </button>
                          </div>
                        ) : null}

                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center hover:border-primary hover:bg-slate-100">
                          <span className="text-sm font-semibold text-primary">
                            {uploading ? 'Uploading…' : form[field.key] ? 'Replace photo' : 'Click to upload photo'}
                          </span>
                          <span className="text-xs text-slate-500">JPG, PNG, WebP — from your computer</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploading}
                            onChange={(e) => {
                              handleFile(e.target.files?.[0], field.key);
                              e.target.value = '';
                            }}
                            className="sr-only"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => setShowUrlPaste((v) => !v)}
                          className="text-xs text-slate-500 underline hover:text-slate-700"
                        >
                          {showUrlPaste ? 'Hide link option' : 'Or paste an image link instead'}
                        </button>

                        {showUrlPaste ? (
                          <input
                            type="url"
                            value={form[field.key] ?? ''}
                            onChange={(e) => setField(field.key, e.target.value)}
                            placeholder="https://…"
                            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary"
                          />
                        ) : null}
                      </div>
                    ) : field.type === 'lines' ? (
                      <textarea
                        value={Array.isArray(form[field.key]) ? form[field.key].join('\n') : form[field.key] || ''}
                        onChange={(e) =>
                          // Keep blank lines while typing so Enter works; trim empties on Save
                          setField(field.key, e.target.value.split('\n'))
                        }
                        onKeyDown={(e) => e.stopPropagation()}
                        rows={field.rows || 4}
                        placeholder="One item per line — press Enter for next item"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    ) : field.type === 'learn' ? (
                      <LearningPointsEditor items={form[field.key] || []} onChange={(items) => setField(field.key, items)} />
                    ) : (
                      <input
                        type={field.type || 'text'}
                        value={form[field.key] ?? ''}
                        onChange={(e) =>
                          setField(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)
                        }
                        required={field.required}
                        maxLength={field.maxLength}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    )}

                    {field.hint ? <p className="mt-1 text-xs text-slate-400">{field.hint}</p> : null}
                  </div>
                ))}

                {articlePreview && <SeoPreview {...articlePreview} warnings={getSeoWarnings(articlePreview)} />}
                <div className="flex flex-wrap justify-end gap-2 pt-2">
                  {workflow && (
                    <>
                      <button type="button" disabled={saving || uploading} onClick={() => updateWorkflow('draft')} className="rounded-xl border border-slate-200 px-4 py-2 text-sm">Save as draft</button>
                    </>
                  )}
                  <button type="button" onClick={closeForm} className="rounded-xl border border-slate-200 px-4 py-2 text-sm">
                    Cancel
                  </button>
                  {(!workflow || !localTest || localNews) && <button
                    type="submit"
                    disabled={saving || uploading || (workflow && !allowPublish)}
                    className="rounded-xl bg-primary text-white px-4 py-2 text-sm font-semibold disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : workflow ? 'Publish' : 'Save'}
                  </button>}
                </div>
                {table === 'news' && !hasPublishableChanges && (
                  <p className="text-right text-sm text-slate-600">Make a change to the live post to publish again.</p>
                )}
              </form>
              {workflow && (
                <aside className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white xl:sticky xl:top-20">
                  <h4 className="border-b border-slate-200 px-4 py-3 font-semibold text-primary">Live draft preview</h4>
                  {previewError && <p role="alert" className="p-4 text-sm text-red-700">{previewError}</p>}
                  <iframe
                    id={contentPreviewFrame}
                    key={editing.id}
                    title={table === 'courses' ? 'Course draft preview' : 'News post draft preview'}
                    src={table === 'courses' ? '/courses?id=' + editing.id : '/news/' + editing.id}
                    sandbox="allow-scripts allow-same-origin"
                    className="block h-[72vh] min-h-96 w-full border-0"
                  />
                </aside>
              )}
            </div>
        </section>
      ) : null}
    </div>
  );
};

export default AdminContentManager;
