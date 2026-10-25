// Regression tests for quote reliability and the public article renderer.
// Run: node scripts/test-site-critical.mjs [repository-root]
// No real email, database, HTTP requests, browser tags, or credentials are used.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const compilerOptions = { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX };
function compile(source, file) {
  const r = ts.transpileModule(source, { fileName: file, compilerOptions, reportDiagnostics: true });
  const errors = (r.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `${file}: ${errors.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n')}`);
  return r.outputText;
}
function load(source, file, mocks) {
  const module = { exports: {} };
  const context = vm.createContext({
    module, exports: module.exports, Date, URLSearchParams,
    process: { env: {} }, console: { error() {}, warn() {}, log() {} },
    fetch: () => { throw new Error('Unexpected network call'); },
    require: name => { assert.ok(Object.hasOwn(mocks, name), `Unmocked import: ${name}`); return mocks[name]; },
  });
  vm.runInContext(compile(source, file), context, { filename: file });
  return { exports: module.exports, context };
}
let passed = 0, failed = 0;
async function test(name, run) {
  try { await run(); passed++; console.log(`PASS ${name}`); }
  catch (error) { failed++; console.error(`FAIL ${name}: ${error.message}`); }
}

// Representative values from data/zip-to-office.ts. Keep the pre-existing
// unmapped-ZIP fallback intact; this patch is not a service-area decision.
const fixtureZips = {
  '35611': 'huntsville', '35601': 'huntsville', '35824': 'huntsville',
  '35976': 'huntsville', '35016': 'huntsville', '35758': 'huntsville',
  '36801': 'auburn', '36804': 'auburn', '36830': 'auburn',
  '36831': 'lake-martin', '36861': 'lake-martin', '36078': 'lake-martin',
  '35010': 'lake-martin', '35205': 'birmingham-downtown', '35244': 'birmingham-downtown',
  '35007': 'birmingham', '35124': 'birmingham', '35242': 'birmingham',
};
const phones = { birmingham: '(205) 940-6360', 'birmingham-downtown': '(205) 991-2882',
  'lake-martin': '(256) 234-6162', huntsville: '(256) 937-7676', auburn: '(334) 332-3321' };
