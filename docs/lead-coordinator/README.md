# EnviroCare Lead Coordinator

**Purpose:** every qualified inquiry has an assigned person, a next action and a verified outcome.

Sameday keeps answering calls. Fieldster keeps customers, routes and billing. The coordinator
does not talk to customers and never writes to Fieldster.

| Piece | File | What it does |
|---|---|---|
| Rules | `lib/leads/core.ts` | Parses Sameday emails, sorts each inquiry into sales / service / billing / other, sets the callback deadline, defines what each status requires, raises alerts. No AI model. |
| Owners | `data/lead-owners.ts` | Who owns each office's inquiries. **Still office queues — put names in.** |
| Schema | `supabase/lead-coordinator.sql` | Adds the columns and `lead_events`. Additive; undo at the top. **Not applied yet.** |
| Intake | `app/api/leads/ingest` + `docs/lead-coordinator/gmail-relay.gs` | Each Sameday email becomes a lead within about a minute. One lead per Sameday conversation, however often it's re-sent. |
| Lead Desk | `/lead-desk?key=…` | Staff mark contacted / booked (Fieldster # required) / lost (reason required). Every change records who made it. |
| Agent | `agents/lead-coordinator.mjs`, `.github/workflows/lead-coordinator.yml` | Weekdays. Assigns website-form leads, checks bookings against Fieldster (read-only, once a key is added), and emails the report. |
| Guard | `scripts/test-lead-coordinator.mjs` (`npm run test:leads`) | Locks the rules. |

## Rules (fixed, not AI)

- **Deadline:** staffed hours are Mon–Fri 8–5 Central.
  - During staffed hours, the deadline is 5 minutes.
  - After hours, it's 9:00 AM on the next business day.
  - These are operating targets to test, not a measure of current performance. Holidays aren't modelled.
- **Booked** requires the Fieldster appointment number. The database refuses "booked" without one.
- **Verified** is set only by the agent, after it finds that appointment through the Fieldster API and the customer's phone matches.
- **Lost** requires a reason. A sales inquiry can only end booked or lost.
- **Auto-closed:** a Sameday *campaign* (outbound) call that Sameday's own summary records as declined, hung up or "do not contact".
  - The reason names Sameday as the source.
  - Inbound calls are never auto-closed.
- **Alerts** (shown on the desk and in the report):
  - Do-not-contact requests
  - Cancellation requests
  - Any price Sameday stated on a call

## Tested against real calls

The parser was run over all 231 Sameday call emails from Sep 5 to Oct 5 2026 (Gmail, read Oct 5).

- Every one produced a phone number and a conversation ID.
- In that period the rules would have left 124 inquiries for staff, about 6 per business day, and auto-closed 107 campaign results.
- They would have raised 4 do-not-contact alerts, 2 cancellation alerts and 5 stated-price alerts.

## Turn it on (in order)

1. Run `supabase/lead-coordinator.sql` in Supabase (project dyoujmyleihcpqgeifre).
2. In Vercel (project envirocare-web-only-testing), add `LEADS_INGEST_KEY` and `LEADS_DESK_KEY`.
   - Use two different long random values.
   - Redeploy after adding them.
3. Set up the Gmail relay (5 minutes), following the header of `gmail-relay.gs`. Use the same `LEADS_INGEST_KEY`.
4. Put real names in `data/lead-owners.ts`.
5. Optional, and only after the Fieldster key is rotated: add the GitHub secret `FIELDSTER_API_KEY`. This turns on booking verification.
6. Bookmark `https://www.envirocarellc.com/lead-desk?key=<LEADS_DESK_KEY>` for the office.

## Not covered yet

- Calls staff answer directly, which never reach Sameday or the website form.
- Revenue from Fieldster invoices. Only what staff type on the desk is counted.
- A Sameday webhook. Ask Colin whether one exists; it would replace the Gmail relay.
