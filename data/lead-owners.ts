// data/lead-owners.ts — who owns a new inquiry, by office.
//
// The Lead Coordinator assigns every inquiry to ONE responsible person here.
// Until a name is filled in, the owner is the office queue (the shared
// service@envirocarellc.com inbox, which already receives every Sameday email),
// so nothing is ever unowned — but "office queue" is a placeholder, and the
// daily report says so.
//
// TODO(Phillip): replace each `owner` with the person who calls these back.
// Keys are the OfficeId values from data/zip-to-office.ts. NAMING TRAP:
// 'birmingham' is the ALABASTER office (2025 Butler Rd); 'birmingham-downtown'
// is 2120 16th Ave S. See AGENTS.md.

export type LeadOwner = { owner: string; email: string };

export const OFFICE_QUEUE = 'service@envirocarellc.com';

export const LEAD_OWNERS: Record<string, LeadOwner> = {
  'birmingham':          { owner: 'Alabaster office queue',  email: OFFICE_QUEUE },
  'birmingham-downtown': { owner: 'Birmingham office queue', email: OFFICE_QUEUE },
  'huntsville':          { owner: 'Huntsville office queue', email: OFFICE_QUEUE },
  'lake-martin':         { owner: 'Lake Martin office queue', email: OFFICE_QUEUE },
  // No ZIP / unknown area: the main office triages it.
  'unrouted':            { owner: 'Alabaster office queue (unrouted)', email: OFFICE_QUEUE },
};

// Billing questions go to whoever handles payments, whatever the office.
export const BILLING_OWNER: LeadOwner = { owner: 'Billing queue', email: OFFICE_QUEUE };

export function ownerFor(officeId: string | null | undefined, kind: string): LeadOwner {
  if (kind === 'billing') return BILLING_OWNER;
  return LEAD_OWNERS[officeId ?? 'unrouted'] ?? LEAD_OWNERS['unrouted'];
}

export const isPlaceholderOwner = (owner: string | null | undefined) => !owner || /queue/i.test(owner);
