---
name: fieldster-api
description: Use when code or a task needs EnviroCare's Fieldster (Key7) data: customers, invoices, appointments or agreements. Gives the verified base URL, auth header, paging and field names, the read-only rule, and what the API cannot do (chemical usage, payments).
---

# Fieldster (Key7) API for EnviroCare

Fieldster is sold by Key 7 Software LLC; "Key7" and "Fieldster" are the same
system. Use the shared client `agents/lib/fieldster.mjs` rather than writing a
new fetch.

## Verified facts (do not re-derive by probing)

- Base: `https://envirocare.key7app.com/api` (override `FIELDSTER_API_BASE`).
- Auth header: `Key7-Authentication: <key>` (override `FIELDSTER_API_HEADER`).
  Key from `FIELDSTER_API_TOKEN`, or `FIELDSTER_API_KEY`. A wrong header and no
  header return the same 401, so a 401 does not say which.
- Paging: `page` (0-indexed) and `page_size` (max 1000). `PageSize` is ignored.
- Lists are flat JSON arrays; fields are snake_case.
- `invoices?balance_start=0.01` = open A/R. Each invoice embeds
  `billing_customer` (`id`, `customer_number`, `customer_name`, phone, email).
- `customers` is slow because each row embeds every agreement; avoid full pulls.
- `agreements?status=active` gives summaries; signed flag and date are only on
  `agreements/{id}`.
- `appointments?appointment_date_start=YYYY-MM-DD`; `appointments/{id}`.
- `Customers/Storedcards` takes `customer_id` (renamed from `customerId` on
  2026-10-30 without notice). Never log its body.

## What the API cannot do

- No chemical-usage data. The CHE-100D Chemical Usage Detail report still needs
  the logged-in Fieldster report screen in a browser.
- No payments, payouts, ACH returns or chargebacks. Those come from Fieldster
  Payments (payments@fieldster.io) by email and the merchant portal.

## Rules

- Read only. Never POST, PUT, PATCH or DELETE against Fieldster from this repo
  without Phillip's explicit approval and an explicit `FIELDSTER_ALLOW_WRITES`
  flag in reviewed code.
- This repo is public. Never commit the key, a customer record, a stored-card
  response or an account number.
- `agents/fieldster-health.mjs` runs every weekday at 6:30am CT inside
  `collections-suppression.yml` and goes red when an endpoint or field the
  fleet reads changes.
