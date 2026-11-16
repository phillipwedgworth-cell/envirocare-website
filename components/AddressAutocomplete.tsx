'use client';
/* eslint-disable @typescript-eslint/no-explicit-any -- the Maps JS SDK is loaded at runtime from Google, not npm; @types/google.maps isn't a dependency, so its objects are untyped here. */

// components/AddressAutocomplete.tsx
//
// Google Places (New) street-address autocomplete for the lead forms.
//
// WHY: customers type addresses badly ("123 main", wrong ZIP, no city), and the
// ZIP is what routes the lead to an office. Picking a Google suggestion fills a
// clean street line AND the ZIP, so routing and the tech's drive both start
// from a verified address.
//
// HOW IT STAYS SAFE:
// - No key (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY unset) → renders a plain input.
//   The form works exactly as before. Nothing breaks if the key is missing,
//   revoked, or over quota; every Google failure falls back to typing.
// - The Maps script loads on first focus, not on page load, so it costs
//   nothing for LCP/PageSpeed on the city pages that carry the form.
// - Uses the headless Places Autocomplete Data API (AutocompleteSuggestion),
//   not the legacy google.maps.places.Autocomplete widget, which Google closed
//   to new customers in March 2025. One session token per typed address keeps
//   billing to one session per pick.
// - Suggestions are restricted to Alabama and to street addresses.

import { useCallback, useEffect, useId, useRef, useState } from 'react';

export type PickedAddress = {
  street: string; // "123 Main St"
  city: string;
  state: string; // "AL"
  zip: string; // "35007"
  formatted: string; // Google's full formatted address
};

type Props = {
  id: string;
  name?: string;
  value: string;
  onChange: (text: string) => void;
  onPick?: (a: PickedAddress) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
};

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

// Alabama bounding box (generous). Restriction, not bias: we only serve AL.
const AL_BOUNDS = { south: 30.13, west: -88.48, north: 35.01, east: -84.88 };

type Suggestion = { text: string; secondary: string; prediction: any };

