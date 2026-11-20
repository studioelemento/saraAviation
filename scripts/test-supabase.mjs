import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

function loadEnvLocal() {
  const raw = fs.readFileSync('.env.local', 'utf8');
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const i = trimmed.indexOf('=');
    if (i < 0) continue;
    env[trimmed.slice(0, i)] = trimmed.slice(i + 1);
  }
  return env;
}

const env = loadEnvLocal();
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

const report = {
  envPresent: Boolean(url && key),
  urlHost: url ? new URL(url).host : null,
  keyType: key?.startsWith('sb_publishable_')
    ? 'publishable'
    : key?.startsWith('eyJ')
      ? 'legacy_anon_jwt'
      : 'unknown',
  tables: {},
  storage: {},
  leadRoundTrip: null,
  errors: [],
};

if (!url || !key) {
  report.errors.push('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  console.log(JSON.stringify(report, null, 2));
  process.exit(1);
}

const supabase = createClient(url, key);
const tables = ['leads', 'news', 'courses', 'gallery', 'team', 'jobs'];

for (const table of tables) {
  const { data, error, count } = await supabase
    .from(table)
    .select('*', { count: 'exact' })
    .limit(3);

  if (error) {
    report.tables[table] = { ok: false, error: error.message, code: error.code };
    report.errors.push(`${table}: ${error.message}`);
  } else {
    report.tables[table] = {
      ok: true,
      count: count ?? data?.length ?? 0,
      sampleTitles: (data || [])
        .map((row) => row.title || row.name || row.email || row.id)
        .slice(0, 3),
    };
  }
}

const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
if (bucketError) {
  report.storage = { ok: false, error: bucketError.message };
  report.errors.push(`storage: ${bucketError.message}`);
} else {
  report.storage = {
    ok: true,
    buckets: (buckets || []).map((b) => b.name),
    hasMedia: (buckets || []).some((b) => b.name === 'media'),
  };
}

const testEmail = `test-admin-${Date.now()}@example.com`;
const { data: inserted, error: insertError } = await supabase
  .from('leads')
  .insert({
    name: 'Connectivity Test',
    email: testEmail,
    phone: '0000000000',
    subject: 'Automated test',
    message: 'Safe to delete',
    source: 'contact',
    status: 'new',
  })
  .select('id, email')
  .single();

if (insertError) {
  report.leadRoundTrip = { ok: false, error: insertError.message };
  report.errors.push(`lead insert: ${insertError.message}`);
} else {
  const { error: deleteError } = await supabase.from('leads').delete().eq('id', inserted.id);
  report.leadRoundTrip = {
    ok: !deleteError,
    insertedId: inserted.id,
    cleanedUp: !deleteError,
    deleteError: deleteError?.message || null,
  };
  if (deleteError) report.errors.push(`lead cleanup: ${deleteError.message}`);
}

const expectedSeed = {
  news: 9,
  courses: 6,
  gallery: 25,
  team: 12,
  jobs: 2,
};

report.seedExpectation = {};
for (const [table, expected] of Object.entries(expectedSeed)) {
  const actual = report.tables[table]?.count;
  report.seedExpectation[table] = {
    expectedMin: expected,
    actual: actual ?? null,
    looksSeeded: typeof actual === 'number' && actual >= expected,
  };
}

report.overallOk = report.errors.length === 0;
console.log(JSON.stringify(report, null, 2));
process.exit(report.overallOk ? 0 : 1);
