'use client';

/**
 * StickyCallButton — Mobile-first floating call button
 * Default state: shows main number with expandable "Find my office" tap
 * After zip entry: shows nearest office number
 * Stored in sessionStorage so it persists during the visit.
 */

import { useEffect, useState } from 'react';
import { officeForZip, type Office } from '@/data/zip-to-office';

export default function StickyCallButton() {
  const [expanded, setExpanded] = useState(false);
  const [zip, setZip] = useState('');
  const [office, setOffice] = useState<Office | null>(null);

  // Restore zip from sessionStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.sessionStorage.getItem('envirocare_zip');
    if (saved && /^\d{5}$/.test(saved)) {
      setZip(saved);
      setOffice(officeForZip(saved));
    }
  }, []);

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = zip.trim().slice(0, 5);
    if (cleaned.length !== 5 || !/^\d{5}$/.test(cleaned)) return;
    const found = officeForZip(cleaned);
    setOffice(found);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('envirocare_zip', cleaned);
    }
    setExpanded(false);
  }

  const displayPhone = office?.phoneDisplay || '(205) 940-6360';
  const callHref = office?.phone || '2059406360';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STICKY_CSS }} />
      <div className="sc-wrap" aria-hidden={false}>
        {expanded && (
          <div className="sc-expanded">
            <button
              className="sc-close"
              onClick={() => setExpanded(false)}
              aria-label="Close"
            >×</button>
            <div className="sc-exp-title">Find Your Local Office</div>
            <form onSubmit={handleLookup} className="sc-form">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{5}"
                maxLength={5}
                placeholder="Your zip code"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                className="sc-input"
                aria-label="Zip code"
                autoFocus
              />
              <button type="submit" className="sc-go">Go</button>
            </form>
            {office && (
              <div className="sc-result-mini">
                {office.name} → {office.phoneDisplay}
              </div>
            )}
          </div>
        )}

        <div className="sc-bar">
          <a href={`tel:${callHref}`} className="sc-call">
            <span className="sc-icon">📞</span>
            <span className="sc-text">
              <span className="sc-label">{office ? office.name : 'Call EnviroCare'}</span>
              <span className="sc-num">{displayPhone}</span>
            </span>
          </a>
          <button
            className="sc-zip-btn"
            onClick={() => setExpanded(!expanded)}
            aria-label="Find local office by zip code"
          >
            {office ? '⟳' : '📍'}
          </button>
        </div>
      </div>
    </>
  );
}

const STICKY_CSS = `
.sc-wrap {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 9999;
  font-family: 'DM Sans', system-ui, sans-serif;
  pointer-events: none;
}
.sc-wrap > * { pointer-events: auto; }
.sc-bar {
  display: flex;
  gap: 8px;
  background: #fff;
  border: 1px solid #E8E2D8;
  border-radius: 999px;
  padding: 6px;
  box-shadow: 0 8px 24px rgba(14, 26, 15, 0.18), 0 2px 6px rgba(14, 26, 15, 0.08);
}
.sc-call {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
  color: #fff;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 999px;
  min-height: 48px;
}
.sc-icon { font-size: 20px; flex-shrink: 0; }
.sc-text { display: flex; flex-direction: column; gap: 0; line-height: 1.1; }
.sc-label { font-size: 11px; opacity: 0.85; font-weight: 500; }
.sc-num { font-size: 16px; font-weight: 700; }
.sc-zip-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  background: #F5A800;
  color: #0E1A0F;
  border-radius: 999px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
}
.sc-zip-btn:hover { background: #E89E00; }
.sc-expanded {
  position: relative;
  background: #fff;
  border: 1px solid #E8E2D8;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 8px;
  box-shadow: 0 8px 24px rgba(14, 26, 15, 0.15);
}
.sc-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 24px;
  color: #5A6660;
  cursor: pointer;
  line-height: 1;
}
.sc-exp-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: #0E1A0F;
  margin-bottom: 12px;
}
.sc-form { display: flex; gap: 8px; }
.sc-input {
  flex: 1;
  padding: 12px 14px;
  font-size: 16px;
  border: 2px solid #E8E2D8;
  border-radius: 10px;
  background: #FEFDF8;
}
.sc-input:focus { outline: none; border-color: #0E8E40; }
.sc-go {
  padding: 12px 18px;
  font-weight: 600;
  background: #0E8E40;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.sc-result-mini {
  margin-top: 10px;
  font-size: 13px;
  color: #0E8E40;
  font-weight: 500;
}
/* Hide on desktop — site already has header phones */
@media (min-width: 900px) {
  .sc-wrap { display: none; }
}
`;
