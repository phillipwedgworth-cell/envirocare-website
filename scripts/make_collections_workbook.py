#!/usr/bin/env python3
"""
EnviroCare Collections — create the workbook build_collections.py writes into
=============================================================================
WHY THIS EXISTS (2026-09-14)

build_collections.py opens the tracker with load_workbook() and addresses tabs
by name — wb["All Accounts"], wb["Call List"], wb["Today"], wb["Start Here"].
openpyxl's load_workbook does NOT create a missing file, and the script has no
branch that builds one: if EnviroCare_Collections.xlsx is not already on disk
with those exact tab names, the 7am run dies at

    ERROR: Workbook not found: EnviroCare_Collections.xlsx. Set COLLECTIONS_XLSX
    to its full path.

and nothing downstream happens. Nothing in this repo has ever created that file
— there is no committed template and no openpyxl Workbook() call anywhere. It
was hand-built once, or never.

So this script builds it: correct tab names, correct header rows, correct column
counts, in the exact shape rebuild() expects. Run it once per machine.

IT WILL NOT OVERWRITE A REAL WORKBOOK. If the target already exists this exits
without touching it — the staff-typed Contact Log and ACH Draft Log tabs are
irreplaceable and must never be clobbered by a setup script. Use --force only
if you have confirmed the existing file is disposable.

HEADER ROWS ARE LOAD-BEARING. rebuild() calls _clear_below_header(ws, header_row=N)
and deletes everything under row N. These are not cosmetic choices:
    All Accounts   header_row=1   (headers in row 1)
    Call List      header_row=2   (row 1 = title, row 2 = headers)
    Today          header_row=3   (row 1 = title, row 2 = rebuild stamp, row 3 = headers)
Change one here and the daily rebuild starts eating its own headers.

USAGE
    pip install openpyxl
    python make_collections_workbook.py
    python make_collections_workbook.py --path "C:\\Collections\\EnviroCare_Collections.xlsx"

Then set COLLECTIONS_XLSX to the same path and run:
    python build_collections.py --dry-run
"""

import os
import sys

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

BRAND = "1F4E3D"   # EnviroCare green
ACCENT = "F5A800"  # EnviroCare gold

HEADER_FONT = Font(bold=True, color="FFFFFF", size=11)
HEADER_FILL = PatternFill("solid", fgColor=BRAND)
TITLE_FONT = Font(bold=True, size=14, color=BRAND)
NOTE_FONT = Font(italic=True, size=10, color="666666")

MONEY = '"$"#,##0.00'

# ─── tab definitions ────────────────────────────────────────────────────────
# (sheet name, title row?, note row?, headers, column widths)
# The header row index is derived: 1 + bool(title) + bool(note).

ALL_ACCOUNTS = [
    "Account", "Customer", "Type", "Status", "City", "Phone", "Email",
    "Balance", "Current", "1-30", "31-60", "61-90", "91+",
    "Past Due 60+", "Past Due 30+", "Oldest (days)",
]

CALL_LIST = [
    "Account", "Customer", "Phone", "Email",
    "Past Due 30+", "Balance", "Why", "Payment Method", "Segment",
]

TODAY = [
    "#", "Account", "Customer", "Phone", "Past Due 30+", "Balance", "Why",
    "What to say", "Called?", "Outcome", "Promise date", "Notes",
]

# Column order here is read positionally by sync_contacts.py:
#   col 1 date, col 2 Fieldster ID, col 3 channel, col 5 who, col 6 outcome,
#   col 7 notes. Do not reorder without updating that script.
CONTACT_LOG = [
    "Date", "Fieldster ID", "Channel", "Customer", "Who", "Outcome", "Notes",
]

ACH_DRAFT_LOG = [
    "Date", "Account", "Customer", "Amount", "Result", "Who", "Notes",
]

TREND = ["Month", "Total A/R", "Past Due 30+", "Past Due 60+", "Accounts", "Call List"]

GETTING_WORSE = ["Account", "Customer", "Balance Then", "Balance Now", "Change", "Oldest (days)"]

MONEY_COLS = {
    "All Accounts": range(8, 16),
    "Call List": (5, 6),
    "Today": (5, 6),
    "ACH Draft Log": (4,),
    "Trend": (2, 3, 4),
    "Getting Worse": (3, 4, 5),
}


def style_headers(ws, headers, header_row, widths=None):
    for i, name in enumerate(headers, 1):
        c = ws.cell(row=header_row, column=i, value=name)
        c.font = HEADER_FONT
        c.fill = HEADER_FILL
        c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        ws.column_dimensions[get_column_letter(i)].width = (
            widths[i - 1] if widths and i - 1 < len(widths) else max(12, min(34, len(name) + 6))
        )
    ws.row_dimensions[header_row].height = 28
    ws.freeze_panes = ws.cell(row=header_row + 1, column=1)


