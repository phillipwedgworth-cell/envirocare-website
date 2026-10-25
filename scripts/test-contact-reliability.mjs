// Exercises the actual contact/quote components with mocked React hooks and HTTP.
// JSX and focus targets are simulated; these checks are not browser accessibility
// tests and never contact Formspree, /api/quote, analytics, email, or a database.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
const CONTACT = 'components/pages/ContactUs.tsx';
const SCHEDULE = 'components/ScheduleRequest.tsx';
const compilerOptions = { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX };

function load(file, mocks, globals = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const result = ts.transpileModule(source, { fileName: file, compilerOptions, reportDiagnostics: true });
  const errors = (result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `${file}: ${errors.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n')}`);
  const module = { exports: {} };
  const context = vm.createContext({
    module, exports: module.exports, Date, URLSearchParams,
    fetch: () => { throw new Error('Unexpected network call'); },
    require: name => { assert.ok(Object.hasOwn(mocks, name), `Unmocked import: ${name}`); return mocks[name]; },
    ...globals,
  });
  vm.runInContext(result.outputText, context, { filename: file });
  return module.exports;
}
const officeData = load('data/offices.ts', {});
function nodes(tree) {
  if (!tree || typeof tree !== 'object') return [];
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  return [tree, ...nodes(tree.props?.children)];
}
function textContent(tree) {
  if (tree == null || typeof tree === 'boolean') return '';
  if (Array.isArray(tree)) return tree.map(textContent).join('');
  if (typeof tree !== 'object') return String(tree);
  if (tree.type === 'style' || tree.type === 'script') return '';
  return textContent(tree.props?.children);
}
const deferred = () => {
  let resolve;
  const promise = new Promise(r => { resolve = r; });
  return { promise, resolve };
};

// Reuse the existing site-critical suite's transpilation, VM, and mock JSX
// pattern. Keeping state between renders lets the real handlers and success
// markup run together without replacing them with a copied implementation.
function harness(file, { responses = [{ ok: true }], tags = {} } = {}) {
  const slots = [], requests = [];
  let cursor = 0, dirty = false, effects = [], tree, focused;
  const hooks = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial;
      return [slots[index], next => {
        const value = typeof next === 'function' ? next(slots[index]) : next;
        if (!Object.is(value, slots[index])) { slots[index] = value; dirty = true; }
      }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    },
    useEffect(run, dependencies) {
      const index = cursor++, previous = slots[index];
      if (!previous || dependencies.some((value, i) => !Object.is(value, previous[i]))) effects.push(run);
      slots[index] = dependencies;
    },
    useMemo(calculate) { cursor++; return calculate(); },
  };
  const jsx = (type, props) => ({ type, props });
  const Component = load(file, {
    react: hooks,
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'Fragment' },
    'lucide-react': Object.fromEntries(['Phone', 'MapPin', 'Clock', 'Mail', 'ChevronDown', 'CheckCircle', 'CheckCircle2'].map(name => [name, name])),
    '@/components/shared/Header': { default: 'Header' },
    '@/lib/seo/breadcrumbs': { breadcrumbList: () => ({}) },
    '@/data/offices': officeData,
    'next/navigation': { usePathname: () => '/quote' },
    '../lib/use-office-phone': { useOfficePhone: () => ({ phone: '(205) 940-6360', phoneHref: 'tel:2059406360' }) },
  }, {
    window: { location: { pathname: file === CONTACT ? '/contact-us' : '/quote', search: '' }, ...tags },
    fetch: async (url, options) => {
      const index = requests.length;
      requests.push({ url, method: options.method, payload: JSON.parse(options.body) });
      const response = await responses[Math.min(index, responses.length - 1)];
      if (response instanceof Error) throw response;
      return response;
    },
  }).default;
  const render = () => {
    let renders = 0;
    do {
      assert.ok(renders++ < 10, 'Component effects must settle');
      cursor = 0; dirty = false; effects = [];
      tree = Component({ city: 'Huntsville' });
      for (const node of nodes(tree)) {
        if (node.props?.ref && typeof node.props.ref === 'object') {
          node.props.ref.current = { focus: () => { focused = node; } };
        }
      }
      for (const effect of effects) effect();
    } while (dirty);
    return tree;
  };
  const form = () => nodes(tree).find(node => node.type === 'form');
  render();
  return {
    requests, render, form,
    get tree() { return tree; },
    get focused() { return focused; },
    async flush() { await new Promise(resolve => setImmediate(resolve)); render(); },
    change(id, value) {
      const field = nodes(tree).find(node => node.props?.id === id);
      assert.ok(field?.props.onChange, `Editable field ${id}`);
      field.props.onChange({ target: { value } });
      render();
    },
  };
}
function fill(h, file, { name = 'Test Visitor', phone = '2055550100' } = {}) {
  const fields = file === CONTACT
    ? { 'contact-name': name, 'contact-phone': phone, 'contact-city': 'Birmingham', 'contact-service': 'Pest Control' }
    : { 'sr-name': name, 'sr-tel': phone, 'sr-zip': '35007' };
  for (const [id, value] of Object.entries(fields)) h.change(id, value);
}
const event = () => ({ preventDefault() {} });
let passed = 0, failed = 0;
async function test(name, run) {
  try { await run(); passed++; console.log(`PASS ${name}`); }
  catch (error) { failed++; console.error(`FAIL ${name}: ${error.message}`); }
}

