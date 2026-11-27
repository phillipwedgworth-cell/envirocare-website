// components/LeadAttribution.tsx — records the session's landing page so a web
// lead can be traced to the page that produced it. Renders nothing.
// See lib/leads/attribution.ts for what is (and is not) stored.
'use client';

import { useEffect } from 'react';
import { captureFirstTouch } from '@/lib/leads/attribution';

export default function LeadAttribution() {
  useEffect(() => {
    captureFirstTouch();
  }, []);
  return null;
}
