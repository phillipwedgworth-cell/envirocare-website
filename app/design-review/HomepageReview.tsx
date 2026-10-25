'use client';

import { useState } from 'react';
import styles from './HomepageReview.module.css';

const widths = [360, 390, 430, 768, 980, 1280];

export default function HomepageReview() {
  const [width, setWidth] = useState(390);
  const [version, setVersion] = useState<'redesign' | 'live'>('redesign');

  return (
    <main className={styles.board}>
      <header className={styles.toolbar}>
        <div className={styles.title}><strong>EnviroCare / Homepage review</strong><span>Scroll inside the page. Widths check layout; speed requires a separate test.</span></div>
        <div className={styles.controls}>
          <div role="group" aria-label="Homepage version" className={styles.group}>
            <button type="button" aria-pressed={version === 'live'} onClick={() => setVersion('live')}>Current live site</button>
            <button type="button" aria-pressed={version === 'redesign'} onClick={() => setVersion('redesign')}>Redesign</button>
          </div>
          <div role="group" aria-label="Preview width" className={styles.group}>
            {widths.map(value => <button type="button" key={value} aria-pressed={value === width} onClick={() => setWidth(value)}>{value}px</button>)}
          </div>
          <a href="/" target="_blank" rel="noreferrer">Open redesign ↗</a>
        </div>
      </header>
      <div className={styles.stage}>
        <iframe key={version} title="Homepage preview" src={version === 'live' ? 'https://www.envirocarellc.com/' : '/'} width={width} height={812} className={styles.frame} />
      </div>
    </main>
  );
}
