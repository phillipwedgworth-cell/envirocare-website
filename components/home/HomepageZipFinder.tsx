'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { OFFICES } from '@/data/offices';
import { isInServiceArea, officeForZip, type Office } from '@/data/zip-to-office';
import styles from './HomepageZipFinder.module.css';

type LookupResult =
  | { kind: 'match'; office: Office }
  | { kind: 'unmapped' }
  | { kind: 'invalid' }
  | null;

export default function HomepageZipFinder() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<LookupResult>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const inputId = `${id}-zip`;
  const helpId = `${id}-help`;
  const resultId = `${id}-result`;
  const mainOffice = OFFICES.birmingham;

  function findOffice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setResult({ kind: 'invalid' });
      inputRef.current?.focus();
      return;
    }
    setResult(isInServiceArea(zip) ? { kind: 'match', office: officeForZip(zip) } : { kind: 'unmapped' });
  }

  return (
    <div className={styles.finder}>
      <form className={styles.form} onSubmit={findOffice} noValidate>
        <div className={styles.field}>
          <label htmlFor={inputId}>ZIP code</label>
          <input
            ref={inputRef}
            id={inputId}
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            enterKeyHint="go"
            maxLength={5}
            pattern="[0-9]{5}"
            required
            value={zip}
            placeholder="e.g. 35007"
            aria-invalid={result?.kind === 'invalid' ? true : undefined}
            aria-describedby={`${helpId} ${resultId}`}
            onChange={event => {
              setZip(event.target.value.replace(/\D/g, '').slice(0, 5));
              setResult(null);
            }}
          />
        </div>
        <button type="submit" className={styles.submit}>Find my local team<span aria-hidden="true">→</span></button>
      </form>
      <p className={styles.help} id={helpId}>Enter your five-digit ZIP code to find your local contact.</p>
      <div className={styles.result} id={resultId} aria-live="polite" aria-atomic="true">
        {result?.kind === 'invalid' && <p className={styles.error}>Please enter a five-digit ZIP code.</p>}
        {result?.kind === 'match' && (
          <div className={styles.match}>
            <p>Your local contact: <strong>{result.office.name}</strong></p>
            <a className={styles.phone} href={`tel:+1${result.office.phone}`}>Call {result.office.phoneDisplay}<span aria-hidden="true">↗</span></a>
          </div>
        )}
        {result?.kind === 'unmapped' && (
          <div className={styles.match}>
            <p>Call our main office to check service at your address.</p>
            <a className={styles.phone} href={mainOffice.phoneHref}>Call {mainOffice.phone}<span aria-hidden="true">↗</span></a>
          </div>
        )}
      </div>
    </div>
  );
}
