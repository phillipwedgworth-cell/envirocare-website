import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Check, MapPin, Phone, ShieldCheck } from 'lucide-react';
import HomepagePricing from '@/components/home/HomepagePricing';
import HomepageZipFinder from '@/components/home/HomepageZipFinder';
import { OFFICES, type OfficeId } from '@/data/offices';
import styles from './Homepage.module.css';

// Static sections render on the server; pricing and the ZIP form are client islands.
// Header, chat, tracking, footer and mobile actions remain owned by layout.tsx.
const mainOffice = OFFICES.birmingham;
const localOffices: { id: OfficeId; href: string }[] = [
  { id: 'birmingham-downtown', href: '/birmingham' },
  { id: 'birmingham', href: '/alabaster' },
  { id: 'huntsville', href: '/huntsville' },
  { id: 'lake-martin', href: '/alexander-city' },
];
const serviceLinks = [
  ['Pest control', '/services/pest-control'], ['Termite protection', '/services/termite-control'],
  ['Mosquito control', '/services/mosquito'], ['Tick control', '/services/tick-control'],
  ['Fire ant control', '/services/fire-ant'], ['Flea control', '/services/flea'],
  ['Commercial pest control', '/services/commercial'], ['Real estate / WDO letters', '/services/wdo-letters'],
  ['Builder pre-treatment', '/builders'],
];
// Retain the existing crawlable service-area destinations.
const popularAreas = [
  ['Birmingham', '/birmingham'], ['Hoover', '/hoover'],
  ['Vestavia Hills', '/vestavia-hills'], ['Mountain Brook', '/mountain-brook'],
  ['Homewood', '/homewood'], ['Trussville', '/trussville'],
  ['Alabaster', '/alabaster'], ['Pelham', '/pelham'], ['Helena', '/helena'], ['Chelsea', '/chelsea'],
  ['Greystone', '/greystone'], ['Calera', '/calera'], ['Gardendale', '/gardendale'],
  ['Alexander City', '/alexander-city'], ['Alex City / Lake Martin', '/lake-martin'],
  ['Auburn', '/auburn'], ['Huntsville', '/huntsville'], ['Madison', '/madison'],
];
// Existing published selections, not a live feed or independently verified sample.
const reviews = [
  { name: 'Jessica M.', city: 'Huntsville, AL', text: 'My husband and I love the service and technicians. Could not recommend more!' },
  { name: 'Ann S.', city: 'Hoover, AL', text: 'Very professional, schedules with us, and is always on time.' },
  { name: 'Dariel S.', city: 'Madison, AL', text: 'No other pest control company can top the service from EnviroCare!!!' },
  { name: 'Janet H.', city: 'Birmingham, AL', text: 'The technician was friendly and careful of our things. Five stars without hesitation.' },
];

