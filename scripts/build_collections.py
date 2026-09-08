#!/usr/bin/env python3
"""
EnviroCare Collections — daily rebuild
======================================
Pulls live A/R from the Key7 / Fieldster REST API and rewrites the shared
workbook IN PLACE (same file, same tabs) so staff always open a current list.

WHAT IT TOUCHES
  Overwrites daily : Today, Call List, All Accounts, Start Here (date)
  Never overwrites : Contact Log, ACH Draft Log  (staff type here — preserved)
  Monthly only     : Trend, Getting Worse         (left alone unless --monthly)

READ-ONLY. This script only issues GET requests to Fieldster. It never writes
to a customer record or bills anyone. The one write it makes is to the local
.xlsx file.

AUTH — SOLVED 2026-09-08. The header is:

    Key7-Authentication: <api key>

Found in the Postman collection Fieldster publishes at
https://<subdomain>.key7app.com/api/  ("FieldsterAPI.postman_collection v1.3.json",
variable {{APIKey}} sent as header `Key7-Authentication`). Verified live against
/api/Customers — HTTP 200.

Every other guess returns {"message":"API key missing","error_code":"401"} —
and so does sending NO key at all, which is why guessing never converged: the
error is identical for a wrong header name and for no header, so it carries no
signal about which name is right. Do not re-derive this by probing.

SETUP (one time)
  pip install openpyxl requests
  Environment variables (never hard-code the key here — this repo is PUBLIC):
      FIELDSTER_API_TOKEN  = <key from Key7 Admin > API > Rest API>
      COLLECTIONS_XLSX     = C:\\full\\path\\to\\EnviroCare_Collections.xlsx
      FIELDSTER_API_HEADER = optional override; defaults to Key7-Authentication

RUN
  python build_collections.py            # daily rebuild
  python build_collections.py --monthly  # also rebuild Trend / Getting Worse
  python build_collections.py --dry-run  # pull + print totals, write nothing

SCHEDULE (Windows Task Scheduler, every weekday 7:00 AM)
  Program:  python
  Args:     C:\\path\\to\\build_collections.py
  Start in: C:\\path\\to\\   (folder containing the .xlsx)
"""

import os
import sys
import datetime
import time
from collections import defaultdict

import requests
from openpyxl import load_workbook

# ---- config ---------------------------------------------------------------
BASE = os.environ.get("FIELDSTER_API_BASE", "https://envirocare.key7app.com/api")
WORKBOOK = os.environ.get("COLLECTIONS_XLSX", "EnviroCare_Collections.xlsx")
KEY = os.environ.get("FIELDSTER_API_TOKEN") or os.environ.get("FIELDSTER_API_KEY")
HEADER = os.environ.get("FIELDSTER_API_HEADER", "Key7-Authentication")
TODAY = datetime.date.today()


def die(msg):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


# ---- API session ----------------------------------------------------------
def make_session():
    if not KEY:
        die("Missing FIELDSTER_API_TOKEN environment variable.")
    s = requests.Session()
    s.headers[HEADER] = KEY
    try:
        r = s.get(f"{BASE}/Customers", params={"PageSize": 1}, timeout=20)
    except requests.RequestException as e:
        die(f"Could not reach {BASE}: {e}")
    if r.status_code != 200:
        die(f"Auth failed with header '{HEADER}' (HTTP {r.status_code}: "
            f"{r.text[:120]}). The verified header is Key7-Authentication; if that "
            f"is what was sent, the KEY itself is wrong or revoked.")
    return s


# ---- paged GET helper -----------------------------------------------------
# The parameters are `page` and `page_size`, LOWERCASE. The original version of
# this script sent Page/PageSize, which the API ignores — it silently served its
# own default instead, so paging never worked and large pulls timed out.
# page_size defaults to 1000 and 1000 is the maximum (Fieldster API doc v1.3).
PAGE_SIZE = 1000


