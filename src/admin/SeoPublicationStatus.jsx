import { useEffect, useState } from 'react';
import { matchesSeoHtml } from './seoChecks';

export default function SeoPublicationStatus({ publication }) {
  const { path, expected, phase } = publication;
  const [result, setResult] = useState(phase);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (phase !== 'deploying') return;
    const controller = new AbortController();
    const deadline = Date.now() + 5 * 60_000;
    let timeout;

    async function verify() {
      try {
        const response = await fetch(path, {
          cache: 'no-store',
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(8000)]),
        });
        if (response.ok) {
          const html = new DOMParser().parseFromString(await response.text(), 'text/html');
          if (matchesSeoHtml(html, expected)) {
            if (!controller.signal.aborted) setResult('live');
            return;
          }
        }
      } catch {
        if (controller.signal.aborted) return;
      }
      if (controller.signal.aborted) return;
      if (Date.now() < deadline) timeout = window.setTimeout(verify, 12_000);
      else setResult('unconfirmed');
    }

    verify();
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [attempt, expected, path, phase]);

  const notices = {
    saved: 'Saved. Requesting a website build.',
    failed: 'Saved. The build request failed. Click Publish to retry.',
    deploying: 'Deploying. Waiting for the public page to show these settings.',
    live: 'Live. These settings match the public page HTML.',
    unconfirmed: 'Still unconfirmed. The public page has not matched the saved settings yet.',
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
      <p role="status">{notices[result]}</p>
      {result === 'unconfirmed' && (
        <button type="button" className="mt-2 font-medium text-primary underline" onClick={() => {
          setResult('deploying');
          setAttempt((previous) => previous + 1);
        }}>Check again</button>
      )}
    </div>
  );
}
