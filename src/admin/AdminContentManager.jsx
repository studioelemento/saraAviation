import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import { createRow, deleteRow, listRows, updateRow } from '../lib/contentApi';
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
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | row
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');

    if (!isSupabaseConfigured) {
      setError('Supabase is not configured.');
      setRows([]);
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await listRows(table);
    if (fetchError) {
      setError(fetchError.message || `Could not load ${table}. Run supabase/content.sql if tables are missing.`);
      setRows([]);
    } else {
      setRows(data);
    }
    setLoading(false);
  }, [table]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [table, rows.length]);

  const { page: safePage, pageItems } = useMemo(
    () => paginateItems(rows, page, ADMIN_PAGE_SIZE),
    [rows, page]
  );

  const openNew = () => {
    setForm({ ...emptyForm });
    setEditing('new');
  };

  const openEdit = (row) => {
    setForm(toForm(row));
    setEditing(row);
  };

  const closeForm = () => {
    setEditing(null);
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

    invalidatePublishedContent(table);
    closeForm();
    load();
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row.title || row.name || 'this item'}"?`)) return;
    const { error: deleteError } = await deleteRow(table, row.id);
    if (deleteError) {
      alert(deleteError.message || 'Delete failed');
      return;
    }
    invalidatePublishedContent(table);
    if (editing && editing !== 'new' && editing.id === row.id) closeForm();
    load();
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="rounded-xl bg-primary text-white text-sm font-semibold px-4 py-2.5 hover:bg-primary/90"
        >
          Add new
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-slate-500">Loading…</p>
        ) : rows.length === 0 ? (
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
                          {col.render ? col.render(row) : row[col.key] ?? '—'}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right whitespace-nowrap space-x-3">
                        <button type="button" className="text-primary font-medium hover:underline" onClick={() => openEdit(row)}>
                          Edit
                        </button>
                        <button type="button" className="text-red-600 font-medium hover:underline" onClick={() => handleDelete(row)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AdminPagination
              page={safePage}
              total={rows.length}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={closeForm}>
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-heading font-bold text-primary">
                {editing === 'new' ? `Add ${title}` : `Edit ${title}`}
              </h3>
              <button type="button" onClick={closeForm} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm">
                Close
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>

                  {field.type === 'textarea' ? (
                    <textarea
                      value={form[field.key] ?? ''}
                      onChange={(e) => setField(field.key, e.target.value)}
                      rows={field.rows || 4}
                      required={field.required}
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
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={form[field.key] ?? ''}
                        onChange={(e) => setField(field.key, e.target.value)}
                        placeholder="Image URL"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFile(e.target.files?.[0], field.key)}
                        className="block w-full text-sm"
                      />
                      {uploading ? <p className="text-xs text-slate-500">Uploading…</p> : null}
                      {form[field.key] ? (
                        <img src={form[field.key]} alt="" className="h-24 w-auto rounded-lg border object-cover" />
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
                    <textarea
                      value={
                        Array.isArray(form[field.key])
                          ? form[field.key]
                              .map((item) => {
                                if (typeof item === 'string') return item;
                                const title = item?.title || '';
                                const desc = item?.desc || '';
                                if (!title && !desc) return '';
                                return desc ? `${title} | ${desc}` : title;
                              })
                              .join('\n')
                          : ''
                      }
                      onChange={(e) =>
                        // Keep blank lines while typing so Enter works
                        setField(
                          field.key,
                          e.target.value.split('\n').map((line) => {
                            if (!line.includes('|')) {
                              return { title: line, desc: '' };
                            }
                            const [titlePart, ...rest] = line.split('|');
                            return {
                              title: titlePart ?? '',
                              desc: rest.join('|'),
                            };
                          })
                        )
                      }
                      onKeyDown={(e) => e.stopPropagation()}
                      rows={8}
                      placeholder={'Module title | Module description\nAnother module | Details'}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={form[field.key] ?? ''}
                      onChange={(e) =>
                        setField(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)
                      }
                      required={field.required}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  )}

                  {field.hint ? <p className="mt-1 text-xs text-slate-400">{field.hint}</p> : null}
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeForm} className="rounded-xl border border-slate-200 px-4 py-2 text-sm">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="rounded-xl bg-primary text-white px-4 py-2 text-sm font-semibold disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminContentManager;
