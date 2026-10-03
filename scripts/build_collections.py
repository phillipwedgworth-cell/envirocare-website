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

READ-ONLY AGAINST FIELDSTER. This script only issues GET requests to Fieldster.
It never writes to a customer record or bills anyone. It writes in two places:
the local .xlsx file, and (added 2026-09-14) the Supabase tables
collections_call_list + collections_snapshots, which is what the staff texting
route at app/api/collections/send-batch-text reads. See push_to_supabase()
for why that second write exists and why the workbook is still primary.

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
      SUPABASE_URL         = https://<ref>.supabase.co
      SUPABASE_SERVICE_ROLE_KEY = service-role key (needs write on the
                             collections_* tables). Without these two the
                             workbook still rebuilds and the Supabase push is
                             skipped with a printed SKIP — which means the
                             texting route goes stale. Set them.

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


# ---- push to Supabase -----------------------------------------------------
# ADDED 2026-09-14. Until now this script wrote ONLY the local workbook, while
# app/api/collections/send-batch-text/route.ts read collections_call_list from
# Supabase and its comment claimed this script refreshed that table. It did not.
# Nothing did. The table was hand-seeded on 2026-09-09 and sat frozen for five
# days while the workbook moved on daily — so the texting tool was quoting
# balances that were already stale, including for customers who had since paid.
#
# The workbook remains the staff-facing source of truth. This push exists so the
# texting route is never OLDER than the workbook staff are working from.
#
# PHONE NORMALIZATION. The workbook keeps the raw Fieldster string, because
# staff rely on the notes glued to it ("2055408577Joe", "2052225781cell",
# "2567494626 her"). Those same strings would be dialled literally by the text
# route, so what gets pushed here is digits-only E.164, and anything that does
# not reduce to a valid 10/11-digit US number is pushed as "" — the route skips
# empty phones, which is the correct failure mode. Do not "fix" this by pushing
# the raw string.
#
# FAILURE IS LOUD. The workbook write happens first and is never blocked by a
# Supabase problem; staff always get their list. But a failed push exits 1 so
# the 7am Task Scheduler run goes red rather than silently re-freezing the table.
SUPABASE_URL = (os.environ.get("SUPABASE_URL") or "").rstrip("/")
SUPABASE_KEY = (os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
                or os.environ.get("SUPABASE_SERVICE_KEY")
                or os.environ.get("SUPABASE_KEY") or "")


def normalize_phone(raw):
    """Digits-only US number, or '' if it isn't one."""
    digits = "".join(ch for ch in str(raw or "") if ch.isdigit())
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    if len(digits) != 10 or digits[0] in "01":
        return ""
    return digits


def push_to_supabase(accounts, past_due):
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("  SKIP Supabase push — SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set.")
        return False

    rows, dropped = [], 0
    for a in past_due:
        phone = normalize_phone(a["phone"])
        if not phone and a["phone"]:
            dropped += 1
        rows.append({
            "account": a["account"],
            "customer": a["customer"],
            "phone": phone,
            "email": a["email"],
            "balance": a["balance"],
            "past_due_30": a["pd30"],
            "oldest_days": a["oldest"],
            "segment": segment(a),
            "updated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        })

    h = {"apikey": SUPABASE_KEY,
         "Authorization": f"Bearer {SUPABASE_KEY}",
         "Content-Type": "application/json"}
    base = f"{SUPABASE_URL}/rest/v1"

    try:
        # Full replace: this table is a daily snapshot, not an accumulating log.
        # An account that paid off must DISAPPEAR, so upsert alone is not enough.
        r = requests.delete(f"{base}/collections_call_list",
                            headers=h, params={"account": "not.is.null"}, timeout=60)
        r.raise_for_status()

        for i in range(0, len(rows), 500):
            r = requests.post(f"{base}/collections_call_list", headers=h,
                              json=rows[i:i + 500], timeout=120)
            r.raise_for_status()

        tot = round(sum(a["balance"] for a in accounts), 2)
        r = requests.post(f"{base}/collections_snapshots", headers=h, timeout=60, json={
            "snapshot_date": TODAY.isoformat(),
            "total_ar": tot,
            "accounts_with_balance": len(accounts),
            "past_due_30": round(sum(a["pd30"] for a in accounts), 2),
            "past_due_60": round(sum(a["pd60"] for a in accounts), 2),
            "call_list_count": len(rows),
            "source": "build_collections.py",
        })
        r.raise_for_status()
    except requests.RequestException as e:
        print(f"ERROR: Supabase push failed: {e}", file=sys.stderr)
        print("  The workbook IS current. The texting route is NOT — do not queue "
              "batch texts until this run goes green.", file=sys.stderr)
        return False

    print(f"  Supabase: {len(rows)} call-list rows + 1 snapshot"
          + (f" ({dropped} phones unusable, pushed blank)" if dropped else ""))
    return True


# ---- main -----------------------------------------------------------------
if __name__ == "__main__":
    dry = "--dry-run" in sys.argv
    monthly = "--monthly" in sys.argv
    session = make_session()
    accounts = pull_accounts(session)
    rebuild(accounts, monthly=monthly, dry=dry)

    if dry:
        sys.exit(0)
    # Workbook is already saved. Supabase is best-effort but loud on failure.
    past_due = sorted([a for a in accounts if a["pd30"] > 0], key=lambda x: -x["balance"])
    if not push_to_supabase(accounts, past_due):
        sys.exit(1)
