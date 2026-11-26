import { useEffect, useState } from 'react';
import { getPageSeo, publicPaths, resolveShareImage } from '../data/pageSeo';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/uploadImage';
import { requestSeoDeployment } from './requestSeoDeployment';
import SeoPreview from './SeoPreview';
import SeoPublicationStatus from './SeoPublicationStatus';
import { getSeoWarnings } from './seoChecks';
import { isLocalAdminSession } from './adminAuth';

const localSettingsKey = 'sara_local_page_seo';
const empty = { title: '', description: '', image_url: '' };
const fields = [
  ['title', 'Search title', 120],
  ['description', 'Search description', 320],
  ['image_url', 'Share image URL', 2048],
];

export default function AdminSeo() {
  const [path, setPath] = useState('/');
  const [rows, setRows] = useState(null);
  const [draft, setDraft] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [publications, setPublications] = useState({});
  const [error, setError] = useState('');
  const localTest = isLocalAdminSession();
  const defaults = getPageSeo(path, import.meta.env.VITE_SITE_URL || undefined);
  const preview = getPageSeo(path, import.meta.env.VITE_SITE_URL || undefined, { [path]: draft });
  const duplicateTitle = Boolean(rows && publicPaths.some((otherPath) =>
    otherPath !== path && getPageSeo(otherPath, undefined, rows).title.toLowerCase() === preview.title.toLowerCase()
  ));
  const warnings = getSeoWarnings(preview, duplicateTitle);
  if (draft.image_url.trim() && !resolveShareImage(draft.image_url.trim(), defaults.canonical)) {
    warnings.push('Use an HTTPS share image URL or a path starting with /.');
  }
  const publication = publications[path];

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (localTest) {
          const saved = JSON.parse(localStorage.getItem(localSettingsKey) || '{}');
          setRows(saved);
          setDraft(saved['/'] || empty);
          return;
        }
        const { data, error: loadError } = await supabase.from('page_seo')
          .select('path,title,description,image_url');
        if (loadError?.code === 'PGRST205') {
          throw new Error('SEO settings are missing from the connected Supabase project. Apply the staff_seo.sql migration, then reload this page.');
        }
        if (loadError) throw loadError;
        if (!active) return;
        const byPath = Object.fromEntries(data.map((row) => [row.path, row]));
        setRows(byPath);
        setDraft(byPath['/'] || empty);
      } catch (err) {
        if (active) setError(err.message);
      }
    }
    load();
    return () => { active = false; };
  }, [localTest]);

  function selectPage(event) {
    const selected = event.target.value;
    setPath(selected);
    setDraft(rows[selected] || empty);
    setMessage('');
    setError('');
  }

  async function upload(event) {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const url = await uploadImage(file, 'seo');
      setDraft((previous) => ({ ...previous, image_url: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function publish(event) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    setError('');
    let saved = false;
    const id = crypto.randomUUID();
    function setPhase(phase, row) {
      const expected = getPageSeo(path, import.meta.env.VITE_SITE_URL || undefined, { [path]: row });
      setPublications((previous) => ({ ...previous, [path]: { id, path, phase, expected } }));
    }
    try {
      const row = { path };
      for (const [key] of fields) row[key] = draft[key].trim();
      if (row.image_url && !resolveShareImage(row.image_url, defaults.canonical)) {
        throw new Error('Enter an HTTPS image URL or a path starting with /.');
      }

      if (localTest) {
        const updated = { ...rows, [path]: row };
        localStorage.setItem(localSettingsKey, JSON.stringify(updated));
        setRows(updated);
        setDraft(row);
        setMessage('Test settings saved in this browser.');
        return;
      }

      const { error: saveError } = await supabase.from('page_seo').upsert(row);
      if (saveError) throw saveError;
      saved = true;
      setRows((previous) => ({ ...previous, [path]: row }));
      setDraft(row);

      setPhase('saved', row);
      try {
        await requestSeoDeployment();
        setPhase('deploying', row);
      } catch (err) {
        setPhase('failed', row);
        throw err;
      }
    } catch (err) {
      setError(saved ? `Settings saved. ${err.message} Click Publish again to retry.` : err.message);
    } finally {
      setBusy(false);
    }
  }

  const inputClass = 'w-full rounded-xl border border-slate-300 px-4 py-2.5';
  return (
    <section>
      <h1 className="text-2xl font-heading font-bold text-primary">Page SEO</h1>
      <p className="mt-1 text-slate-600">Edit search and link previews for your public pages.</p>
      {localTest && <p className="mt-3 text-sm text-slate-600">Local test mode. Changes stay in this browser.</p>}
      {error && <p role="alert" className="mt-4 text-red-700">{error}</p>}
      {message && <p role="status" className="mt-4 text-green-800">{message}</p>}
      {!rows && !error && <p role="status" className="mt-4">Loading page settings...</p>}
      {rows && (
        <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <form onSubmit={publish} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5">
            <fieldset disabled={busy} className="space-y-5 disabled:opacity-60">
              <label className="block">
                <span className="mb-1 block font-medium">Public page</span>
                <select className={inputClass} value={path} onChange={selectPage}>
                  {publicPaths.map((item) => (
                    <option key={item} value={item}>{item === '/' ? 'Home (/)' : item}</option>
                  ))}
                </select>
              </label>
              <p className="text-sm text-slate-600">Leave a field blank to use the page default.</p>
              {fields.map(([key, label, maxLength]) => (
                <label key={key} className="block">
                  <span className="mb-1 block font-medium">{label}</span>
                  <input
                    className={inputClass}
                    maxLength={maxLength}
                    value={draft[key]}
                    onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
                    placeholder={defaults[{ title: 'title', description: 'description', image_url: 'image' }[key]]}
                  />
                </label>
              ))}
              {!localTest && <label className="block text-sm font-medium">
                <span className="mb-1 block">Upload a share image</span>
                <input className={inputClass} type="file" accept="image/*" onChange={upload} />
              </label>}
              {publication && <SeoPublicationStatus key={publication.id + publication.phase} publication={publication} />}
              <SeoPreview {...preview} warnings={warnings} />
              <button className="rounded-xl bg-primary px-5 py-2.5 font-medium text-white" type="submit">
                {busy ? 'Working...' : localTest ? 'Save test settings' : 'Publish'}
              </button>
            </fieldset>
          </form>
          <aside className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-3">
              <h2 className="font-semibold text-primary">Page preview <span className="ml-1 text-sm font-normal text-slate-600">{path}</span></h2>
              <a className="text-sm font-medium text-primary underline" href={path} target="_blank" rel="noopener noreferrer">
                Open page
              </a>
            </div>
            <iframe
              key={path}
              id="seo-page-preview"
              title={'Preview of ' + (path === '/' ? 'the homepage' : path)}
              src={path}
              sandbox="allow-scripts allow-same-origin"
              className="block h-[65vh] min-h-96 w-full border-0 bg-white"
            />
          </aside>
        </div>
      )}
    </section>
  );
}