// ── Script loader: one shared promise for the whole page ───────────────────
let placesPromise: Promise<any> | null = null;
function loadPlaces(): Promise<any> {
  if (placesPromise) return placesPromise;
  placesPromise = new Promise((resolve, reject) => {
    const w = window as any;
    if (w.google?.maps?.importLibrary) {
      w.google.maps.importLibrary('places').then(resolve, reject);
      return;
    }
    const cb = `__ecPlacesReady_${Date.now()}`;
    w[cb] = () => {
      delete w[cb];
      w.google.maps.importLibrary('places').then(resolve, reject);
    };
    const s = document.createElement('script');
    s.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(KEY)}` +
      `&v=weekly&loading=async&libraries=places&callback=${cb}`;
    s.async = true;
    s.onerror = () => reject(new Error('maps script failed'));
    document.head.appendChild(s);
  }).catch((e) => {
    placesPromise = null; // allow a later retry
    throw e;
  });
  return placesPromise;
}

function part(components: any[], type: string, short = false): string {
  const c = components?.find((x: any) => x.types?.includes(type));
  return (short ? c?.shortText : c?.longText) ?? '';
}

export default function AddressAutocomplete({
  id, name, value, onChange, onPick, placeholder, ariaLabel, className, style,
}: Props) {
  const listId = useId();
  const [items, setItems] = useState<Suggestion[]>([]);
  // The exact text these suggestions were fetched for. The list is shown
  // ONLY while the box still holds that text, so suggestions for an older
  // address can never be seen or picked once the customer types something
  // else (the root of several stale-result bugs found in review).
  const [itemsFor, setItemsFor] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const libRef = useRef<any>(null);
  const tokenRef = useRef<any>(null);
  const reqRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failedRef = useRef(false);
  // Bumped on every keystroke and every pick. A Place Details lookup only
  // applies if nothing happened since it started, so a slow Google answer can
  // never overwrite an address (and ZIP) the customer typed afterwards.
  const editRef = useRef(0);

  const ensureLib = useCallback(async () => {
    if (!KEY || failedRef.current) return null;
    if (libRef.current) return libRef.current;
    try {
      libRef.current = await loadPlaces();
      return libRef.current;
    } catch {
      failedRef.current = true; // fall back to plain typing for this visit
      return null;
    }
  }, []);

  const fetchSuggestions = useCallback(
    async (input: string) => {
      // Stamp this lookup BEFORE any await. Every keystroke and every pick
      // bumps reqRef, so after each await below a changed stamp means the
      // customer has moved on (typed, cleared, picked) and the result is
      // dropped. This covers the first-time SDK load as well as the request.
      const req = ++reqRef.current;
      const stale = () => req !== reqRef.current;
      const lib = await ensureLib();
      if (stale()) return;
      if (!lib || input.trim().length < 3) {
        setItems([]);
        setOpen(false);
        return;
      }
      if (!tokenRef.current) tokenRef.current = new lib.AutocompleteSessionToken();
      try {
        const { suggestions } = await lib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          sessionToken: tokenRef.current,
          includedRegionCodes: ['us'],
          includedPrimaryTypes: ['street_address', 'premise', 'subpremise'],
          locationRestriction: AL_BOUNDS,
        });
        if (stale()) return;
        const next: Suggestion[] = (suggestions ?? [])
          .map((s: any) => s.placePrediction)
          .filter(Boolean)
          .slice(0, 5)
          .map((p: any) => ({
            text: p.mainText?.text ?? p.text?.text ?? '',
            secondary: p.secondaryText?.text ?? '',
            prediction: p,
          }));
        setItems(next);
        setItemsFor(input);
        setOpen(next.length > 0);
        setActive(-1);
      } catch {
        if (stale()) return;
        setItems([]);
        setOpen(false);
      }
    },
    [ensureLib],
  );

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    editRef.current++;
    onChange(v);
    if (!KEY) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    // Invalidate any suggestion request already in flight, so a slow answer
    // for the previous text can never pop a list under new (or cleared) text.
    reqRef.current++;
    if (v.trim().length < 3) {
      setItems([]);
      setOpen(false);
      return;
    }
    timerRef.current = setTimeout(() => fetchSuggestions(v), 250);
  }

  const showList = open && items.length > 0 && itemsFor === value;

  async function choose(s: Suggestion) {
    setOpen(false);
    setItems([]);
    reqRef.current++; // drop any suggestion request still in flight
    const edit = ++editRef.current;
    onChange(s.text); // show something immediately
    try {
      const place = s.prediction.toPlace();
      await place.fetchFields({ fields: ['addressComponents', 'formattedAddress'] });
      const c = place.addressComponents ?? [];
      const num = part(c, 'street_number');
      const route = part(c, 'route', true);
      const unit = part(c, 'subpremise');
      const street = [num, route].filter(Boolean).join(' ') + (unit ? ` #${unit}` : '');
      const picked: PickedAddress = {
        street: street || s.text,
        city: part(c, 'locality') || part(c, 'sublocality') || part(c, 'postal_town'),
        state: part(c, 'administrative_area_level_1', true),
        zip: part(c, 'postal_code'),
        formatted: place.formattedAddress ?? '',
      };
      if (edit !== editRef.current) return; // customer kept typing or picked again
      onChange(picked.street);
      onPick?.(picked);
    } catch {
      /* keep the typed text; the customer can still submit */
    } finally {
      tokenRef.current = null; // the pick closes this billing session
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showList) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a <= 0 ? items.length - 1 : a - 1));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault(); // pick, don't submit the form
      choose(items[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="ec-addr" style={{ position: 'relative', ...(style?.gridColumn ? { gridColumn: style.gridColumn } : {}) }}>
      <input
        id={id}
        name={name}
        className={className}
        style={style ? { ...style, gridColumn: undefined, width: '100%', boxSizing: 'border-box' } : undefined}
        type="text"
        value={value}
        onChange={handleInput}
        onFocus={() => { void ensureLib(); }}
        onKeyDown={handleKey}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        // Browser autofill and Google suggestions fight over the same box.
        // "off" alone is ignored by Chrome; this token is respected.
        autoComplete={KEY ? 'new-street-address' : 'street-address'}
        role={KEY ? 'combobox' : undefined}
        aria-autocomplete={KEY ? 'list' : undefined}
        aria-expanded={KEY ? showList : undefined}
        aria-controls={KEY ? listId : undefined}
        aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
      />
      {showList && (
        <ul id={listId} role="listbox" style={LIST}>
          {items.map((s, i) => (
            <li
              key={`${s.text}-${i}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); choose(s); }}
              onMouseEnter={() => setActive(i)}
              style={{ ...ITEM, background: i === active ? '#EEF6F0' : '#fff' }}
            >
              <span style={{ fontWeight: 600, color: '#1a2e1f' }}>{s.text}</span>
              {s.secondary && <span style={{ color: '#5b6f60', fontSize: 13 }}> {s.secondary}</span>}
            </li>
          ))}
          {/* Google's terms require attribution when showing Places results without a Google map. */}
          <li aria-hidden="true" style={ATTR}>powered by Google</li>
        </ul>
      )}
    </div>
  );
}

const LIST: React.CSSProperties = {
  position: 'absolute', zIndex: 50, top: 'calc(100% + 4px)', left: 0, right: 0,
  margin: 0, padding: 4, listStyle: 'none', background: '#fff',
  border: '1px solid #cfdcd2', borderRadius: 10,
  boxShadow: '0 8px 24px rgba(0,0,0,.12)', maxHeight: 280, overflowY: 'auto',
};
const ITEM: React.CSSProperties = {
  padding: '10px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 14.5, lineHeight: 1.35,
};
const ATTR: React.CSSProperties = {
  padding: '4px 12px 2px', fontSize: 11, color: '#8a968c', textAlign: 'right',
};
