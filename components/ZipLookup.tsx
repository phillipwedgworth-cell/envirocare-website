'use client';

/**
 * ZipLookup Widget
 * Drop anywhere on the site. User types zip → see their office, phone, "Call Now" button.
 * Used by: homepage hero, /contact-us page, sticky mobile call button.
 */

import { useState } from 'react';
import { officeForZip, isInServiceArea, type Office } from '@/data/zip-to-office';

export default function ZipLookup({ variant = 'card' }: { variant?: 'card' | 'inline' | 'compact' }) {
  const [zip, setZip] = useState('');
  const [office, setOffice] = useState<Office | null>(null);
  const [inArea, setInArea] = useState<boolean | null>(null);

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = zip.trim().slice(0, 5);
    if (cleaned.length !== 5 || !/^\d{5}$/.test(cleaned)) {
      setInArea(false);
      setOffice(null);
      return;
    }
    setInArea(isInServiceArea(cleaned));
    setOffice(officeForZip(cleaned));
  }

  // CARD variant — full standalone widget for /contact-us page or homepage section
  if (variant === 'card') {
    return (
      <div className="zl-card">
        <style dangerouslySetInnerHTML={{ __html: ZIP_LOOKUP_CSS }} />
        <div className="zl-eyebrow">🌻 Find Your Local Office</div>
        <h3 className="zl-title">Which EnviroCare Office Serves You?</h3>
        <p className="zl-sub">Enter your Alabama zip code — we&apos;ll route you to the right local team.</p>

        <form onSubmit={handleLookup} className="zl-form">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            placeholder="35243"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
            className="zl-input"
            aria-label="Zip code"
          />
          <button type="submit" className="zl-button">Find My Office →</button>
        </form>

        {office && inArea && (
          <div className="zl-result zl-result-success">
            <div className="zl-result-eyebrow">✓ You&apos;re in our service area</div>
            <div className="zl-result-office">{office.name}</div>
            <div className="zl-result-addr">{office.address} · {office.city}, {office.state} {office.zip}</div>
            <a href={`tel:${office.phone}`} className="zl-call-btn">
              📞 Call {office.phoneDisplay}
            </a>
          </div>
        )}

        {office && inArea === false && (
          <div className="zl-result zl-result-warn">
            <div className="zl-result-eyebrow">We may still be able to help</div>
            <div className="zl-result-office">Try our main line: (205) 940-6360</div>
            <div className="zl-result-addr">Or call our nearest office — {office.name}</div>
            <a href={`tel:${office.phone}`} className="zl-call-btn">
              📞 Call {office.phoneDisplay}
            </a>
          </div>
        )}
      </div>
    );
  }

  // COMPACT variant — small inline lookup for sticky mobile button
  if (variant === 'compact') {
    return (
      <div className="zl-compact">
        <style dangerouslySetInnerHTML={{ __html: ZIP_LOOKUP_CSS }} />
        <form onSubmit={handleLookup} className="zl-form">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            placeholder="Zip"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
            className="zl-input zl-input-compact"
            aria-label="Zip code"
          />
          <button type="submit" className="zl-button zl-button-compact">Go</button>
        </form>
        {office && (
          <a href={`tel:${office.phone}`} className="zl-call-btn zl-call-compact">
            Call {office.phoneDisplay}
          </a>
        )}
      </div>
    );
  }

  // INLINE variant — for hero section, minimal styling
  return (
    <div className="zl-inline">
      <style dangerouslySetInnerHTML={{ __html: ZIP_LOOKUP_CSS }} />
      <form onSubmit={handleLookup} className="zl-form">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          placeholder="Your zip code"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
          className="zl-input"
          aria-label="Zip code"
        />
        <button type="submit" className="zl-button">Find My Office →</button>
      </form>
      {office && (
        <div className="zl-inline-result">
          <strong>{office.name}:</strong>{' '}
          <a href={`tel:${office.phone}`}>{office.phoneDisplay}</a>
        </div>
      )}
    </div>
  );
}

const ZIP_LOOKUP_CSS = `
.zl-card {
  background: #FEFDF8;
  border: 1px solid #E8E2D8;
  border-radius: 16px;
  padding: 32px;
  max-width: 520px;
  margin: 0 auto;
  font-family: var(--font-sans);
}
.zl-eyebrow {
  font-size: 13px;
  font-weight: 600;
  color: #0E8E40;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.zl-title {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 700;
  color: #0E1A0F;
  margin: 0 0 8px;
  line-height: 1.2;
}
.zl-sub {
  font-size: 15px;
  color: #5A6660;
  margin: 0 0 20px;
  line-height: 1.5;
}
.zl-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.zl-input {
  flex: 1;
  padding: 14px 16px;
  font-size: 16px;
  font-family: var(--font-sans);
  border: 2px solid #E8E2D8;
  border-radius: 10px;
  background: #fff;
  color: #0E1A0F;
  transition: border-color 0.2s;
}
.zl-input:focus {
  outline: none;
  border-color: #0E8E40;
}
.zl-button {
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  font-family: var(--font-sans);
  background: #0E8E40;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}
.zl-button:hover {
  background: #0A7935;
}
.zl-result {
  padding: 20px;
  border-radius: 12px;
  margin-top: 16px;
}
.zl-result-success {
  background: linear-gradient(135deg, #E8F5EE 0%, #FEFDF8 100%);
  border: 1px solid #0E8E40;
}
.zl-result-warn {
  background: #FFF8E7;
  border: 1px solid #F5A800;
}
.zl-result-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: #0E8E40;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.zl-result-warn .zl-result-eyebrow { color: #B07A00; }
.zl-result-office {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  color: #0E1A0F;
  margin-bottom: 4px;
}
.zl-result-addr {
  font-size: 14px;
  color: #5A6660;
  margin-bottom: 12px;
}
.zl-call-btn {
  display: inline-block;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  background: #F5A800;
  color: #0E1A0F;
  text-decoration: none;
  border-radius: 999px;
  transition: transform 0.15s, box-shadow 0.15s;
}
.zl-call-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 168, 0, 0.3);
}
.zl-compact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.zl-input-compact { padding: 10px 12px; font-size: 14px; }
.zl-button-compact { padding: 10px 14px; font-size: 14px; }
.zl-call-compact { padding: 10px 14px; font-size: 14px; text-align: center; }
.zl-inline {
  font-family: var(--font-sans);
}
.zl-inline-result {
  margin-top: 12px;
  font-size: 15px;
  color: #0E1A0F;
}
.zl-inline-result a {
  color: #0E8E40;
  font-weight: 600;
  text-decoration: none;
}
.zl-inline-result a:hover { text-decoration: underline; }
@media (max-width: 480px) {
  .zl-form { flex-direction: column; }
  .zl-button { width: 100%; }
  .zl-card { padding: 24px 20px; }
  .zl-title { font-size: 24px; }
}
`;