let routing = {
  officeForZip: zip => { const id = fixtureZips[String(zip).trim().slice(0, 5)] || 'birmingham'; return { id, phoneDisplay: phones[id] }; },
  isInServiceArea: zip => Object.hasOwn(fixtureZips, String(zip).trim().slice(0, 5)),
};
const canonicalPath = path.join(root, 'data/zip-to-office.ts');
if (!process.argv[2]) assert.ok(fs.existsSync(canonicalPath), 'Canonical ZIP module must exist in the repository');
if (fs.existsSync(canonicalPath)) {
  routing = load(fs.readFileSync(canonicalPath, 'utf8'), 'data/zip-to-office.ts', {}).exports;
  for (const [zip, id] of Object.entries(fixtureZips)) assert.equal(routing.officeForZip(zip).id, id, `Canonical fixture drift: ${zip}`);
}
const quoteSource = read('app/api/quote/route.ts');
const requestBody = { name: 'Test Visitor', phone: '2055550100', zip: '35611', email: 'example@example.invalid' };
function quoteHarness({ stored = true, email = { data: { id: 'test-message' }, error: null }, throws = false } = {}) {
  const calls = [], inserts = [], notifications = [], statuses = [];
  class MockResend {
    emails = { send: async message => { calls.push('email'); notifications.push(message); if (throws) throw new Error('Provider rejected'); return email; } };
  }
  const db = { from: () => ({
    insert: row => { calls.push('store'); inserts.push(row); return { select: () => ({ single: async () => stored
      ? { data: { id: 'test-lead' }, error: null } : { data: null, error: { message: 'Storage unavailable' } } }) }; },
    update: row => ({ eq: async () => { statuses.push(row); return { error: null }; } }),
  }) };
  const { exports } = load(quoteSource, 'app/api/quote/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    resend: { Resend: MockResend }, '@supabase/supabase-js': { createClient: () => db },
    '@/lib/env-url': { cleanEnv: name => ({ SUPABASE_URL: 'https://example.invalid', SUPABASE_SERVICE_ROLE_KEY: 'unit-test-only' }[name] || '') },
    '@/data/zip-to-office': routing,
  });
  return { submit: (body = requestBody) => exports.POST({ json: async () => body }), calls, inserts, notifications, statuses };
}
await test('DB and accepted notification succeed; store precedes email', async () => {
  const h = quoteHarness(), r = await h.submit();
  assert.equal(r.status, 200); assert.equal(r.body.stored, true); assert.equal(r.body.emailed, true);
  assert.deepEqual(h.calls, ['store', 'email']);
  assert.deepEqual(Array.from(h.notifications[0].to), ['phillipwedgworth@gmail.com', 'service@envirocarellc.com']);
});
await test('SDK-resolved error cannot be reported as an accepted email', async () => {
  const h = quoteHarness({ email: { data: null, error: { message: 'Invalid sender' } } });
  const r = await h.submit(); assert.equal(r.status, 200); assert.equal(r.body.emailed, false);
  assert.equal(h.statuses[0].email_status, 'failed');
});
await test('Storage failure plus SDK-resolved email error is NOT success', async () => {
  const h = quoteHarness({ stored: false, email: { data: null, error: { message: 'Provider unavailable' } } });
  const r = await h.submit(); assert.equal(r.status, 500); assert.equal(r.body.ok, false);
});
await test('Missing provider acknowledgement is NOT a successful fallback', async () => {
  const r = await quoteHarness({ stored: false, email: { data: null, error: null } }).submit();
  assert.equal(r.status, 500); assert.equal(r.body.ok, false);
});
await test('Accepted email remains a fallback when storage is unavailable', async () => {
  const r = await quoteHarness({ stored: false }).submit();
  assert.equal(r.status, 200); assert.equal(r.body.stored, false); assert.equal(r.body.emailed, true);
});
await test('Thrown provider error never discards a stored lead', async () => {
  const r = await quoteHarness({ throws: true }).submit();
  assert.equal(r.status, 200); assert.equal(r.body.stored, true); assert.equal(r.body.emailed, false);
});
await test('Both thrown failures return an error with the local office phone', async () => {
  const r = await quoteHarness({ stored: false, throws: true }).submit();
  assert.equal(r.status, 500); assert.ok(r.body.error.includes('(256) 937-7676'));
});
await test('Required fields are validated before any integrations', async () => {
  const h = quoteHarness(), r = await h.submit({ name: 'Visitor' });
  assert.equal(r.status, 400); assert.equal(h.calls.length, 0);
});
await test('Every tested ZIP agrees with the canonical office lookup', async () => {
  const cases = routing.ZIP_TO_OFFICE || fixtureZips;
  for (const zip of Object.keys(cases)) {
    const h = quoteHarness(); await h.submit({ ...requestBody, zip });
    assert.equal(h.inserts[0].office_phone, routing.officeForZip(zip).phoneDisplay, `Wrong routing for ${zip}`);
  }
  console.log(`  Routing cases checked: ${Object.keys(cases).length}`);
});
await test('Unmapped and legacy ZIP fallbacks are preserved', async () => {
  for (const [zip, phone] of [['99999', phones.birmingham], ['36256', phones['lake-martin']], ['35671', phones.huntsville]]) {
    const h = quoteHarness(); await h.submit({ ...requestBody, zip }); assert.equal(h.inserts[0].office_phone, phone);
  }
});
await test('Existing split-name payload and HTML escaping are preserved', async () => {
  const h = quoteHarness(); await h.submit({ firstName: 'Test', lastName: 'Visitor', phone: '2055550100', zip: '35007', notes: '<script>alert(1)</script>' });
  assert.equal(h.inserts[0].first_name, 'Test'); assert.equal(h.inserts[0].last_name, 'Visitor');
  assert.ok(h.notifications[0].html.includes('&lt;script&gt;')); assert.ok(!h.notifications[0].html.includes('<script>'));
});

