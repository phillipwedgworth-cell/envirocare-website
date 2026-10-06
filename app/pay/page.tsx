import { redirect } from 'next/navigation';

/**
 * /pay — the one internal Pay Bill URL.
 *
 * Every pay entry point (mobile action bar, header, hamburger "Customer Login",
 * future invoice QR codes, texts, GBP posts) should point here rather than at
 * the Key7 URL directly. If the processor ever changes, this file changes and
 * nothing else does — no reprinted QR codes, no edited text templates.
 *
 * REPLACES a stale holding page. Until 2026-09-22 this route rendered
 * "Our online payment portal is launching soon. In the meantime, call your
 * local office and we'll take payment over the phone." That had stopped being
 * true — payenvirocare.key7app.com is live and Header.tsx has linked customers
 * straight to it from two places. So the header sent people to the working
 * portal while /pay told them it did not exist yet and to phone instead.
 *
 * The old page also listed only THREE offices, with "Birmingham" against the
 * Alabaster line (205) 940-6360. Removing it retires that crossed pairing.
 *
 * REDIRECT, NOT AN EMBED — deliberate. Putting Key7's username/password form in
 * an iframe on envirocarellc.com makes it look like EnviroCare is collecting
 * the credentials, which reads as a phishing pattern even when done in good
 * faith. The login stays on Key7's own domain where it already lives.
 * Embedding is a call for Phillip to make explicitly, not a default.
 */
export default function PayRedirectPage() {
  redirect('https://payenvirocare.key7app.com/User/Login');
}
