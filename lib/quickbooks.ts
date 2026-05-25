export interface QuickBooksFinancialSnapshot {
  snapshot_date: string;
  source: string;
  raw_json: unknown;
  normalized_json: {
    period: string;
    revenue: number;
    cogs: number;
    gross_profit: number;
    gross_margin: number;
    operating_expenses: number;
    net_income: number;
    net_margin: number;
    cash: number;
    accounts_receivable: number;
    accounts_payable: number;
    notes: string;
  };
}

export async function getFinancialSnapshot(): Promise<QuickBooksFinancialSnapshot> {
  return {
    snapshot_date: "2026-05-31",
    source: "mock-quickbooks",
    raw_json: {
      source: "mock",
      provider: "EnviroCare CFO mock data",
      generated_at: new Date().toISOString(),
    },
    normalized_json: {
      period: "May 2026",
      revenue: 125000,
      cogs: 32000,
      gross_profit: 93000,
      gross_margin: 0.744,
      operating_expenses: 58000,
      net_income: 35000,
      net_margin: 0.28,
      cash: 67000,
      accounts_receivable: 45000,
      accounts_payable: 28000,
      notes: "Mock EnviroCare financial snapshot for deployment testing.",
    },
  };
}