def get_all(session, endpoint, params=None, label=None):
    """Return every row from a paged Fieldster list endpoint."""
    params = dict(params or {})
    params["page_size"] = PAGE_SIZE
    page, out = 0, []
    while True:
        params["page"] = page
        r = session.get(f"{BASE}/{endpoint}", params=params, timeout=180)
        r.raise_for_status()
        data = r.json()
        rows = data if isinstance(data, list) else data.get("Items", data.get("Data", []))
        if not rows:
            break
        out.extend(rows)
        if label:
            print(f"    {label}: {len(out)} rows...")
        if len(rows) < PAGE_SIZE:
            break
        page += 1
        time.sleep(0.2)
    return out


# ---- pull + shape ---------------------------------------------------------
# ONE filtered query, not two full-table pulls.
#
# The live API is snake_case, and each invoice EMBEDS its customer as
# `billing_customer` — carrying customer_number, customer_name, customer_type,
# city, primary_phone, primary_email and status, which is everything the
# workbook needs. So /Customers is never called at all.
#
# `balance_start=0.01` returns only invoices with money outstanding, which IS
# the A/R. Measured 2026-09-08: 990 open invoices, $146,563.53, in 10.5 seconds.
# For contrast, the endpoint is brutally slow unfiltered — 15.8s for ONE
# customer record and a hard timeout past ~50 — because every customer embeds
# its full `agreements` array. Pulling all customers and all invoices since 2005
# to reconstruct the same number would take well over an hour and cannot run in
# a 7am window. Do not "simplify" this back to unfiltered pulls.
def pull_accounts(session):
    invoices = get_all(session, "invoices", {"balance_start": "0.01"}, label="open invoices")
    print(f"  pulled {len(invoices)} open invoices")

    by_customer = defaultdict(list)
    for inv in invoices:
        bc = inv.get("billing_customer") or {}
        cid = bc.get("id")
        if cid is not None:
            by_customer[cid].append(inv)

    accounts = []
    for cid, invs in by_customer.items():
        c = invs[0].get("billing_customer") or {}
        bal = sum(_money(i.get("balance")) for i in invs)
        if bal <= 0:
            continue

        ages = [(_days_past_due(i), _money(i.get("balance"))) for i in invs]
        ages = [(d, v) for d, v in ages if d is not None]

        def bucket(lo, hi):
            return round(sum(v for d, v in ages
                             if (d >= lo if hi is None else lo <= d <= hi)), 2)

        oldest = max((d for d, _ in ages), default=0)
        pd30 = round(sum(v for d, v in ages if d >= 30), 2)
        pd60 = round(sum(v for d, v in ages if d >= 60), 2)

        accounts.append({
            "account": c.get("customer_number") or "",
            "customer": c.get("customer_name") or "",
            "type": (c.get("customer_type") or "residential").lower(),
            "status": (c.get("status") or "active").lower(),
            "city": c.get("city") or "",
            "phone": c.get("primary_phone") or c.get("primary_mobile") or "",
            "email": c.get("primary_email") or "",
            "balance": round(bal, 2),
            # "current" is anything not yet past due, i.e. due today or later.
            "current": round(sum(v for d, v in ages if d <= 0), 2),
            "b1_30": bucket(1, 30),
            "b31_60": bucket(31, 60),
            "b61_90": bucket(61, 90),
            "b91": bucket(91, None),
            "pd60": pd60,
            "pd30": pd30,
            "oldest": oldest,
            # NOT AVAILABLE FROM THIS API. Neither /customers nor /invoices returns
            # a payment method or an autopay flag — the customer schema is
            # id, customer_number, customer_name, second_customer_name, attention,
            # customer_type, address1-3, city, state, zip, notes, primary_phone,
            # primary_email, primary_mobile, status, first_name, last_name,
            # agreements. Defaulting these to "Nothing on file" / False would make
            # segment() call EVERY 60+ account "Chronic - escalate", which is a
            # made-up label that would misdirect the call list. Left explicitly
            # unknown until someone confirms which endpoint carries it.
            "method": "Unknown — not in API",
            "on_autopay": None,
        })
    return accounts


def _money(v):
    try:
        return float(v or 0)
    except (TypeError, ValueError):
        return 0.0


def _days_past_due(inv):
    due = inv.get("due_date")
    if not due:
        return None
    try:
        d = datetime.datetime.fromisoformat(str(due).replace("Z", "")).date()
    except ValueError:
        try:
            d = datetime.datetime.strptime(str(due)[:10], "%Y-%m-%d").date()
        except ValueError:
            return None
    return (TODAY - d).days


