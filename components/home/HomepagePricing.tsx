'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ACH_TERMS, PRICING } from '@/data/pricing';
import styles from './HomepagePricing.module.css';

type BillingMode = 'perservice' | 'monthly';
type PlanKey = 'pest' | 'mosquito' | 'termite';

interface Plan {
  key: PlanKey;
  name: string;
  description: string;
  bullets: string[];
  cta: string;
}

const PLANS: Plan[] = [
  {
    key: 'pest',
    name: 'Pest Control',
    description: 'Regular care for the place you call home.',
    bullets: [
      'Exterior treatment every other month; interior treatment on request',
      '30+ covered pests, including mice and rats',
      'Free re-service for covered pests between scheduled visits',
      'EPA-registered products applied per label directions',
    ],
    cta: 'Get a pest control quote',
  },
  {
    key: 'mosquito',
    name: 'Mosquito Control',
    description: 'Spend more time enjoying your yard.',
    bullets: [
      '8 seasonal yard treatments, March–October',
      'Targets adult mosquitoes and their harborage areas',
      'Free re-treatment between scheduled visits',
      'Mosquito reduction; tick coverage available by quote',
    ],
    cta: 'Get a mosquito quote',
  },
  {
    key: 'termite',
    name: 'Termite Protection',
    description: 'A plan built around your property.',
    bullets: [
      'Sentricon® Always Active™ bait system',
      'Free WDO inspection included',
      'No drilling or trenching in your yard',
      'Annual renewal priced for your home',
    ],
    cta: 'Request a termite inspection',
  },
];

const HOME_SERVICES = [
  { label: 'Tick control', href: '/services/tick-control' },
  { label: 'Fire ant control', href: '/services/fire-ant' },
  { label: 'Flea control', href: '/services/flea' },
];

const BUSINESS_SERVICES = [
  { label: 'Commercial pest control', href: '/services/commercial' },
  { label: 'Real estate / WDO letters', href: '/services/wdo-letters' },
  { label: 'Builder pre-treatment', href: '/builders' },
];

function initialServiceNote(plan: 'pest' | 'pestMosquito') {
  const startup = PRICING.plans[plan].startup;
  if (PRICING.initialServicePromo.active && PRICING.initialServicePromo.appliesTo.includes(plan)) {
    return `$${PRICING.initialServiceRegular} standard initial pest service, currently $${startup} with our ${PRICING.initialServicePromo.percentOff}%-off offer for qualifying new pest customers.`;
  }
  return `$${startup} initial pest service.`;
}

function PlanPrice({ plan, mode }: { plan: Plan; mode: BillingMode }) {
  if (plan.key === 'termite') {
    return (
      <span className={styles.priceGroup}>
        <span className={styles.quotedPrice}>Priced after inspection</span>
        <span className={styles.priceNote}>Start with a free WDO inspection</span>
      </span>
    );
  }

  if (plan.key === 'mosquito' && mode === 'perservice') {
    return (
      <span className={styles.priceGroup}>
        <span className={styles.quotedPrice}>Monthly plan only</span>
        <span className={styles.priceNote}>${PRICING.addOns.mosquito.monthly}/month by ACH · average-size yard</span>
      </span>
    );
  }

  const monthly = mode === 'monthly';
  const amount = plan.key === 'pest'
    ? monthly ? PRICING.plans.pest.fromMonthly : PRICING.plans.pest.perVisit
    : PRICING.addOns.mosquito.monthly;

  return (
    <span className={styles.priceGroup}>
      <span className={styles.priceLine}>
        {plan.key === 'pest' && monthly && <span className={styles.from}>From </span>}
        <span className={styles.amount}>${amount}</span>
        <span className={styles.unit}>/{monthly ? 'month' : 'visit'}</span>
      </span>
      <span className={styles.priceNote}>
        {monthly ? `12-month agreement · ACH billing${plan.key === 'mosquito' ? ' · average-size yard' : ''}` : `${PRICING.plans.pest.visitsPerYear} visits a year · every other month`}
      </span>
    </span>
  );
}