// Extract the actual submit function using the TS AST, not a rewritten copy.
const scheduleSource = read('components/ScheduleRequest.tsx');
const parsedSchedule = ts.createSourceFile('ScheduleRequest.tsx', scheduleSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let submitNode;
function visit(node) { if (ts.isFunctionDeclaration(node) && node.name?.text === 'submit') submitNode = node; ts.forEachChild(node, visit); }
visit(parsedSchedule); assert.ok(submitNode, 'submit function exists');
function formHarness({ ok = true, networkError = false, tags = {}, gate, initialState = 'idle' } = {}) {
  const states = [], payloads = [];
  const ctx = vm.createContext({
    valid: true, state: initialState, submitting: { current: false }, setState: s => states.push(s),
    activeDate: null, activeWin: null, setConfirmedSlot() {}, setConfirmedContact() {}, city: 'Huntsville',
    services: ['pest'], SERVICES: [{ key: 'pest', label: 'Pest Control' }],
    name: 'Test Visitor', phone: '2055550100', zip: '35611', email: '', address: '',
    window: { location: { pathname: '/quote' }, ...tags },
    fetch: async (_url, options) => { payloads.push(JSON.parse(options.body)); if (gate) await gate; if (networkError) throw new Error('Offline'); return { ok }; },
  });
  vm.runInContext(compile(submitNode.getText(parsedSchedule) + '\nglobalThis.runSubmit = submit;', 'submit.ts'), ctx);
  return { submit: () => ctx.runSubmit(), states, payloads, ctx };
}
await test('A throwing GA4 tag cannot undo successful submission or stop Meta', async () => {
  let meta = 0; const h = formHarness({ tags: { gtag() { throw new Error('Blocked'); }, fbq() { meta++; } } });
  await h.submit(); assert.equal(h.states.at(-1), 'done'); assert.equal(meta, 1);
});
await test('A throwing Meta tag cannot undo successful submission', async () => {
  const h = formHarness({ tags: { fbq() { throw new Error('Blocked'); } } });
  await h.submit(); assert.equal(h.states.at(-1), 'done');
});
await test('Failed POST never fires either conversion tag', async () => {
  let count = 0; const h = formHarness({ ok: false, tags: { gtag() { count++; }, fbq() { count++; } } });
  await h.submit(); assert.equal(h.states.at(-1), 'error'); assert.equal(count, 0);
});
await test('Synchronous double submit sends one request only', async () => {
  let release; const gate = new Promise(resolve => { release = resolve; }); const h = formHarness({ gate });
  const first = h.submit(), second = h.submit(); assert.equal(h.payloads.length, 1);
  release(); await Promise.all([first, second]); assert.equal(h.ctx.submitting.current, false);
});
await test('Network error releases the guard so retry remains possible', async () => {
  const h = formHarness({ networkError: true }); await h.submit(); await h.submit();
  assert.equal(h.states.at(-1), 'error'); assert.equal(h.payloads.length, 2); assert.equal(h.ctx.submitting.current, false);
});
await test('Already successful form cannot submit again', async () => {
  const h = formHarness({ initialState: 'done' }); await h.submit(); assert.equal(h.payloads.length, 0);
});
await test('Service query preselection runs after mount, not first render', () => {
  assert.ok(/useState<string\[\]>\(\[\]\)/.test(scheduleSource));
  assert.ok(/useEffect\(\(\) => \{[\s\S]*?setServices\(readServiceParam\(\)\)/.test(scheduleSource));
  assert.ok(!/useState<string\[\]>\(\(\) => readServiceParam/.test(scheduleSource));
});

const blogSource = read('components/BlogPostPage.tsx');
function blogHarness({ exists = true, published = true } = {}) {
  const post = { slug: 'fixture', category: 'Tips', title: 'Test article', excerpt: 'Test excerpt', author: 'Test author',
    publishedAt: '2026-10-12', readMinutes: 3, body: '<p>Fixture</p>' };
  const jsx = (type, props) => ({ type, props });
  return load(blogSource, 'components/BlogPostPage.tsx', {
    '@/data/blog-posts': { getPostBySlug: () => exists ? post : undefined, isPublished: () => published },
    '@/data/blog-visuals': { getBlogVisual: () => ({ src: '/fixture.jpg', alt: 'Fixture', position: 'center' }) },
    'next/image': { default: 'Image' }, 'next/link': { default: 'Link' },
    'next/navigation': { notFound() { throw new Error('NOT_FOUND'); } },
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'Fragment' },
  }).exports.default;
}
function nodes(tree) {
  if (!tree || typeof tree !== 'object') return [];
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  return [tree, ...nodes(tree.props?.children)];
}
await test('Article component is server-side, not a client archive import', () => {
  const tree = ts.createSourceFile('blog.tsx', blogSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  assert.ok(!tree.statements.some(s => ts.isExpressionStatement(s) && ts.isStringLiteral(s.expression) && s.expression.text === 'use client'));
});
await test('Unknown or unpublished article renders a 404', () => {
  assert.throws(() => blogHarness({ exists: false })({ slug: 'fixture' }), /NOT_FOUND/);
  assert.throws(() => blogHarness({ published: false })({ slug: 'fixture' }), /NOT_FOUND/);
});
await test('Published article preserves hero, article body and four office phones', () => {
  const all = nodes(blogHarness()({ slug: 'fixture' }));
  assert.ok(all.some(n => n.props?.src === '/fixture.jpg'));
  assert.ok(all.some(n => n.props?.dangerouslySetInnerHTML?.__html === '<p>Fixture</p>'));
  assert.equal(all.filter(n => n.props?.href?.startsWith('tel:')).length, 4);
});
await test('Article calendar date stays October 12 in Central time', () => {
  const previous = process.env.TZ; process.env.TZ = 'America/Chicago';
  try { const time = nodes(blogHarness()({ slug: 'fixture' })).find(n => n.type === 'time');
    assert.ok(time, 'Semantic time element'); assert.equal(time.props.dateTime, '2026-10-12');
    assert.equal(time.props.children, 'October 12, 2026');
  } finally { if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous; }
});
await test('Wide article content has scoped mobile overflow protection', () => {
  assert.ok(/\.bpp-body table\s*\{[^}]*overflow-x:\s*auto/.test(blogSource));
  assert.ok(/\.bpp-body img\s*\{[^}]*max-width:\s*100%/.test(blogSource));
});
console.log(`\n${passed} passed; ${failed} failed. No external services contacted.`);
if (failed) process.exitCode = 1;