def segment(a):
    # The "chronic" and "autopay failing" branches are gated on payment-method
    # data this API does not expose (see pull_accounts). They stay in place for
    # when a source is found, but cannot fire on `None` — so nothing is labelled
    # chronic on the strength of a default value.
    if a["pd60"] > 0 and a["method"] == "Nothing on file":
        return "1. Chronic - escalate"
    if a["on_autopay"] is True and a["pd30"] > 0:
        return "2. Autopay failing - fix payment method"
    if a["oldest"] >= 60:
        return "4. Past due 60+"
    if a["oldest"] >= 30:
        return "5. Past due 30+"
    return "6. Current"


# ---- write workbook -------------------------------------------------------
def rebuild(accounts, monthly=False, dry=False):
    past_due = sorted([a for a in accounts if a["pd30"] > 0], key=lambda x: -x["balance"])

    if dry:
        tot = round(sum(a["balance"] for a in accounts), 2)
        pd30 = round(sum(a["pd30"] for a in accounts), 2)
        pd60 = round(sum(a["pd60"] for a in accounts), 2)
        print(f"DRY RUN — {len(accounts)} accounts with a balance | A/R ${tot:,.2f} | "
              f"past due 30+ ${pd30:,.2f} | 60+ ${pd60:,.2f} | call list {len(past_due)}")
        for a in past_due[:5]:
            print(f"    {a['account']:<16} {a['customer'][:28]:<28} "
                  f"${a['balance']:>10,.2f}  oldest {a['oldest']}d")
        return

    if not os.path.exists(WORKBOOK):
        die(f"Workbook not found: {WORKBOOK}. Set COLLECTIONS_XLSX to its full path.")
    wb = load_workbook(WORKBOOK)

    ws = wb["All Accounts"]
    _clear_below_header(ws)
    for a in sorted(accounts, key=lambda x: -x["balance"]):
        ws.append([a["account"], a["customer"], a["type"], a["status"], a["city"],
                   a["phone"], a["email"], a["balance"], a["current"], a["b1_30"],
                   a["b31_60"], a["b61_90"], a["b91"], a["pd60"], a["pd30"], a["oldest"]])

    ws = wb["Call List"]
    _clear_below_header(ws, header_row=2)
    for a in past_due:
        why = "60+ days past due" if a["oldest"] >= 60 else "30+ days past due"
        ws.append([a["account"], a["customer"], a["phone"], a["email"],
                   a["pd30"], a["balance"], why, a["method"], segment(a)])

    ws = wb["Today"]
    _clear_below_header(ws, header_row=3)
    for i, a in enumerate([x for x in past_due if x["oldest"] >= 60], 1):
        ws.append([i, a["account"], a["customer"], a["phone"], a["pd30"], a["balance"],
                   "60+ days past due",
                   "Over 60 days. Get a commitment with a date.", "", "", "", ""])
    # %-d is a glibc extension and raises ValueError on Windows, which is where
    # this runs from Task Scheduler. Format the day separately.
    ws["A2"] = (f"Rebuilt from Fieldster at 7am "
                f"{TODAY:%A, %B} {TODAY.day}. Worst first.")

    sh = wb["Start Here"]
    for row in sh.iter_rows():
        for cell in row:
            if cell.value == "Last rebuilt":
                sh.cell(cell.row, cell.column + 1).value = TODAY.isoformat()

    if monthly:
        print("  (monthly Trend / Getting Worse rebuild would run here)")

    wb.save(WORKBOOK)
    print(f"Saved {WORKBOOK} — {len(accounts)} accounts, {len(past_due)} past due.")


def _clear_below_header(ws, header_row=1):
    if ws.max_row > header_row:
        ws.delete_rows(header_row + 1, ws.max_row - header_row)


# ---- main -----------------------------------------------------------------
if __name__ == "__main__":
    dry = "--dry-run" in sys.argv
    monthly = "--monthly" in sys.argv
    session = make_session()
    accounts = pull_accounts(session)
    rebuild(accounts, monthly=monthly, dry=dry)