function PlanContent({ plan, mode }: { plan: Plan; mode: BillingMode }) {
  return (
    <div className={styles.planContent}>
      <ul className={styles.features}>
        {plan.bullets.map(bullet => (
          <li key={bullet}><span className={styles.check} aria-hidden="true">✓</span><span>{bullet}</span></li>
        ))}
      </ul>

      {plan.key === 'termite' ? (
        <p className={styles.coverage}>
          Up to $1,000,000 in termite damage repair coverage provided by EnviroCare on qualifying homes,
          subject to the terms of the agreement. Inspection and approval are required.
        </p>
      ) : plan.key === 'pest' ? (
        <p className={styles.planNote}>{initialServiceNote('pest')}</p>
      ) : (
        <p className={styles.planNote}>
          For an average-size yard; firm price after a free inspection. No startup fee.
          {mode === 'monthly' && <> ${PRICING.addOns.mosquito.monthlyWithPestOnly}/month only when paired with pest control.</>}
        </p>
      )}

      <Link href="/quote" className={styles.planCta} prefetch={false}>
        {plan.cta}<span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}

export default function HomepagePricing() {
  const [mode, setMode] = useState<BillingMode>('perservice');

  return (
    <section className={styles.section} id="services-pricing" aria-labelledby="homepage-pricing-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Services &amp; pricing</p>
            <h2 className={`${styles.heading} ec-section-h2`} id="homepage-pricing-title">Protection that fits your home.</h2>
            <p className={styles.lead}>Compare your options, see what is included, and choose where to start.</p>
          </div>
          <div className={styles.billing}>
            <div className={styles.toggle} role="group" aria-label="Pricing display">
              <button type="button" aria-pressed={mode === 'perservice'} onClick={() => setMode('perservice')}>Per Service</button>
              <button type="button" aria-pressed={mode === 'monthly'} onClick={() => setMode('monthly')}>Monthly ACH</button>
            </div>
            <p className={styles.billingNote}>
              {mode === 'perservice' ? 'Pest control billed at each scheduled visit.' : 'Equal, averaged monthly payments.'}
            </p>
          </div>
        </div>

        {/* Native disclosures keep the complete plan copy in the initial HTML and
            work before hydration. The desktop view is a static comparison grid;
            CSS exposes only one view, avoiding viewport-driven layout changes. */}
        <div className={styles.mobileList}>
          {PLANS.map(plan => (
            <details key={plan.key} name="homepage-service-plans" className={styles.mobileCard}>
              <summary className={styles.summary}>
                <span className={styles.summaryTop}>
                  <span className={styles.mobileName}>{plan.name}</span>
                  <span className={styles.disclosure} aria-hidden="true">+</span>
                </span>
                <PlanPrice plan={plan} mode={mode} />
              </summary>
              <PlanContent plan={plan} mode={mode} />
            </details>
          ))}
        </div>

        <div className={styles.desktopGrid}>
          {PLANS.map((plan, index) => (
            <article key={plan.key} className={styles.desktopCard} aria-labelledby={`homepage-plan-${plan.key}`}>
              <div className={styles.cardHeading}>
                <span className={styles.planNumber} aria-hidden="true">0{index + 1}</span>
                <h3 className={styles.planName} id={`homepage-plan-${plan.key}`}>{plan.name}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
                <PlanPrice plan={plan} mode={mode} />
              </div>
              <PlanContent plan={plan} mode={mode} />
            </article>
          ))}
        </div>

        <div className={styles.bundle}>
          <div className={styles.bundleCopy}>
            <p className={styles.bundleEyebrow}>Pest + Mosquito</p>
            <h3>One home. One monthly bill.</h3>
            <p>Year-round pest control and seasonal mosquito service on one invoice.</p>
            <p className={styles.bundleInitial}>{initialServiceNote('pestMosquito')}</p>
          </div>
          <div className={styles.bundleAction}>
            <p className={styles.bundlePrice}>From <strong>${PRICING.plans.pestMosquito.fromMonthly}</strong><span>/month by ACH</span></p>
            <Link href="/quote" className={styles.bundleCta} prefetch={false}>Get a bundle quote<span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <p className={styles.achTerms}>{ACH_TERMS}</p>
        <div className={styles.moreServices}>
          <div className={styles.serviceRow}>
            <span className={styles.serviceLabel}>Additional home services</span>
            <div className={styles.serviceLinks}>{HOME_SERVICES.map(service => <Link key={service.href} href={service.href} prefetch={false}>{service.label}</Link>)}</div>
          </div>
          <div className={styles.serviceRow}>
            <span className={styles.serviceLabel}>Business &amp; real estate</span>
            <div className={styles.serviceLinks}>{BUSINESS_SERVICES.map(service => <Link key={service.href} href={service.href} prefetch={false}>{service.label}</Link>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
