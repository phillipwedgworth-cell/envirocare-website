"""
EnviroCare — push Contact Log entries to Fieldster customer records

Usage:
    FIELDSTER_API_TOKEN=xxx python scripts/sync_contacts.py <tracker.xlsx> [--dry-run]

Reads the Contact Log tab and POSTs each new entry to Fieldster via
POST /api/customers/recordcall so the customer's Fieldster record shows
every collections call/text. Marks synced rows by appending [SYNCED] to
the Notes column so nothing is double-posted.

Pass --dry-run to preview every payload without POSTing or writing the
workbook back — recommended for the first run until the API details below
are confirmed.

NOTE: Verify the base URL and auth header format against the Fieldster
API docs before the first live run — placeholders are marked TODO below.
The credential is read from the FIELDSTER_API_TOKEN environment variable
(same name used in .env.example); never hard-code the key in this file —
this is a public repository.
"""

import sys, os, datetime

import requests

from openpyxl import load_workbook


BASE_URL = "https://api.fieldster.com"          # TODO: confirm from API docs

# Read the credential from the environment. FIELDSTER_API_TOKEN matches
# .env.example; FIELDSTER_API_KEY is accepted as a fallback for the older
# usage string. Never commit the actual key value to source.
API_KEY = os.environ.get("FIELDSTER_API_TOKEN") or os.environ.get("FIELDSTER_API_KEY")
if not API_KEY:
    sys.exit(
        "Missing credential: set FIELDSTER_API_TOKEN (or FIELDSTER_API_KEY) "
        "in the environment before running."
    )

HEADERS = {"Authorization": f"Bearer {API_KEY}"}  # TODO: confirm auth scheme


def main(xlsx_path, dry_run=False):
    wb = load_workbook(xlsx_path)
    lg = wb["Contact Log"]
    synced = 0
    for row in range(2, 1002):
        fid = lg.cell(row=row, column=2).value
        if not fid: continue
        notes = str(lg.cell(row=row, column=7).value or "")
        if "[SYNCED]" in notes or "SAMPLE" in notes.upper(): continue
        date = lg.cell(row=row, column=1).value
        channel = lg.cell(row=row, column=3).value or ""
        who = lg.cell(row=row, column=5).value or ""
        outcome = lg.cell(row=row, column=6).value or ""
        if isinstance(date, datetime.datetime): date = date.date()
        payload = {
            "customer_id": str(fid).replace("F-", ""),  # TODO: confirm ID format
            "call_direction": "outbound",
            "disposition": f"Collections - {outcome}",
            "notes": f"[{channel}] {notes}".strip(),
            "agent_name": who or "EnviroCare Office",
            "date_started": str(date),
            "date_completed": str(date),
        }
        if dry_run:
            print(f"[dry-run] Row {row} ({fid}) -> {payload}")
            synced += 1
            continue
        r = requests.post(f"{BASE_URL}/api/customers/recordcall", json=payload, headers=HEADERS, timeout=15)
        if r.ok:
            lg.cell(row=row, column=7, value=(notes + " [SYNCED]").strip())
            synced += 1
        else:
            print(f"Row {row} ({fid}) failed: {r.status_code} {r.text[:120]}")
    if dry_run:
        print(f"[dry-run] {synced} contact(s) would be synced to Fieldster. Workbook not modified.")
    else:
        wb.save(xlsx_path)
        print(f"Synced {synced} contact(s) to Fieldster.")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a != "--dry-run"]
    dry_run = "--dry-run" in sys.argv[1:]
    if len(args) != 1:
        print(__doc__); sys.exit(1)
    main(args[0], dry_run=dry_run)