def number_format(ws, name, last_row=400):
    for col in MONEY_COLS.get(name, ()):
        for row in range(1, last_row):
            ws.cell(row=row, column=col).number_format = MONEY


def build(path):
    wb = Workbook()

    # ── Start Here ──────────────────────────────────────────────────────────
    # build_collections.py scans every cell for the literal "Last rebuilt" and
    # writes today's date into the cell immediately to its right. Keep that
    # exact string — it is matched with ==, not a contains.
    sh = wb.active
    sh.title = "Start Here"
    sh["A1"] = "EnviroCare Collections Tracker"
    sh["A1"].font = TITLE_FONT
    sh["A3"] = "Last rebuilt"
    sh["A3"].font = Font(bold=True)
    sh["B3"] = "(never — run build_collections.py)"
    sh["A5"] = "How this works"
    sh["A5"].font = Font(bold=True, size=12)
    for i, line in enumerate([
        "Today, Call List, All Accounts and this date are REBUILT every weekday at 7am.",
        "Anything you type on those four tabs is erased on the next run.",
        "Contact Log and ACH Draft Log are yours — the rebuild never touches them.",
        "Work the Today tab first: it is the 60+ day accounts, worst first.",
        "If the date above is not today's date, the 7am job did not run. Tell Phillip.",
    ], start=6):
        sh.cell(row=i, column=1, value="• " + line).font = NOTE_FONT
    sh.column_dimensions["A"].width = 86
    sh.column_dimensions["B"].width = 34

    # ── Today (header_row=3) ────────────────────────────────────────────────
    ws = wb.create_sheet("Today")
    ws["A1"] = "Today — 60+ days past due, worst first"
    ws["A1"].font = TITLE_FONT
    ws["A2"] = "Rebuilt from Fieldster at 7am. Worst first."
    ws["A2"].font = NOTE_FONT
    style_headers(ws, TODAY, 3, [5, 17, 30, 17, 14, 14, 20, 40, 10, 18, 15, 40])
    number_format(ws, "Today")

    # ── Call List (header_row=2) ────────────────────────────────────────────
    ws = wb.create_sheet("Call List")
    ws["A1"] = "Call List — every account 30+ days past due"
    ws["A1"].font = TITLE_FONT
    style_headers(ws, CALL_LIST, 2, [17, 30, 18, 30, 14, 14, 20, 20, 24])
    number_format(ws, "Call List")

    # ── All Accounts (header_row=1) ─────────────────────────────────────────
    ws = wb.create_sheet("All Accounts")
    style_headers(ws, ALL_ACCOUNTS, 1)
    number_format(ws, "All Accounts")

    # ── Contact Log (staff-owned) ───────────────────────────────────────────
    ws = wb.create_sheet("Contact Log")
    style_headers(ws, CONTACT_LOG, 1, [13, 16, 13, 30, 16, 20, 60])
    ws.cell(row=2, column=7, value="SAMPLE — delete this row. sync_contacts.py "
                                   "skips rows whose notes contain SAMPLE or [SYNCED].").font = NOTE_FONT

    # ── ACH Draft Log (staff-owned) ─────────────────────────────────────────
    ws = wb.create_sheet("ACH Draft Log")
    style_headers(ws, ACH_DRAFT_LOG, 1, [13, 17, 30, 14, 18, 16, 50])
    number_format(ws, "ACH Draft Log")

    # ── Monthly tabs ────────────────────────────────────────────────────────
    ws = wb.create_sheet("Trend")
    style_headers(ws, TREND, 1)
    number_format(ws, "Trend")

    ws = wb.create_sheet("Getting Worse")
    style_headers(ws, GETTING_WORSE, 1)
    number_format(ws, "Getting Worse")

    wb.save(path)
    return path


if __name__ == "__main__":
    force = "--force" in sys.argv
    path = os.environ.get("COLLECTIONS_XLSX", "EnviroCare_Collections.xlsx")
    if "--path" in sys.argv:
        path = sys.argv[sys.argv.index("--path") + 1]

    if os.path.exists(path) and not force:
        sys.exit(
            f"REFUSING TO OVERWRITE: {path} already exists.\n"
            "That file may hold the Contact Log and ACH Draft Log staff typed by\n"
            "hand, which nothing else can reconstruct. Move it aside first, or\n"
            "pass --force if you are certain it is disposable."
        )

    build(path)
    print(f"Created {path}")
    print("Tabs: Start Here, Today, Call List, All Accounts, Contact Log, "
          "ACH Draft Log, Trend, Getting Worse")
    print()
    print("NEXT:")
    print(f'  setx COLLECTIONS_XLSX "{os.path.abspath(path)}"')
    print("  python build_collections.py --dry-run     # confirm the Fieldster pull")
    print("  python build_collections.py               # first real rebuild + Supabase push")
