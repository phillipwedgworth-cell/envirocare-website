'use client';

import { useState } from 'react';
import { officeForZip } from '@/data/zip-to-office';

const PLANS = [
  'Pest — from $35/mo',
  'Pest + Mosquito — from $69/mo',
  'Complete — pest + termite + mosquito (from ~$100/mo)',
  'Termite — free inspection (Sentricon®)',
  'Not sure yet',
];

const SERVICES = [
  'Pest Control (bi-monthly)',
  'Termite / Sentricon®',
  'Mosquito Control',
  'Tick Control',
  'Fire Ant Control',
  'Flea Control',
  'Builder Pre-Treat',
  'Real Estate / WDO Letter',
  'Crawlspace Service',
  'Commercial Service',
  'Not sure yet',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function RequestQuoteForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [routedOffice, setRoutedOffice] = useState('');

  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', zip: '',
    plan: '', service: '', message: '',
  });

  const previewOffice =
    form.zip.length === 5 && /^\d{5}$/.test(form.zip)
      ? officeForZip(form.zip)
      : null;

  function set(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setStatus('error');
        return;
      }
      setRoutedOffice(data.office || '');
      setStatus('success');
      // Conversion: GA4 generate_lead + Meta Pixel Lead (standard event)
      if (typeof window !== 'undefined') {
        (window as any).gtag?.('event', 'generate_lead', { method: 'quote_form', office: data.office || '' });
        (window as any).fbq?.('track', 'Lead', { content_name: 'Quote Form' });
      }
    } catch {
      setErrorMsg('Network error. Please call us at (205) 940-6360.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: RQ_CSS }} />
        <main className="rq-page">
          <div className="rq-card rq-success">
            <div className="rq-success-icon">✓</div>
            <h1 className="rq-success-title">We received your request!</h1>
            <p className="rq-success-body">
              {routedOffice
                ? `Your request was routed to our ${routedOffice}.`
                : 'Your request is on its way.'}{' '}
              Someone will reach out within one business day.
            </p>
            <p className="rq-success-body">
              Need a faster response? Call us at{' '}
              <a href="tel:2059406360" className="rq-phone">
                (205) 940-6360
              </a>
              .
            </p>
            <a href="/" className="rq-btn rq-btn--outline" style={{ marginTop: 8 }}>
              ← Back to home
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: RQ_CSS }} />
      <main className="rq-page">
        <div className="rq-card">
          <div className="rq-eyebrow">Free · No Obligation</div>
          <h1 className="rq-title">Request a Personal Quote</h1>
          <p className="rq-sub">
            Tell us about your home and we&apos;ll have the right local office reach out —
            usually same or next business day. Already know your plan?{' '}
            <a href="/quote" className="rq-link">
              Try our online estimator →
            </a>
          </p>

          <form className="rq-form" onSubmit={handleSubmit} noValidate>
            <div className="rq-row">
              <div className="rq-field">
                <label className="rq-label" htmlFor="rq-name">
                  Name <span className="rq-req">*</span>
                </label>
                <input
                  id="rq-name"
                  className="rq-input"
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  required
                  autoComplete="name"
                  placeholder="First Last"
                />
              </div>
              <div className="rq-field">
                <label className="rq-label" htmlFor="rq-phone">
                  Phone <span className="rq-req">*</span>
                </label>
                <input
                  id="rq-phone"
                  className="rq-input"
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  required
                  autoComplete="tel"
                  placeholder="(205) 555-0100"
                />
              </div>
            </div>

            <div className="rq-field">
              <label className="rq-label" htmlFor="rq-email">
                Email <span className="rq-req">*</span>
              </label>
              <input
                id="rq-email"
                className="rq-input"
                type="email"
                value={form.email}
                onChange={set('email')}
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="rq-row">
              <div className="rq-field rq-field--grow">
                <label className="rq-label" htmlFor="rq-address">
                  Street address
                </label>
                <input
                  id="rq-address"
                  className="rq-input"
                  type="text"
                  value={form.address}
                  onChange={set('address')}
                  autoComplete="street-address"
                  placeholder="123 Main St"
                />
              </div>
              <div className="rq-field rq-field--zip">
                <label className="rq-label" htmlFor="rq-zip">
                  ZIP <span className="rq-req">*</span>
                  {previewOffice && (
                    <span className="rq-zip-hint"> → {previewOffice.name}</span>
                  )}
                </label>
                <input
                  id="rq-zip"
                  className="rq-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  value={form.zip}
                  onChange={set('zip')}
                  required
                  placeholder="35007"
                />
              </div>
            </div>

            <div className="rq-row">
              <div className="rq-field">
                <label className="rq-label" htmlFor="rq-plan">
                  Plan interested in
                </label>
                <select
                  id="rq-plan"
                  className="rq-input"
                  value={form.plan}
                  onChange={set('plan')}
                >
                  <option value="">Select a plan…</option>
                  {PLANS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rq-field">
                <label className="rq-label" htmlFor="rq-service">
                  Service needed
                </label>
                <select
                  id="rq-service"
                  className="rq-input"
                  value={form.service}
                  onChange={set('service')}
                >
                  <option value="">Select a service…</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rq-field">
              <label className="rq-label" htmlFor="rq-message">
                Anything else we should know?
              </label>
              <textarea
                id="rq-message"
                className="rq-input rq-textarea"
                value={form.message}
                onChange={set('message')}
                rows={4}
                placeholder="Describe your pest problem, home size, or any other details…"
                maxLength={1000}
              />
            </div>

            {status === 'error' && <div className="rq-error">{errorMsg}</div>}

            <button
              className="rq-btn"
              type="submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Request my quote →'}
            </button>

            <p className="rq-fine">
              By submitting you agree to be contacted by EnviroCare. We never sell
              your information.
            </p>
          </form>
        </div>
      </main>
    </>
  );
}