export default function Homepage() {
  return (
    <main className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Alabama pest, termite &amp; mosquito control</p>
            <h1 id="home-heading">Pest protection for <span>the home you love.</span></h1>
            <p className={`${styles.heroIntro} ec-hero-sub`}>Your home. Your yard. One familiar local team. Pest, termite and mosquito care from a fourth-generation Alabama family business.</p>
            <div className={styles.heroActions}>
              <Link href="/quote" className={styles.primaryButton}>Get a free quote <ArrowRight size={18} aria-hidden="true" /></Link>
              <a href={mainOffice.phoneHref} className={styles.callButton} aria-label={`Call EnviroCare at ${mainOffice.phone}`}>
                <Phone size={18} aria-hidden="true" /><span className={styles.mobileCall}>Call</span><span className={styles.desktopCall}>{mainOffice.phone}</span>
              </a>
            </div>
            <p className={styles.heroProof}><ShieldCheck size={18} aria-hidden="true" />Licensed in Alabama <span aria-hidden="true">·</span> Family owned</p>
            <a href="#home-plans" className={styles.exploreLink}>Explore services &amp; pricing <ArrowDown size={15} aria-hidden="true" /></a>
          </div>
          <figure className={styles.heroPhoto}>
            {/* Existing approved stock photograph; not an EnviroCare customer/job.
                One responsive element replaces hidden mobile/desktop preloads. */}
            <Image src="/hero-family.jpg" alt="Family playing with their dog in a sunny backyard"
              width={1360} height={765}
              sizes="(max-width: 759px) calc(100vw - 40px), (max-width: 1239px) 50vw, 600px"
              priority className={styles.heroImage} />
            <figcaption className={styles.photoCaption}><span className={styles.captionMark} aria-hidden="true">✿</span><span>More time for <strong>what matters.</strong></span></figcaption>
          </figure>
        </div>
      </section>

      <nav className={styles.localBand} aria-label="Our local offices">
        <div className={`${styles.container} ${styles.localBandInner}`}>
          <span><MapPin size={17} aria-hidden="true" /> Local teams. Alabama roots.</span>
          <div><Link href="/birmingham">Birmingham</Link><Link href="/alabaster">Alabaster</Link><Link href="/huntsville">Huntsville</Link><Link href="/alexander-city">Alexander City</Link></div>
        </div>
      </nav>
      <div id="home-plans" className={styles.anchorTarget}><HomepagePricing /></div>

      <section className={styles.reviewSection} aria-labelledby="home-reviews-heading">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div><p className={styles.eyebrow}>The people behind the reviews</p><h2 id="home-reviews-heading">What our customers say.</h2></div>
            <Link href="/reviews" className={styles.textLink}>Read more reviews <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className={styles.reviewGrid}>{reviews.map(review => (
            <figure key={review.name} className={styles.reviewCard}>
              <span className={styles.quoteMark} aria-hidden="true">“</span><blockquote>{review.text}</blockquote>
              <figcaption><strong>{review.name}</strong><span>{review.city}</span></figcaption>
            </figure>
          ))}</div>
        </div>
      </section>

      <section className={styles.storySection} aria-labelledby="home-story-heading">
        <div className={`${styles.container} ${styles.storyGrid}`}>
          <figure className={styles.teamPhoto}>
            <Image src="/ribbon-cutting-1.jpg" alt="The EnviroCare family team at a ribbon cutting" width={800} height={479} sizes="(max-width: 759px) calc(100vw - 40px), 540px" />
            <figcaption>The EnviroCare family team.</figcaption>
          </figure>
          <div className={styles.storyCopy}>
            <p className={styles.eyebrow}>Our family. Your local team.</p>
            <h2 id="home-story-heading">Four generations.<br /><span>Still family owned.</span></h2>
            <p>Our family has been doing pest control in Alabama since 1958, with roots in Alexander City. Today, our local teams help care for homes across Central and North Alabama.</p>
            <p className={styles.storyQuote}>“No One Cares Like EnviroCare.”</p>
            <div className={styles.ownerRow}>
              <Image src="/kevin.jpg" alt="Kevin Wedgworth" width={52} height={52} sizes="52px" />
              <span><strong>Kevin Wedgworth</strong><span>Owner &amp; Operator</span></span>
              <Link href="/about-us" className={styles.textLink}>Our story <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.officeSection} aria-labelledby="home-offices-heading">
        <div className={styles.container}>
          <div className={styles.officeIntro}>
            <div><p className={styles.eyebrow}>Four offices across Alabama</p><h2 id="home-offices-heading">Find your local team.</h2><p>Enter your ZIP code to find the office that serves your home.</p></div>
            <HomepageZipFinder />
          </div>
          <div className={styles.officeGrid}>{localOffices.map(({ id, href }) => {
            const office = OFFICES[id];
            return (
              <article key={office.id} className={styles.officeCard}>
                <MapPin size={21} aria-hidden="true" /><h3><Link href={href}>{office.name}</Link></h3>
                <address>{office.address.street}<br />{office.address.city}, {office.address.region} {office.address.postalCode}</address>
                <a href={office.phoneHref} className={styles.officePhone}><Phone size={15} aria-hidden="true" />{office.phone}</a>
              </article>
            );
          })}</div>
          <div className={styles.areaLinks}>
            <h3>Serving your neighborhood</h3><div>{popularAreas.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}</div>
            <Link href="/service-areas" className={styles.textLink}>All service areas <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className={styles.serviceDirectory} aria-labelledby="home-services-heading">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div><p className={styles.eyebrow}>One local company</p><h2 id="home-services-heading">Care for every corner.</h2></div>
            <p>For your home, your business,<br className={styles.desktopBreak} /> and your next real-estate closing.</p>
          </div>
          <div className={styles.directoryGrid}>{serviceLinks.map(([name, href]) => (
            <Link key={href} href={href}><Check size={17} aria-hidden="true" /><span>{name}</span><ArrowRight size={16} aria-hidden="true" /></Link>
          ))}</div>
        </div>
      </section>

      <section className={styles.closingSection} aria-labelledby="home-close-heading">
        <div className={`${styles.container} ${styles.closingInner}`}>
          <div><p className={styles.closingEyebrow}>Let’s take care of your home.</p><h2 id="home-close-heading">Good service starts<br />with a conversation.</h2></div>
          <div className={styles.closingActions}>
            <Link href="/quote" className={styles.primaryButton}>Get a free quote <ArrowRight size={18} aria-hidden="true" /></Link>
            <a href={mainOffice.phoneHref}><Phone size={17} aria-hidden="true" /> {mainOffice.phone}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