await test('Contact form has associated labels, field names, and contact autofill hints', () => {
  const h = harness(CONTACT), all = nodes(h.tree);
  const fields = all.filter(node => ['input', 'select', 'textarea'].includes(node.type));
  assert.equal(fields.length, 7);
  for (const field of fields) {
    assert.ok(field.props.id && field.props.name, 'Every control has an id and name');
    assert.ok(all.some(node => node.type === 'label' && node.props.htmlFor === field.props.id), `Visible label for ${field.props.name}`);
    assert.notEqual(field.props.style?.outline, 'none', 'Native focus must not be suppressed inline');
  }
  for (const [name, expected] of [['name', 'name'], ['phone', 'tel'], ['email', 'email'], ['address', 'street-address'], ['city', 'address-level2']]) {
    assert.equal(fields.find(node => node.props.name === name).props.autoComplete, expected);
  }
});

await test('Concurrent contact submits send one request to the existing Formspree endpoint', async () => {
  const gate = deferred(), h = harness(CONTACT, { responses: [gate.promise] }); fill(h, CONTACT);
  const submit = h.form().props.onSubmit;
  const first = submit(event()), second = submit(event());
  assert.equal(h.requests.length, 1);
  assert.equal(h.requests[0].url, 'https://formspree.io/f/xwvypjal');
  assert.equal(h.requests[0].method, 'POST');
  h.render(); assert.equal(h.form().props['aria-busy'], true);
  gate.resolve({ ok: true }); await Promise.all([first, second]); await h.flush();
  // An old handler reference must not submit again after accepted success.
  await submit(event()); assert.equal(h.requests.length, 1);
});

for (const failure of [{ ok: false }, new Error('Offline')]) {
  await test(`Contact ${failure instanceof Error ? 'network failure' : 'rejected HTTP response'} announces error and permits a corrected retry`, async () => {
    let conversions = 0;
    const h = harness(CONTACT, { responses: [failure, { ok: true }], tags: { gtag() { conversions++; }, fbq() { conversions++; } } });
    fill(h, CONTACT); await h.form().props.onSubmit(event()); await h.flush();
    assert.ok(nodes(h.tree).some(node => node.props?.role === 'alert'));
    assert.equal(h.form().props['aria-busy'], false);
    assert.equal(conversions, 0);
    h.change('contact-phone', '2055550199');
    await h.form().props.onSubmit(event()); await h.flush();
    assert.equal(h.requests.length, 2); assert.equal(conversions, 2);
    assert.ok(textContent(h.tree).includes('2055550199'));
    assert.equal(h.form(), undefined);
  });
}

for (const brokenTag of ['gtag', 'fbq']) {
  await test(`Throwing contact ${brokenTag} cannot undo success or suppress the other tag`, async () => {
    const calls = [];
    const tags = Object.fromEntries(['gtag', 'fbq'].map(name => [name, () => { calls.push(name); if (name === brokenTag) throw new Error('Blocked'); }]));
    const h = harness(CONTACT, { tags }); fill(h, CONTACT);
    await h.form().props.onSubmit(event()); await h.flush();
    assert.deepEqual(calls, ['gtag', 'fbq']);
    assert.equal(h.form(), undefined);
    assert.ok(textContent(h.tree).includes("We've received your request"));
    assert.ok(!nodes(h.tree).some(node => node.props?.role === 'alert'));
  });
}

for (const file of [CONTACT, SCHEDULE]) {
  const label = file === CONTACT ? 'Contact' : 'Schedule';
  await test(`${label} confirmation shows the accepted payload after fields change while pending`, async () => {
    const gate = deferred(), h = harness(file, { responses: [gate.promise] }); fill(h, file);
    const pending = h.form().props.onSubmit(event());
    assert.equal(h.requests.length, 1);
    fill(h, file, { name: 'Changed Name', phone: '2055550199' });
    gate.resolve({ ok: true }); await pending; await h.flush();
    assert.equal(h.requests[0].payload.phone, '2055550100');
    const visible = textContent(h.tree);
    assert.ok(visible.includes('2055550100'));
    assert.ok(!visible.includes('2055550199'));
    assert.ok(!visible.includes('Changed Name'));
    assert.ok(textContent(h.focused).includes('Test'), 'Accepted name appears in focused confirmation');
    assert.equal(h.focused?.type, 'h3');
    assert.equal(h.focused?.props.tabIndex, -1);
    const descriptionId = h.focused?.props['aria-describedby'];
    const description = nodes(h.tree).find(node => node.props?.id === descriptionId);
    assert.ok(description && textContent(description).includes('2055550100'), 'Focused heading describes the accepted telephone number');
  });
}

console.log(`\n${passed} passed; ${failed} failed. All network and focus behavior was mocked.`);
if (failed) process.exitCode = 1;
