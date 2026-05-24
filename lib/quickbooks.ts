export interface QuickBooksFinancialSnapshot {
  snapshot_date: string;
  source: string;
  raw_json: unknown;
  normalized_json: {
    period: string;
    revenue: number;
    gross_profit: number;
    gross_margin: number;
    operating_expenses: number;
    net_income: number;
    cash_balance: number;
    current_assets: number;
    current_liabilities: number;
    operating_cash_flow: number;
    investing_cash_flow: number;
    financing_cash_flow: number;
    notes: string;
  };
}

const realmId = process.env.QUICKBOOKS_REALM_ID;
const accessToken = process.env.QUICKBOOKS_ACCESS_TOKEN;

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function parseMoney(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.\-]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function findRowValue(rows: any[], candidates: string[]): number {
  if (!Array.isArray(rows)) {
    return 0;
  }

  for (const row of rows) {
    const label = String(row?.ColData?.[0]?.value ?? "").toLowerCase();
    if (!label) continue;

    for (const candidate of candidates) {
      if (label.includes(candidate)) {
        return parseMoney(row?.ColData?.[1]?.value);
      }
    }
  }

  return 0;
}

function normalizeQuickBooksReports(pl: any, bs: any, cf: any, periodLabel: string) {
  const plRows = pl?.Rows?.Row ?? [];
  const bsRows = bs?.Rows?.Row ?? [];
  const cfRows = cf?.Rows?.Row ?? [];

  const revenue = findRowValue(plRows, ["total income", "net sales", "revenue", "total revenue"]);
  const grossProfit = findRowValue(plRows, ["gross profit", "gross income"]);
  const operatingExpenses = findRowValue(plRows, ["operating expenses", "total operating expenses", "expenses"]);
  const netIncome = findRowValue(plRows, ["net income", "net profit", "net earnings"]);

  const cashBalance = findRowValue(bsRows, ["cash", "cash and cash equivalents", "cash balance"]);
  const currentAssets = findRowValue(bsRows, ["current assets"]);
  const currentLiabilities = findRowValue(bsRows, ["current liabilities"]);

  const operatingCashFlow = findRowValue(cfRows, ["net cash provided by operating activities", "operating activities"]);
  const investingCashFlow = findRowValue(cfRows, ["net cash provided by investing activities", "investing activities"]);
  const financingCashFlow = findRowValue(cfRows, ["net cash provided by financing activities", "financing activities"]);

  const grossMargin = revenue ? Number((grossProfit / revenue).toFixed(4)) : 0;

  return {
    period: periodLabel,
    revenue,
    gross_profit: grossProfit,
    gross_margin: grossMargin,
    operating_expenses: operatingExpenses,
    net_income: netIncome,
    cash_balance: cashBalance,
    current_assets: currentAssets,
    current_liabilities: currentLiabilities,
    operating_cash_flow: operatingCashFlow,
    investing_cash_flow: investingCashFlow,
    financing_cash_flow: financingCashFlow,
    notes: "Normalized QuickBooks snapshot for the most recent full month.",
  };
}

async function fetchQuickBooksReport(reportName: string, startDate: string, endDate: string) {
  if (!realmId) {
    throw new Error("Missing QUICKBOOKS_REALM_ID environment variable.");
  }

  if (!accessToken) {
    throw new Error("Missing QUICKBOOKS_ACCESS_TOKEN environment variable.");
  }

  const url = new URL(`https://quickbooks.api.intuit.com/v3/company/${realmId}/reports/${reportName}`);
  url.searchParams.set("minorversion", "65");
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`QuickBooks report ${reportName} request failed: ${response.status} ${response.statusText} ${JSON.stringify(json)}`);
  }

  return json;
}

export async function getFinancialSnapshot(): Promise<QuickBooksFinancialSnapshot> {
  const today = new Date();
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0));
  const start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1));
  const startDate = formatDate(start);
  const endDate = formatDate(end);

  const [profitAndLoss, balanceSheet, cashFlow] = await Promise.all([
    fetchQuickBooksReport("ProfitAndLoss", startDate, endDate),
    fetchQuickBooksReport("BalanceSheet", startDate, endDate),
    fetchQuickBooksReport("CashFlow", startDate, endDate),
  ]);

  const normalized = normalizeQuickBooksReports(profitAndLoss, balanceSheet, cashFlow, `${startDate}_${endDate}`);

  return {
    snapshot_date: endDate,
    source: "quickbooks",
    raw_json: {
      profitAndLoss,
      balanceSheet,
      cashFlow,
    },
    normalized_json: normalized,
  };
}