const RQ_CSS = `
.rq-page {
  min-height: 100vh;
  background: #F7F6F1;
  padding: 48px 16px 80px;
  font-family: var(--font-sans);
}
.rq-card {
  max-width: 680px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px;
  box-shadow: 0 2px 12px rgba(14,26,15,0.07);
}
.rq-eyebrow {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #0A7935;
  margin-bottom: 8px;
}
.rq-title {
  font-family: var(--font-serif);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: #0E1A0F;
  margin: 0 0 10px;
  line-height: 1.2;
}
.rq-sub {
  font-size: 15px;
  color: #5A6660;
  margin: 0 0 28px;
  line-height: 1.6;
}
.rq-link { color: #0A7935; text-decoration: underline; }
.rq-link:hover { color: #0A7935; }
.rq-form { display: flex; flex-direction: column; gap: 18px; }
.rq-row { display: flex; gap: 16px; flex-wrap: wrap; }
.rq-field { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 180px; }
.rq-field--grow { flex: 2; }
.rq-field--zip { flex: 1; min-width: 100px; max-width: 140px; }
.rq-label { font-size: 13px; font-weight: 600; color: #2A3328; }
.rq-req { color: #0A7935; }
.rq-zip-hint { font-weight: 400; color: #0A7935; font-size: 12px; }
.rq-input {
  padding: 11px 13px;
  font-size: 15px;
  border: 1.5px solid #D8D2C8;
  border-radius: 8px;
  background: #FEFDF8;
  font-family: inherit;
  color: #1A1A1A;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.rq-input:focus { border-color: #0A7935; }
.rq-textarea { resize: vertical; min-height: 100px; }
.rq-error {
  padding: 12px 14px;
  background: #FFF0F0;
  border: 1px solid #FFCDD2;
  border-radius: 8px;
  font-size: 14px;
  color: #B71C1C;
}
.rq-btn {
  padding: 14px 24px;
  background: #0A7935;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.rq-btn:hover:not(:disabled) { background: #0A7935; }
.rq-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.rq-btn--outline {
  background: transparent;
  color: #0A7935;
  border: 2px solid #0A7935;
}
.rq-btn--outline:hover { background: #F0FAF4; }
.rq-fine {
  font-size: 12px;
  color: #8A9690;
  margin: 0;
  line-height: 1.5;
}
.rq-success {
  text-align: center;
  padding: 56px 36px;
}
.rq-success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #E8F7EE;
  color: #0A7935;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.rq-success-title {
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 700;
  color: #0E1A0F;
  margin: 0 0 12px;
}
.rq-success-body { font-size: 15px; color: #5A6660; margin: 0 0 10px; line-height: 1.6; }
.rq-phone { color: #0A7935; font-weight: 600; text-decoration: none; }
@media (max-width: 600px) {
  .rq-card { padding: 28px 18px; }
  .rq-field--zip { max-width: 100%; }
}
`;
